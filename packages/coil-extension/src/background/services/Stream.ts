import { EventEmitter } from 'events'

import {
  Connection,
  createConnection,
  DataAndMoneyStream
} from 'ilp-protocol-stream'
import IlpPluginBtp from 'ilp-plugin-btp'
import {
  asyncUtils,
  getSPSPResponse,
  PaymentDetails,
  SPSPError,
  SPSPResponse,
  getFarFutureExpiry
} from '@web-monetization/polyfill-utils'
import { GraphQlClient } from '@coil/client'
import { Container, inject, injectable } from 'inversify'

import { RedeemedToken } from '@coil/anonymous-tokens'
import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'
import { BTP_ENDPOINT } from '../../webpackDefines'

import { AnonymousTokens } from './AnonymousTokens'
import { PaymentScheduler, ScheduleMode } from './PaymentScheduler'
import { Logger, logger } from './utils'

const { timeout } = asyncUtils

// The amount set as the `SendStreamMax` when spending a full token.
const FULL_TOKEN_AMOUNT = 2 ** 64
// The number of seconds to pay immediately on page load.
const INITIAL_SEND_SECONDS = 5
// The number of retries before giving up when stopping.
const STOP_RETRIES = 5

// @sharafian explained to me that the extension popup shows source amounts,
// while the web-monetization-scripts which use the monetizationprogress
// event show received amounts.
export interface StreamMoneyEvent {
  /**
   * Currently means packet number for a given StreamAttempt.
   * Could change.
   */
  packetNumber: number

  // requestId
  requestId: string
  paymentPointer: string
  initiatingUrl: string

  msSinceLastPacket: number
  sentAmount: string

  // dest=received
  amount: string
  assetCode: string
  assetScale: number

  // source=source
  sourceAmount: string
  sourceAssetCode: string
  sourceAssetScale: number

  receipt?: string
}

@injectable()
export class Stream extends EventEmitter {
  private readonly _requestId: string
  private readonly _spspUrl: string
  private readonly _paymentPointer: string
  private readonly _authToken: string
  private readonly _server: string
  private readonly _initiatingUrl: string

  private _lastOutgoingMs!: number
  private _lastDelivered = 0
  private _packetNumber!: number
  private _paying = false
  private _coilDomain: string
  private _anonTokens: AnonymousTokens

  private _assetCode = ''
  private _assetScale = 0
  private _exchangeRate = 1
  private _schedule: PaymentScheduler = new PaymentScheduler(ScheduleMode.PostPay)
  private loop: StreamLoop

  constructor(
    @logger('Stream')
    private readonly _debug: Logger,
    private container: Container,
    @inject(tokens.StreamDetails)
    {
      requestId,
      spspEndpoint,
      paymentPointer,
      token,
      initiatingUrl
    }: PaymentDetails & {
      token: string
      spspEndpoint: string
      initiatingUrl: string
    }
  ) {
    super()
    this._paymentPointer = paymentPointer
    this._requestId = requestId
    this._spspUrl = spspEndpoint
    this._authToken = token
    this._coilDomain = container.get(tokens.CoilDomain)
    this._anonTokens = container.get(AnonymousTokens)
    this._initiatingUrl = initiatingUrl
    this.loop = new StreamLoop({logger: this._debug, schedule: this._schedule})
    this.loop.on('run:error', (_err: Error) => this._paying = false)

    const server = new URL(this._coilDomain)
    server.pathname = '/btp'
    this._server = server.href.replace(/^http/, 'btp+ws')
    if (BTP_ENDPOINT) {
      this._server = BTP_ENDPOINT
    }
  }

