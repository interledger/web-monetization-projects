// const makeDebug = require('debug')
import { EventEmitter } from 'events'

import {
  Connection,
  createConnection,
  DataAndMoneyStream
} from 'ilp-protocol-stream'
import IlpPluginBtp from 'ilp-plugin-btp'
import {
  AdaptiveBandwidth,
  asyncUtils,
  getFarFutureExpiry,
  getSPSPResponse,
  PaymentDetails,
  SPSPError,
  SPSPResponse
} from '@webmonetization/polyfill-utils'
import { Container, inject, injectable, optional } from 'inversify'

import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'
import { BuildConfig } from '../../types/BuildConfig'
import { BandwidthTiers } from '../../services/BandwidthTiers'

import { AnonymousTokens } from './AnonymousTokens'
import { Logger, logger } from './utils'

const { timeout } = asyncUtils

const UPDATE_AMOUNT_TIMEOUT = 2000
let ATTEMPT = 0

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

interface CreateStreamDetails extends PaymentDetails {
  token: string
  spspEndpoint: string
  initiatingUrl: string
}

@injectable()
export class Stream extends EventEmitter {
  private readonly _requestId: string
  private readonly _spspUrl: string
  private readonly _paymentPointer: string
  private _authToken: string

  private readonly _server: string
  private readonly _tiers: BandwidthTiers
  private readonly _initiatingUrl: string

  private _lastDelivered: number
  private _lastOutgoingMs!: number
  private _packetNumber!: number
  private _active: boolean
  private _looping: boolean
  private _attempt: StreamAttempt | null
  private _coilDomain: string
  private _anonTokens: Pick<AnonymousTokens, 'getToken' | 'removeToken'>

  private _assetCode: string
  private _assetScale: number
  private _exchangeRate: number

  constructor(
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    @logger('Stream')
    private readonly _debug: Logger,
    private container: Container,
    @inject(tokens.CreateStreamDetails)
    details: CreateStreamDetails,
    @inject(tokens.BtpEndpoint)
    @optional()
    private btpEndpoint?: string
  ) {
    super()

    const { requestId, spspEndpoint, paymentPointer, token, initiatingUrl } =
      details

    this._paymentPointer = paymentPointer
    this._requestId = requestId
    this._spspUrl = spspEndpoint
    this._authToken = token
    this._tiers = container.get(BandwidthTiers)
    this._coilDomain = container.get(tokens.CoilDomain)
    this._anonTokens = container.get(AnonymousTokens)

    this._assetCode = ''
    this._assetScale = 0
    this._exchangeRate = 1

    this._active = false
    this._looping = false
    this._attempt = null
    this._lastDelivered = 0
    this._initiatingUrl = initiatingUrl

    const server = new URL(this._coilDomain)
    server.pathname = '/btp'
    this._server = server.href.replace(/^http/, 'btp+ws')

    if (this.btpEndpoint) {
      this._server = this.btpEndpoint
    }
  }

  async start() {
    if (this._active) return
    this._active = true

    // reset this upon every start *before* early exit while _looping
    this._packetNumber = 0

    if (this._looping) return
    this._looping = true

    if (this._attempt) {
      void this._attempt.stop()
      this._attempt = null
    }

    // Hack for for issue #144
    // Let pause() stream when tab is backgrounded have a chance to
    // to work to avoid wasted refreshBtpToken/SPSP queries
    await timeout(1)
    if (!this._active) {
      this._looping = false
      return
    }

    // reset our timer when we start streaming.
    const bandwidth = new AdaptiveBandwidth(
      this._initiatingUrl,
      this._tiers,
      this._debug
    )

    while (this._active) {
      let btpToken: string | undefined
      let plugin, attempt
      try {
        const spspDetailsPromise = await this._getSPSPDetails()
        btpToken = await this._anonTokens.getToken(this._authToken)
        plugin = await this._makePlugin(btpToken)
        const spspDetails = await spspDetailsPromise
        this.container
          .rebind(tokens.NoContextLoggerName)
          .toConstantValue(`StreamAttempt:${this._requestId}:${++ATTEMPT}`)
        attempt = this._attempt = new StreamAttempt({
          bandwidth,
          onMoney: this.onMoney.bind(this),
          requestId: this._requestId,
          plugin,
          spspDetails,
          debug: this.container.get(tokens.Logger)
        })
        if (this._active) {
          await attempt.start()
          await timeout(1000)
        }
      } catch (e) {
        const { ilpReject } = e
        if (
          btpToken &&
          ilpReject &&
          ilpReject.message === 'exhausted capacity.' &&
          ilpReject.data.equals(await sha256(Buffer.from(btpToken)))
        ) {
          this._debug('anonymous token exhausted; retrying, err=%s', e.message)
          this._anonTokens.removeToken(btpToken)
          continue
        }
        this._debug('error streaming. retry in 2s. err=', e.message, e.stack)
        if (this._active) await timeout(2000)
      } finally {
        if (attempt) bandwidth.addSentAmount(attempt.getTotalSent())
        if (plugin) await plugin.disconnect()
      }
    }

    this._looping = false
    this._debug('aborted because stream is no longer active.')
  }

