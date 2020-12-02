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
import { PaymentScheduler } from './PaymentScheduler'
import { Logger, logger } from './utils'

const { timeout } = asyncUtils

// The amount set as the `SendStreamMax` when spending a full token.
const FULL_TOKEN_AMOUNT = 2 ** 64
//const UPDATE_AMOUNT_TIMEOUT = 2000
let ATTEMPT = 0
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

//interface ConnectionAndStream {
//  connection: Connection
//  stream: DataAndMoneyStream
//}

type OnMoneyEvent = {
  sentAmount: string
  amount: number
  assetCode: string
  assetScale: number
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
  private _lastDelivered: number = 0
  private _packetNumber!: number
  //private _active: boolean = false
  private _paying = false
  //private _looping: boolean = false
  //private _attempt: StreamAttempt | null = null
  private _coilDomain: string
  private _anonTokens: AnonymousTokens
  //private _isStopping: boolean = false

  private _assetCode: string = ''
  private _assetScale: number = 0
  private _exchangeRate: number = 1
  private _schedule: PaymentScheduler = new PaymentScheduler()
  private loop: StreamLoop// = new StreamLoop()

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

    const server = new URL(this._coilDomain)
    server.pathname = '/btp'
    this._server = server.href.replace(/^http/, 'btp+ws')
    if (BTP_ENDPOINT) {
      this._server = BTP_ENDPOINT
    }
  }

  // TODO update isPaying/paying flag
  async start(): Promise<void> {
    // reset this upon every start *before* early exit while _looping
    this._packetNumber = 0
    await this.loop.run(async (tokenFraction: number): Promise<Connection> => {
      console.log("START ATTEMPT ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────", tokenFraction)
      const spspDetails = await this._getSPSPDetails()
      const redeemedToken = await this._anonTokens.getToken(this._authToken)
      this._debug('redeemed token with throughput=%d', redeemedToken.throughput)
      const plugin = await this._makePlugin(redeemedToken.btpToken)
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
      connection.once('close', () => {
        console.log("TOTAL_SENT0", connection.totalSent, "throughput=", redeemedToken.throughput) // XXX
        stream.removeListener('outgoing_money', onMoney)
        console.log("TOTAL_SENT1", connection.totalSent, "throughput=", redeemedToken.throughput , 'holds=',Object.keys(stream['holds']).length) // XXX
        //this._schedule.onSent(+connection.totalSent / redeemedToken.throughput / 60)
        //setImmediate(() => this._schedule.onSent(+connection.totalSent / redeemedToken.throughput / 60))
        setImmediate(() => console.log("TOTAL_SENT2", connection.totalSent, 'holds=',Object.keys(stream['holds']).length)) // XXX
        setTimeout(() => console.log("TOTAL_SENT3", connection.totalSent, 'holds=',Object.keys(stream['holds']).length), 1500) // XXX
      })

      connection.on('error', async (e) => {
        // Delete exhausted tokens from localstorage.
        this._debug('stream connection error; err=%s', e.message)
        if (!isExhaustedError(e) ||
          !e.ilpReject?.data.equals(await sha256(Buffer.from(redeemedToken.btpToken)))) {
          this._paying = false
          return
        }
        this._anonTokens.removeToken(redeemedToken.btpToken)
      })

      // TODO comment
      void (new Promise((resolve) => {
        connection.on('error', (e) => { if (isExhaustedError(e)) resolve(1.0) })
        connection.on('close', () => resolve(+connection.totalSent / redeemedToken.throughput / 60 as number))
      }) as Promise<number>).then((sentTokens: number) => this._schedule.onSent(sentTokens))

      void (async () => {
        if (this._packetNumber === 0) {
          await firstMinuteBandwidth(stream, redeemedToken.throughput)
        } else {
          stream.setSendMax(1.0 <= tokenFraction ? FULL_TOKEN_AMOUNT : (tokenFraction * 60 * redeemedToken.throughput))
        }

        let timer
        const waitTime = new Promise((_, reject) => timer = setTimeout(() => reject(new Error('timeout')), 5e3))
        const waitEnd = connection.end()
        await Promise.race([waitEnd, waitTime]).catch((err) => {
          this._debug('stream.end failed, destroying connection err=%s', err.message)
          return connection.destroy(new Error('timeout')) // make sure the connection is closed
        })
        clearTimeout(timer)
      })()

      //return { connection, stream }
      return connection
    })
    this._paying = false
  }

