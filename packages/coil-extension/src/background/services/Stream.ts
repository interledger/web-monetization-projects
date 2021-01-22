import { EventEmitter } from 'events'

import {
  Connection,
  createConnection,
  DataAndMoneyStream
} from 'ilp-protocol-stream'
import IlpPluginBtp from 'ilp-plugin-btp'
import {
  getSPSPResponse,
  PaymentDetails,
  SPSPError,
  SPSPResponse,
  getFarFutureExpiry,
  PaymentScheduler,
  ScheduleMode
} from '@web-monetization/polyfill-utils'
import { Container, inject, injectable } from 'inversify'
import { RedeemedToken } from '@coil/anonymous-tokens'

import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'
import { BTP_ENDPOINT } from '../../webpackDefines'

import { AnonymousTokens } from './AnonymousTokens'
import { StreamLoop, isExhaustedError } from './StreamLoop'
import { Logger, logger } from './utils'

// The amount set as the `SendStreamMax` when spending a full token.
const FULL_TOKEN_AMOUNT = 2 ** 64
// The number of seconds to pay immediately on page load.
const INITIAL_SEND_SECONDS = 5

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
  private readonly _anonTokens: AnonymousTokens

  private _assetCode = ''
  private _assetScale = 0
  private _exchangeRate = 1
  private readonly _schedule: PaymentScheduler = new PaymentScheduler(
    ScheduleMode.PostPay
  )

  private readonly loop: StreamLoop

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
    this._anonTokens = container.get(AnonymousTokens)
    this._initiatingUrl = initiatingUrl
    this.loop = new StreamLoop({
      logger: this._debug,
      schedule: this._schedule
    })
    this.loop.on('run:error', (_err: Error) => (this._paying = false))

    const server = new URL(container.get(tokens.CoilDomain))
    server.pathname = '/btp'
    this._server = server.href.replace(/^http/, 'btp+ws')
    if (BTP_ENDPOINT) {
      this._server = BTP_ENDPOINT
    }
  }

  async start(): Promise<void> {
    // reset this upon every start *before* early exit while looping
    this._packetNumber = 0
    await this.loop.run(
      async (tokenFraction: number): Promise<Connection> => {
        const spspDetails = await this._getSPSPDetails()
        const redeemedToken = await this._anonTokens.getToken(this._authToken)
        this._debug(
          'redeemed token with throughput=%d',
          redeemedToken.throughput
        )
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

        connection.on('error', async e => {
          // Delete exhausted tokens from localstorage.
          this._debug('stream connection error; err=%s', e.message)
          if (!isExhaustedError(e)) return
          if (
            !e.ilpReject?.data.equals(
              await sha256(Buffer.from(redeemedToken.btpToken))
            )
          )
            return
          this._anonTokens.removeToken(redeemedToken.btpToken)
        })

        connection.once('close', () => {
          stream.removeListener('outgoing_money', onMoney)
          this._schedule.onSent(
            +connection.totalSent / redeemedToken.throughput / 60
          )
        })

        void (async () => {
          if (this._schedule.totalSent() === 0) {
            await firstMinuteBandwidth(stream, redeemedToken.throughput)
          } else {
            stream.setSendMax(
              1.0 <= tokenFraction
                ? FULL_TOKEN_AMOUNT
                : tokenFraction * 60 * redeemedToken.throughput
            )
          }

          let timer: NodeJS.Timer | undefined
          const waitTime = new Promise(
            (_, reject) =>
              (timer = setTimeout(() => reject(new Error('timeout')), 10e3))
          )
          // On error, destroy() was called internally by ilp-stream.
          // Resolving here isn't necessary, but it prevents an extraneous destroy() call.
          const waitFail = new Promise(resolve =>
            connection.once('error', resolve)
          )
          await Promise.race([waitFail, waitTime, connection.end()])
            .finally(() => {
              if (timer) clearTimeout(timer)
            })
            .catch(
              async (err): Promise<void> => {
                this._debug(
                  'stream.end failed, destroying connection err=%s',
                  err.message
                )
                return connection.destroy(err) // ensure the connection is closed
              }
            )
        })()
        return connection
      }
    )
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

  private async _getSPSPDetails(): Promise<SPSPResponse> {
    this._debug('fetching spsp details. url=', this._spspUrl)
    return getSPSPResponse(this._spspUrl, this._requestId).catch(e => {
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

  private onMoney(
    connection: Connection,
    sentAmount: string,
    receipt?: string
  ): void {
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
      assetCode: (this._assetCode = notNullOrUndef(
        connection.destinationAssetCode
      )),
      assetScale: (this._assetScale = notNullOrUndef(
        connection.destinationAssetScale
      )),
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

  async stop() {
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

async function firstMinuteBandwidth(
  stream: DataAndMoneyStream,
  throughput: number
): Promise<void> {
  // Begin paying immediately so the page knows that the user agent is monetized.
  // The initial amount is low to ensure the user doesn't deplete their balance by
  // browsing quickly from page-to-page.
  // This is the only monetization that is prepaid, everything else is post-paid.
  stream.setSendMax(INITIAL_SEND_SECONDS * throughput)

  let timer: number | undefined
  let stopped = false
  let cancelTimer = () => {}
  stream.on('close', (): void => {
    // on close, early-exit from the bandwidth loop
    stopped = true
    if (timer) clearTimeout(timer)
    cancelTimer()
  })

  let lastTime = 0 // seconds
  for (const time of [10, 30, 60]) {
    const delay = (time - lastTime) * 1e3 // milliseconds
    lastTime = time
    await new Promise<void>(
      resolve => (timer = window.setTimeout((cancelTimer = resolve), delay))
    )
    if (stopped) return
    stream.setSendMax(time === 60 ? FULL_TOKEN_AMOUNT : time * throughput)
  }
}

async function sha256(preimage: Buffer): Promise<Buffer> {
  return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, preimage))
}