  async _makePlugin(btpToken: string) {
    // these are interspersed in order to not waste time if connection
    // is severed before full establishment
    if (!this._active) throw new Error('aborted monetization')

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
    const spspUrl = this.buildConfig.useLocalMockServer
      ? // TODO
        `http://localhost:4000/spsp/${encodeURIComponent(this._spspUrl)}`
      : this._spspUrl

    this._debug('fetching spsp details. url=', spspUrl)
    let details: SPSPResponse
    try {
      this.emit('spsp-event', 'loadstart', this._requestId)
      details = await getSPSPResponse(spspUrl, this._requestId)
      this.emit('spsp-event', 'load', this._requestId)
    } catch (e) {
      if (e instanceof SPSPError) {
        const status = e.response?.status
        this.emit('spsp-event', 'error', this._requestId, e.message)
        // Abort on Bad Request 4XX
        if (!status || (status >= 400 && status < 500)) {
          this.emit('spsp-event', 'abort', this._requestId)
          this.abort()
        }
      }
      throw e
    }
    if (!this._active) throw new Error('aborted monetization')
    return details
  }

  onMoney(data: OnMoneyEvent) {
    if (data.amount <= 0) return

    const now = Date.now()
    const msSinceLastPacket = now - this._lastOutgoingMs
    this._lastOutgoingMs = now
    const event: StreamMoneyEvent = Object.assign(data, {
      paymentPointer: this._paymentPointer,
      packetNumber: this._packetNumber++,
      requestId: this._requestId,
      initiatingUrl: this._initiatingUrl,
      msSinceLastPacket: msSinceLastPacket,
      amount: data.amount.toString(),
      receipt: data.receipt
    })
    this._assetCode = data.assetCode
    this._assetScale = data.assetScale
    this._exchangeRate =
      (Number(data.amount) / Number(data.sourceAmount)) *
      (10 ** data.assetScale / 10 ** data.sourceAssetScale)
    this.emit('money', event)
  }