//  async __start() { // XXX
//    if (this._active) return
//    this._active = true
//
//    // reset this upon every start *before* early exit while _looping
//    this._packetNumber = 0
//
//    if (this._looping) return
//    this._looping = true
//
//    if (this._attempt) {
//      void this._attempt.stop()
//      this._attempt = null
//    }
//
//    // Hack for for issue #144
//    // Let pause() stream when tab is backgrounded have a chance to
//    // to work to avoid wasted refreshBtpToken/SPSP queries
//    await timeout(1)
//    if (!this._active) {
//      this._looping = false
//      return
//    }
//
//    this._isStopping = false
//    this._schedule = new PaymentScheduler()
//    while (this._active) {
//      let btpToken: string | undefined
//      let plugin, attempt, throughput
//
//      const hasSentAny = this.hasPaidAny()
//
//      try {
//        const START = Date.now() // XXX
//
//        // TODO XXX when the first token is a partial, don't immediately send a second
//
//        if (!this._isStopping && hasSentAny) console.log("waiting full token")
//        if (!this._isStopping && hasSentAny) await this._schedule.awaitFullToken()
//        let tokenPiece: number // fraction of the token to send
//        let sendAmount: number // amount to pay
//        if (this._isStopping) {
//          tokenPiece = Math.min(1.0, this._schedule.unpaidTokens())
//          tokenPiece = Math.floor(tokenPiece * 1000) / 1000 // don't allow arbitrarily small token pieces
//          if (tokenPiece === 0) {
//            console.log("DEBUG drain finished")
//            break
//          }
//          console.log("DEBUG drain", tokenPiece)
//        } else { // not stopping; only pay partial tokens
//          tokenPiece = 1.0
//        }
//          //await this._schedule.wait()
//        console.log("WAITED", Date.now() - START, "ms for token", this._schedule['sentTokens']+1)
//        const redeemedToken = await this._anonTokens.getToken(this._authToken)
//        btpToken = redeemedToken.btpToken
//        throughput = redeemedToken.throughput
//        this._debug('redeemed token with throughput=%d', throughput)
//        plugin = await this._makePlugin(btpToken)
//        const spspDetails = await this._getSPSPDetails()
//        this.container
//          .rebind(tokens.NoContextLoggerName)
//          .toConstantValue(`StreamAttempt:${this._requestId}:${++ATTEMPT}`)
//        attempt = this._attempt = new StreamAttempt({
//          bandwidth: hasSentAny ? makeFixedBandwidth(tokenPiece, throughput) : new FirstMinuteBandwidth(throughput),
//          onMoney: this.onMoney.bind(this),
//          requestId: this._requestId,
//          plugin,
//          spspDetails,
//          debug: this.container.get(tokens.Logger)
//        })
//        if (!this._active) continue
//        const isTokenExhausted = await attempt.start(redeemedToken).finally(() => {
//          console.log("onSent", attempt.getTotalSent() , "/", throughput, "/ 60", "token:", btpToken)
//          this._schedule.onSent(attempt.getTotalSent() / throughput / 60)
//        })
//        if (isTokenExhausted) {
//          this._debug('anon token exhausted; retrying soon, err=%s', e.message)
//          this._anonTokens.removeToken(btpToken)
//        }
//      } catch (e) {
//        //if (attempt && throughput) {
//        //  console.log("onSent", attempt.getTotalSent() , "/", throughput, "/ 60", "token:", btpToken)
//        //  this._schedule.onSent(attempt.getTotalSent() / throughput / 60)
//        //}
//        if (plugin) await plugin.disconnect()
//        //const { ilpReject } = e
//        //if (
//        //  btpToken &&
//        //  ilpReject &&
//        //  ilpReject.message === 'exhausted capacity.' &&
//        //  ilpReject.data.equals(await sha256(Buffer.from(btpToken)))
//        //) {
//        //  this._debug('anon token exhausted; retrying soon, err=%s', e.message)
//        //  this._anonTokens.removeToken(btpToken)
//        //  continue
//        //} else {
//          this._debug('error streaming. retry in 2s. err=', e.message, e.stack)
//          this._paying = false
//        //}
//      }
//      if (this._active) await timeout(2000)
//    }
//
//    this._schedule.stop()
//    this._active = false
//    this._looping = false
//    this._paying = false
//    this._debug('aborted because stream is no longer active.')
//  }

  isPaying(): boolean {
    return this._paying
  }

  hasPaidAny(): boolean {
    return !!this._lastOutgoingMs
  }

  async _makePlugin(btpToken: string) {
    // these are interspersed in order to not waste time if connection
    // is severed before full establishment
    //if (!this._active) throw new Error('aborted monetization')

    const plugin = new IlpPluginBtp({
      server: this._server,
      btpToken
    })

    this._debug('connecting ilp plugin. server=', this._server)
    // createConnection(...) does this, so this is somewhat superfluous
    await plugin.connect()
    return plugin
  }

  async _getSPSPDetails(): Promise<SPSPResponse> {
    this._debug('fetching spsp details. url=', this._spspUrl)
    let details: SPSPResponse
    try {
      details = await getSPSPResponse(this._spspUrl, this._requestId)
    } catch (e) {
      if (e instanceof SPSPError) {
        const status = e.response?.status
        // Abort on Bad Request 4XX
        if (!status || (status >= 400 && status < 500)) {
          this.abort()
        }
      }
      throw e
    }
    //if (!this._active) throw new Error('aborted monetization')
    return details
  }

  // TODO combine with _onMoney
  private onMoney(connection: Connection, sentAmount: string, receipt?: string): void {
    const delivered = Number(connection.totalDelivered)
    const amount = delivered - this._lastDelivered
    this._debug('delivered', delivered, 'lastDelivered', this._lastDelivered)
    this._lastDelivered = delivered

    this._onMoney({
      sentAmount,
      // dest=received
      amount,
      assetCode: notNullOrUndef(connection.destinationAssetCode), // XXX this.connection is undefined sometimes??
      assetScale: notNullOrUndef(connection.destinationAssetScale),
      receipt,
      // source=source
      sourceAmount: sentAmount,
      sourceAssetCode: connection.sourceAssetCode,
      sourceAssetScale: connection.sourceAssetScale
    })
  }

  private _onMoney(data: OnMoneyEvent): void {
    if (data.amount <= 0) return

    this._paying = true
    const now = Date.now()
    const event: StreamMoneyEvent = Object.assign(data, {
      paymentPointer: this._paymentPointer,
      packetNumber: this._packetNumber++,
      requestId: this._requestId,
      initiatingUrl: this._initiatingUrl,
      msSinceLastPacket: now - this._lastOutgoingMs,
      amount: data.amount.toString(),
      receipt: data.receipt
    })
    this._lastOutgoingMs = now
    this._assetCode = data.assetCode
    this._assetScale = data.assetScale
    this._exchangeRate =
      (Number(data.amount) / Number(data.sourceAmount)) *
      (10 ** data.assetScale / 10 ** data.sourceAssetScale)
    this.emit('money', event)
  }

  stop() {
    return this.loop.stop()
    /*
    this._isStopping = true
    this._schedule.stop() // XXX this cancels wait() -- maybe a good thing?

    if (this._attempt) {
      await this._attempt.stop()
      this._attempt = null
    }
    //this._active = false
    */
  }

  async pause() {
    this.stop()
  }

  async resume() {
    this.start()
  }

  private async abort() {
    // Don't call this.stop() directly, let BackgroundScript orchestrate the
    // stop.
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
const END_ATTEMPTS = 5

class StreamLoop extends EventEmitter {
  //private packetNumber: number = 0 // XXX?
  private state: StreamLoopState = StreamLoopState.Done
  private readonly schedule: PaymentScheduler //= new PaymentScheduler()
  private readonly debug: Logger
  private running: boolean = false // whether there is an active loop
  //private paying: boolean = false // whether a stream is currently paying
  //private attempt?: StreamAttempt
  private connection?: Connection
  //private stream?: ConnectionAndStream
  //constructor(private anonTokens: AnonymousTokens) {}
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
    let attempts = 0
    while (this.state !== StreamLoopState.Done) {
      let tokenPiece = 1.0
      switch (+this.state) {
      case StreamLoopState.Done: continue // stop looping (unreachable)
      case StreamLoopState.Loop: // keep going; only pay full tokens
        // After the very first token payment, switch to post-payment.
        if (this.schedule.hasPaidAny()) {
          const START = Date.now() // XXX
          const hasToken = await this.schedule.awaitFullToken()
          console.log("WAITED ms=", Date.now() - START, "hasToken=", hasToken)
          //if (!hasToken) tokenPiece = 0.0
          if (!hasToken) continue // the wait was interrupted, likely because the stream was stopped
        }
        break
      case StreamLoopState.Ending:
        tokenPiece = Math.min(1.0, this.schedule.unpaidTokens())
        tokenPiece = Math.floor(tokenPiece * 1000) / 1000 // don't pay arbitrarily small token pieces
        console.log("DEBUG drain", tokenPiece)
        if (tokenPiece === 0) { console.log("DEBUG drain finished"); this.state = StreamLoopState.Done; continue }
        break
      }
      try {
        const connection = this.connection = await attempt(tokenPiece)
        //this.connection = connection
        //this.stream = stream
        await new Promise((resolve, reject) => {
          connection.once('close', resolve)
          connection.once('error', (err) => { if (!isExhaustedError(err)) reject(err) })
        })
        attempts = 0
      } catch (err) {
        //this._paying = false
        switch (+this.state) {
        case StreamLoopState.Done: break
        case StreamLoopState.Ending:
          if (END_ATTEMPTS === ++attempts) {
            this.debug('too many errors; giving up')
            this.state = StreamLoopState.Done
            break
          } // else fallthrough
        case StreamLoopState.Loop:
          this.debug('error streaming. retry in 2s. err=', err.message, err.stack)
          await timeout(2000)
          break
        }
        //if (this.state !== StreamLoopState.Done) await timeout(2000)
      } finally {
        //if (!this.connection) continue
        //this.schedule.onSent(+this.connection.totalSent / throughput / 60)
        //await this.connection.destroy().catch((_err) => {}) // cleanup, in case the connection hasn't already been torn down
        this.connection = undefined
      }
    }
    this.running = false
    //this.state = StreamLoopState.Done
    this.emit('run:end')
  }

  async stop(): Promise<void> {
    console.log("STOP schedule.watch.totalTime", this.schedule['watch']['totalTime'])
    this.state = StreamLoopState.Ending
    this.schedule.stop()
    //if (this.connection) await this.connection.end().catch(() => {}) // TODO XXX timeout → destroy? or does this happen elsewhere? (in the run() callback?
    if (this.running) await new Promise((resolve) => this.once('run:end', resolve)) // wait for state=Done
  }
}