  async start(): Promise<void> {
    // reset this upon every start *before* early exit while looping
    this._packetNumber = 0
    await this.loop.run(async (tokenFraction: number): Promise<Connection> => {
      const spspDetails = await this._getSPSPDetails()
      const redeemedToken = await this._anonTokens.getToken(this._authToken)
      this._debug('redeemed token with throughput=%d', redeemedToken.throughput)
      const plugin = this._makePlugin(redeemedToken.btpToken)
      const connection = await createConnection({
        ...spspDetails,
        plugin,
        slippage: 1.0,
        exchangeRate: 1.0,
        maximumPacketAmount: '10000000',
        getExpiry: getFarFutureExpiry
      })
      const stream = connection.createStream()

      const onMoney = (sentAmount: string) => {
        // Wait until `setImmediate` so that `connection.totalDelivered` has been updated.
        const receipt = stream.receipt?.toString('base64')
        setImmediate(() => this.onMoney(connection, sentAmount, receipt))
      }
      stream.on('outgoing_money', onMoney)

      connection.on('error', async (e) => {
        // Delete exhausted tokens from localstorage.
        this._debug('stream connection error; err=%s', e.message)
        if (!isExhaustedError(e)) return
        if (!e.ilpReject?.data.equals(await sha256(Buffer.from(redeemedToken.btpToken)))) return
        this._anonTokens.removeToken(redeemedToken.btpToken)
      })

      connection.once('close', () => {
        stream.removeListener('outgoing_money', onMoney)
        this._schedule.onSent(+connection.totalSent / redeemedToken.throughput / 60)
      })

      void (async () => {
        if (this._schedule.hasPaidAny()) {
          stream.setSendMax(1.0 <= tokenFraction ? FULL_TOKEN_AMOUNT : (tokenFraction * 60 * redeemedToken.throughput))
        } else {
          await firstMinuteBandwidth(stream, redeemedToken.throughput)
        }

        let timer: NodeJS.Timer | undefined
        const waitTime = new Promise((_, reject) => timer = setTimeout(() => reject(new Error('timeout')), 10e3))
        // On error, destroy() was called internally by ilp-stream.
        // Resolving here isn't necessary, but it prevents an extraneous destroy() call.
        const waitFail = new Promise((resolve) => connection.once('error', resolve))
        await Promise.race([waitFail, waitTime, connection.end()])
          .finally(() => { if (timer) clearTimeout(timer) })
          .catch((err): Promise<void> => {
            this._debug('stream.end failed, destroying connection err=%s', err.message)
            return connection.destroy(err) // ensure the connection is closed
          })
      })()
      return connection
    })
    this._paying = false
  }

  isPaying(): boolean {
    return this._paying
  }

  hasPaidAny(): boolean {
    return !!this._lastOutgoingMs
  }

  private _makePlugin(btpToken: string): IlpPluginBtp {
    return new IlpPluginBtp({
      server: this._server,
      btpToken
    })
  }

  private _getSPSPDetails(): Promise<SPSPResponse> {
    this._debug('fetching spsp details. url=', this._spspUrl)
    return getSPSPResponse(this._spspUrl, this._requestId).catch((e) => {
      if (e instanceof SPSPError) {
        const status = e.response?.status
        // Abort on Bad Request 4XX
        if (!status || (status >= 400 && status < 500)) {
          this.abort()
        }
      }
      throw e
    })
  }

  private onMoney(connection: Connection, sentAmount: string, receipt?: string): void {
    const now = Date.now()
    const delivered = +connection.totalDelivered
    const amount = delivered - this._lastDelivered
    this._debug('delivered', delivered, 'lastDelivered', this._lastDelivered)
    this._lastDelivered = delivered
    if (amount <= 0) return
    this._paying = true

    const event: StreamMoneyEvent = {
      sentAmount,
      paymentPointer: this._paymentPointer,
      packetNumber: this._packetNumber++,
      requestId: this._requestId,
      initiatingUrl: this._initiatingUrl,
      msSinceLastPacket: now - this._lastOutgoingMs,
      // dest=received
      amount: amount.toString(),
      assetCode: this._assetCode = notNullOrUndef(connection.destinationAssetCode),
      assetScale: this._assetScale = notNullOrUndef(connection.destinationAssetScale),
      receipt,
      // source=source
      sourceAmount: sentAmount,
      sourceAssetCode: connection.sourceAssetCode,
      sourceAssetScale: connection.sourceAssetScale
    }
    this._lastOutgoingMs = now
    this._exchangeRate =
      (amount / Number(event.sourceAmount)) *
      (10 ** event.assetScale / 10 ** event.sourceAssetScale)
    this.emit('money', event)
  }

  stop() {
    return this.loop.stop()
  }

  async pause() {
    this.stop()
  }

  async resume() {
    this.start()
  }

  // Don't call this.stop() directly, let BackgroundScript orchestrate the stop.
  private async abort() {
    this.emit('abort', this._requestId)
  }

  getPaymentPointer() {
    return this._paymentPointer
  }

  getAssetDetails() {
    return {
      assetCode: this._assetCode,
      assetScale: this._assetScale,
      exchangeRate: this._exchangeRate
    }
  }
}