  async stop() {
    this._active = false
    if (this._attempt) {
      await this._attempt.stop()
      this._attempt = null
    }
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

interface StreamAttemptOptions {
  bandwidth: AdaptiveBandwidth
  onMoney: (event: OnMoneyEvent) => void
  requestId: string
  plugin: IlpPluginBtp
  spspDetails: SPSPResponse
  debug: Logger
}

class StreamAttempt {
  private readonly _onMoney: (event: OnMoneyEvent) => void
  private readonly _bandwidth: AdaptiveBandwidth
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly _debug: Logger
  private readonly _plugin: IlpPluginBtp
  private readonly _spspDetails: SPSPResponse

  private _ilpStream!: DataAndMoneyStream
  private _connection!: Connection
  private _active = true
  private _lastDelivered = 0

  constructor(opts: StreamAttemptOptions) {
    this._onMoney = opts.onMoney
    this._bandwidth = opts.bandwidth
    this._plugin = opts.plugin
    this._spspDetails = opts.spspDetails
    this._debug = opts.debug
  }

  async start(): Promise<void> {
    if (!this._active) return
    const plugin = this._plugin

    this._debug('creating ilp/stream connection.')
    this._connection = await createConnection({
      ...this._spspDetails,
      plugin,
      slippage: 1.0,
      exchangeRate: 1.0,
      maximumPacketAmount: '10000000',
      getExpiry: getFarFutureExpiry
    })

    if (!this._active) return

    // send practically forever at allowed bandwidth
    this._debug('attempting to send on connection.')
    this._ilpStream = this._connection.createStream()

    // TODO: if we save the tier from earlier we don't need to do this async
    // TODO: does doing this async allow a race condition if we stop right away
    const initialSendAmount = await this._bandwidth.getStreamSendMax()
    this._ilpStream.setSendMax(initialSendAmount)

    return new Promise((resolve, reject) => {
      const onMoney = (sentAmount: string) => {
        // Wait until `setImmediate` so that `connection.totalDelivered` has been updated.
        const receipt = this._ilpStream.receipt
          ? this._ilpStream.receipt.toString('base64')
          : undefined
        setImmediate(this.onMoney.bind(this), sentAmount, receipt)
      }

      const onPluginDisconnect = async () => {
        this._debug('onPluginDisconnect()')
        cleanUp()
        this._debug(
          'this._ilpStream.isOpen()',
          this._ilpStream.isOpen(),
          "this._connection['closed']",
          this._connection['closed'],
          'this._plugin.isConnected()',
          this._plugin.isConnected()
        )

        if (this._ilpStream.isOpen()) {
          this._ilpStream.destroy()
        }

        if (!this._connection['closed']) {
          this._debug('waiting connection destroy')
          await this._connection.destroy()
          this._debug('connection destroyed')
        }

        if (plugin.isConnected()) {
          this._debug('waiting plugin disconnect')
          await plugin.disconnect()
          this._debug('plugin disconnected')
        }

        // resolve instead of reject to avoid delay
        this._debug('resolving')
        resolve()
      }

      const onConnectionError = (err: Error) => {
        this._debug('onConnectionError(%s)', err)
        cleanUp()
        reject(err)
      }

      const onUpdateAmountTimeout = async () => {
        // we set this before the async operation to prevent any race
        // conditions on cleanup
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        updateAmountTimeout = setTimeout(
          onUpdateAmountTimeout,
          UPDATE_AMOUNT_TIMEOUT
        )

        if (this._ilpStream.isOpen()) {
          const sendAmount = await this._bandwidth.getStreamSendMax()
          this._ilpStream.setSendMax(sendAmount)
        }
      }

      const cleanUp = () => {
        this._debug('cleanup()')
        this._ilpStream.removeListener('outgoing_money', onMoney)
        this._connection.removeListener('error', onConnectionError)
        plugin.removeListener('disconnect', onPluginDisconnect)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        clearTimeout(updateAmountTimeout)
      }

      plugin.once('disconnect', onPluginDisconnect)
      this._ilpStream.on('outgoing_money', onMoney)
      this._connection.once('error', onConnectionError)
      let updateAmountTimeout = setTimeout(
        onUpdateAmountTimeout,
        UPDATE_AMOUNT_TIMEOUT
      )
    })
  }

  async stop(): Promise<void> {
    this._active = false
    if (!this._connection) return

    this._debug('initiating stream shutdown')
    if (this._ilpStream.isOpen()) {
      // Stop it sending any more than is already sent
      this._ilpStream.setSendMax(this._ilpStream.totalSent)
    }
    await this.waitHoldsUptoMs(2e3)
    await new Promise(resolve => {
      this._debug('severing ilp/stream connection.')
      this._ilpStream.once('close', resolve)
      this._ilpStream.destroy()
    })
    this._debug(
      'stream close event fired; plugin connected=',
      this._plugin.isConnected()
    )
    await this._connection.end()
    this._debug('connection destroyed')
    // stream createConnection() automatically closes the plugin as of
    // time of writing: https://github.com/interledgerjs/ilp-protocol-stream/blob/9b49b1cad11d4b7a71fb31a8da61c729fbba7d9a/src/index.ts#L69-L71
    if (this._plugin.isConnected()) {
      this._debug('disconnecting plugin')
      await this._plugin.disconnect()
      this._debug('plugin disconnected')
    }
  }

  getTotalSent(): string {
    return this._ilpStream ? this._ilpStream.totalSent : '0'
  }

  private onMoney(sentAmount: string, receipt?: string): void {
    const delivered = Number(this._connection.totalDelivered)
    const amount = delivered - this._lastDelivered
    this._debug('delivered', delivered, 'lastDelivered', this._lastDelivered)
    this._lastDelivered = delivered

    this._onMoney({
      sentAmount,
      // dest=received
      amount,
      assetCode: notNullOrUndef(this._connection.destinationAssetCode),
      assetScale: notNullOrUndef(this._connection.destinationAssetScale),
      receipt,
      // source=source
      sourceAmount: sentAmount,
      sourceAssetCode: this._connection.sourceAssetCode,
      sourceAssetScale: this._connection.sourceAssetScale
    })
  }

  private async waitHoldsUptoMs(totalMs: number): Promise<void> {
    while (totalMs > 0) {
      const holds = Object.keys(this._ilpStream['holds']).length
      this._debug({ holds: holds })
      if (holds === 0) {
        break
      } else {
        await timeout(100)
        totalMs -= 100
      }
    }
  }
}

async function sha256(preimage: Buffer): Promise<Buffer> {
  const digest = await crypto.subtle.digest({ name: 'SHA-256' }, preimage)
  return Buffer.from(digest)
}