//interface StreamAttemptOptions {
//  bandwidth: Bandwidth
//  onMoney: (event: OnMoneyEvent) => void
//  requestId: string
//  plugin: IlpPluginBtp
//  spspDetails: SPSPResponse
//  debug: Logger
//}
//
//class StreamAttempt {
//  private readonly _onMoney: (event: OnMoneyEvent) => void
//  private readonly _bandwidth: Bandwidth
//  // eslint-disable-next-line @typescript-eslint/no-explicit-any
//  private readonly _debug: Logger
//  private readonly _plugin: IlpPluginBtp
//  private readonly _spspDetails: SPSPResponse
//
//  private _ilpStream!: DataAndMoneyStream
//  private _connection!: Connection
//  private _active = true
//  private _lastDelivered = 0
//
//  constructor(opts: StreamAttemptOptions) {
//    this._onMoney = opts.onMoney
//    this._bandwidth = opts.bandwidth
//    this._plugin = opts.plugin
//    this._spspDetails = opts.spspDetails
//    this._debug = opts.debug
//  }
//
//  getTotalSent(): number { return this._connection.totalSent }
//
//  // TODO return Connection instead?
//  async startStream({btpToken, throughput}: RedeemedToken): Promise<boolean> { // returns isTokenExhausted
//    if (!this._active) return
//    const plugin = this._plugin
//
//    this._debug('creating ilp/stream connection.')
//    this._connection = await createConnection({
//      ...this._spspDetails,
//      plugin,
//      slippage: 1.0,
//      exchangeRate: 1.0,
//      maximumPacketAmount: '10000000',
//      getExpiry: getFarFutureExpiry
//    })
//    if (!this._active) return
//
//    this._ilpStream = this._connection.createStream()
//    return new Promise((resolve, reject) => {
//      const onMoney = (sentAmount: string) => {
//        console.log('onMoney', sentAmount) // XXX
//        // Wait until `setImmediate` so that `connection.totalDelivered` has been updated.
//        const receipt = this._ilpStream.receipt?.toString('base64')
//        setImmediate(() => this.onMoney(sentAmount, receipt))
//      }
//
//      const onPluginDisconnect = async () => {
//        this._debug('onPluginDisconnect()')
//        cleanUp()
//        this._debug('stream.isOpen=%s connection.closed=%s plugin.isConnected=%s',
//          this._ilpStream.isOpen(), this._connection['closed'], this._plugin.isConnected())
//
//        if (this._ilpStream.isOpen()) { // XXX is destroying here redundant?
//          this._ilpStream.destroy()
//        }
//        if (!this._connection['closed']) { // TODO remove condition?
//          await this._connection.destroy()
//        }
//        resolve(false)
//      }
//
//      const onConnectionError = (err: Error) => {
//        cleanUp(err)
//        if (
//          btpToken &&
//          err.ilpReject &&
//          err.ilpReject.message === 'exhausted capacity.' &&
//          err.ilpReject.data.equals(await sha256(Buffer.from(btpToken)))
//        ) {
//          resolve(true)
//        } else {
//          reject(err)
//        }
//      }
//
//      const cleanUp = (err?: Error) => {
//        this._debug('cleanup(err=%s)', err)
//        this._ilpStream.removeListener('outgoing_money', onMoney)
//        this._connection.removeListener('error', onConnectionError)
//        plugin.removeListener('disconnect', onPluginDisconnect)
//        this._bandwidth.stop()
//      }
//
//      plugin.once('disconnect', onPluginDisconnect)
//      this._ilpStream.on('outgoing_money', onMoney)
//      this._connection.once('error', onConnectionError)
//
//      console.log("setSendMax initial", this._bandwidth.initialSendMax())
//      this._ilpStream.setSendMax(this._bandwidth.initialSendMax())
//      void this._bandwidth.start(this._ilpStream)
//    })
//  }
//
//  async stopStream(): Promise<void> {
//    this._active = false
//    this._bandwidth.stop()
//    if (!this._connection) return
//
//    this._debug('initiating stream shutdown')
//    /*if (this._ilpStream.isOpen()) {
//      // Stop it sending any more than is already sent
//      this._ilpStream.setSendMax(this._ilpStream.totalSent)
//    }*/
//    await this.waitTillEnd(15e3)
//    /*
//    await new Promise(resolve => {
//      this._debug('severing ilp/stream connection.')
//      this._ilpStream.once('close', resolve)
//      this._ilpStream.destroy()
//    })
//    this._debug(
//      'stream close event fired; plugin connected=',
//      this._plugin.isConnected()
//    )
//    await this._connection.end()
//    this._debug('connection destroyed')
//    */
//  }
//
//  getTotalSent(): number {
//    console.log("getTotalSent", this._connection && this._connection.totalSent)
//    return this._connection ? +this._connection.totalSent : 0
//    //console.log("getTotalSent", this._ilpStream && this._ilpStream.totalSent)
//    //return this._ilpStream ? +this._ilpStream.totalSent : 0
//  }
//
//  private onMoney(sentAmount: string, receipt?: string): void {
//    const delivered = Number(this._connection.totalDelivered)
//    const amount = delivered - this._lastDelivered
//    this._debug('delivered', delivered, 'lastDelivered', this._lastDelivered)
//    this._lastDelivered = delivered
//
//    this._onMoney({
//      sentAmount,
//      // dest=received
//      amount,
//      assetCode: notNullOrUndef(this._connection.destinationAssetCode), // XXX fails??
//      assetScale: notNullOrUndef(this._connection.destinationAssetScale),
//      receipt,
//      // source=source
//      sourceAmount: sentAmount,
//      sourceAssetCode: this._connection.sourceAssetCode,
//      sourceAssetScale: this._connection.sourceAssetScale
//    })
//  }
//
//  // TODO where does this go?
//  private async waitTillEnd(waitMs: number): Promise<void> {
//    let timer
//    const fail = (err?: Error): void => {
//      this._debug('waitTillEnd failed, destroying connection err=%s', err)
//      this._connection.destroy()
//    }
//    const waitEnd = this._connection.end().catch(fail)
//    const waitTime = new Promise((resolve) => timer = setTimeout(resolve, waitMs)).then(() => fail())
//    await Promise.race([waitEnd, waitTime])
//    clearTimeout(timer)
//  }
//}