enum StreamLoopState { Done, Loop, Ending }

class StreamLoop extends EventEmitter {
  private state: StreamLoopState = StreamLoopState.Done
  private readonly schedule: PaymentScheduler
  private readonly debug: Logger
  private running = false // whether there is an active loop
  private connection?: Connection
  constructor(opts: {
    schedule: PaymentScheduler
    logger: Logger
  }) {
    super()
    this.schedule = opts.schedule
    this.debug = opts.logger
  }

  async run(attempt: (tokenFraction: number) => Promise<Connection>): Promise<void> {
    this.state = StreamLoopState.Loop
    if (this.running) return // another 'run' loop is already active
    this.running = true
    let attempts = 0 // count of retry attempts when state=Ending
    while (this.state !== StreamLoopState.Done) {
      let tokenPiece = 1.0
      switch (+this.state) {
      case StreamLoopState.Done: continue // stop looping (unreachable)
      case StreamLoopState.Loop: // keep going; only pay full tokens
        // After the very first token payment, switch to post-payment.
        if (this.schedule.hasPaidAny()) {
          const hasToken = await this.schedule.awaitFullToken()
          if (!hasToken) continue // the wait was interrupted, likely because the stream was paused/stopped
        }
        break
      case StreamLoopState.Ending:
        tokenPiece = clamp(this.schedule.unpaidTokens(), 0.0, 1.0)
        tokenPiece = Math.floor(tokenPiece * 20) / 20 // don't pay tiny token pieces
        if (tokenPiece === 0) { this.state = StreamLoopState.Done; continue }
        break
      }
      try {
        const connection = this.connection = await attempt(tokenPiece)
        await new Promise((resolve, reject) => {
          connection.once('close', resolve)
          connection.once('error', (err) => { if (!isExhaustedError(err)) reject(err) }) // "exhausted capacity" errors count as success
        })
        attempts = 0
      } catch (err) {
        this.emit('run:error', err)
        switch (+this.state) {
        case StreamLoopState.Done: break
        case StreamLoopState.Ending:
          if (STOP_RETRIES === ++attempts) {
            this.debug('too many errors; giving up')
            this.state = StreamLoopState.Done
            break
          } // else fallthrough to delay
        case StreamLoopState.Loop:
          this.debug('error streaming. retry in 2s. err=', err.message, err.stack)
          await timeout(2000)
          break
        }
      } finally {
        this.connection = undefined
      }
    }
    this.running = false
    this.emit('run:end')
  }

  async stop(): Promise<void> {
    this.state = StreamLoopState.Ending
    this.schedule.stop()
    // End the firstMinuteBandwidth payment quickly. Non-first-minute payment
    // already has called end(), so this does no harm.
    if (this.connection) void this.connection.end()
    if (this.running) await new Promise((resolve) => this.once('run:end', resolve)) // wait for state=Done
  }
}

async function firstMinuteBandwidth(stream: DataAndMoneyStream, throughput: number): Promise<void> {
  // Start paying immediately so the page knows that the user agent is monetized.
  // But the amount it isn't too high so that the user doesn't deplete their
  // balance by browsing quickly from page-to-page.
  // This is the only monetization that is prepaid, everything else is post-paid.
  stream.setSendMax(INITIAL_SEND_SECONDS * throughput)

  let timer: NodeJS.Timer | undefined
  let stopped = false
  let cancelTimer = () => {}
  stream.on('close', (): void => { // on close, early-exit from the bandwidth loop
    stopped = true
    if (timer) clearTimeout(timer)
    cancelTimer()
  })

  let lastTime = 0 // seconds
  for (const time of [10, 30, 60]) { // seconds
    const delay = (time - lastTime) * 1e3 // milliseconds
    lastTime = time
    await new Promise((resolve) => timer = setTimeout(cancelTimer = resolve, delay))
    if (stopped) return
    stream.setSendMax(time === 60 ? FULL_TOKEN_AMOUNT : (time * throughput))
  }
}

// Note: this does _not_ verify the error's digest, so the error may be forged.
function isExhaustedError(err: any): boolean {
  return err['ilpReject']?.message === 'exhausted capacity.'
}

async function sha256(preimage: Buffer): Promise<Buffer> {
  return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, preimage))
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(Math.min(v, hi), lo)
}