//interface Bandwidth {
//  initialSendMax(): number
//  start(setSendMax: (sendMax: number) => void): Promise<void>
//  stop(): void
//}

async function firstMinuteBandwidth(stream: DataAndMoneyStream, throughput: number): Promise<void> {
  // Start paying immediately so the page knows that the user agent is monetized.
  // But the amount it isn't too high so that the user doesn't deplete their
  // balance by browsing quickly from page-to-page.
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
    console.log("FirstMinuteBandwidth:sendMax = ", time, "* throughput", "delay=", delay) // XXX
    console.log("setSendMax", time === 60 ? FULL_TOKEN_AMOUNT : (time * throughput))
    stream.setSendMax(time === 60 ? FULL_TOKEN_AMOUNT : (time * throughput))
  }
}

// Note: this does _not_ verify the error's digest, so the error may be forged.
function isExhaustedError(err: any): boolean {
  return err['ilpReject']?.message === 'exhausted capacity.'
}

/*
// Send the first token (on page load) piecewise. After 1 minute, switch to full tokens.
class FirstMinuteBandwidth implements Bandwidth {
  private stopped: boolean = false
  private timer?: NodeJS.Timer
  private cancelTimer?: () => void
  constructor(private throughput: number) {}

  initialSendMax(): number {
  }

  async start(setSendMax: (sendMax: number) => void): Promise<void> {
  }

  stop(): void {
    this.stopped = true
    if (this.timer) clearTimeout(this.timer)
    if (this.cancelTimer) this.cancelTimer()
  }
}

function makeFixedBandwidth(tokenFraction: number, throughput: number): FixedBandwidth {
  console.log("tokenFraction:",tokenFraction,"throughput:", throughput,"⇒", 1.0 <= tokenFraction ? FULL_TOKEN_AMOUNT : (tokenFraction * 60 * throughput))
  return new FixedBandwidth(1.0 <= tokenFraction ? FULL_TOKEN_AMOUNT : (tokenFraction * 60 * throughput))
}

function computeFixedBandwidth(tokenFraction: number, throughput: number): number {
  return 1.0 <= tokenFraction ? FULL_TOKEN_AMOUNT : (tokenFraction * 60 * throughput)
}

class FixedBandwidth implements Bandwidth {
  constructor(public sendMax: number) {}
  initialSendMax(): number { return this.sendMax }
  async start(setSendMax: (sendMax: number) => void): Promise<void> {}
  stop(): void {}
}
*/

async function sha256(preimage: Buffer): Promise<Buffer> {
  return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, preimage))
}
