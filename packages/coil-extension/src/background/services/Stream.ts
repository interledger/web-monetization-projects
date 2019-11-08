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
  BandwidthTiers,
  getSPSPResponse,
  PaymentDetails,
  SPSPResponse,
  SPSPError
} from '@web-monetization/polyfill-utils'
import { GraphQlClient } from '@coil/client'
import { Container } from 'inversify'

import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'

const { timeout, onlyOnce } = asyncUtils

const UPDATE_AMOUNT_TIMEOUT = 2000

// @sharafian explained to me that the extension popup shows source amounts,
// while the web-monetization-scripts which use the monetizationprogress
// event show received amounts.
export interface StreamMoneyEvent {
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
}

export class Stream extends EventEmitter {
  private readonly _requestId: string
  private readonly _spspUrl: string
  private readonly _paymentPointer: string
  private _token: string
  private readonly _debug: (...args: any[]) => void
  private readonly _server: string
  private readonly _tiers: BandwidthTiers
  private readonly _initiatingUrl: string

  private _lastDelivered: number
  private _lastOutgoingMs!: number
  private _packetNumber!: number
  private _active: boolean
  private _plugin!: IlpPluginBtp
  private _ilpStream!: DataAndMoneyStream
  private _connection!: Connection
  private _bandwidth: AdaptiveBandwidth
  private _client: GraphQlClient
  private _coilDomain: string

  constructor(
    container: Container,
    {
      requestId,
      spspEndpoint,
      paymentPointer,
      token,
      initiatingUrl
    }: PaymentDetails & {
      token: string
      initiatingUrl: string
    }
  ) {
    super()

    this._paymentPointer = paymentPointer
    this._requestId = requestId
    this._spspUrl = spspEndpoint
    this._token = token
    this._client = container.get(GraphQlClient)
    this._tiers = container.get(BandwidthTiers)
    this._coilDomain = container.get(tokens.CoilDomain)

    // this._debug = makeDebug('coil-extension:stream:' + this._id)
    // We use bind rather than an anonymous function so that the line
    // numbers are maintained in developer tools to aid in debugging.
    // eslint-disable-next-line no-console
    this._debug = console.log.bind(
      console,
      `coil-extension:stream:${this._requestId}`
    )

    this._active = false
    this._lastDelivered = 0
    this._initiatingUrl = initiatingUrl
    this._bandwidth = new AdaptiveBandwidth(
      this._initiatingUrl,
      this._tiers,
      this._debug
    )

    const server = new URL(this._coilDomain)
    server.pathname = '/btp'
    this._server = server.href.replace(/^http/, 'btp+ws')

    if (this._initiatingUrl.match(/http:\/\/localhost:[34]000/)) {
      if (paymentPointer.match(/http:\/\/localhost:4000\/spsp/)) {
        this._server = 'btp+ws://localhost:3000'
      }
      // Support local dev SPSP server
      if (paymentPointer.match(/http:\/\/localhost:8080/)) {
        this._server = 'btp+ws://localhost:7768'
      }
    }
  }

  async start() {
    if (!this._active) {
      this._packetNumber = 0
      this._active = true

      // Hack for for issue #144
      // Let pause() stream when tab is backgrounded have a chance to
      // to work to avoid wasted refreshBtpToken/SPSP queries
      await timeout(1)
      if (!this._active) return

      // reset our timer when we start streaming.
      this._bandwidth.reset()

      while (this._active) {
        try {
          await this._stream()
          await timeout(1000)
        } catch (e) {
          this._debug('error streaming. retry in 2s. err=', e.message)
          await this._cleanUpFailedStream()
          await timeout(2000)
        }
      }

      this._debug('aborted because stream is no longer active.')
    }
  }

  async _cleanUpFailedStream() {
    if (this._plugin) {
      await this._plugin.disconnect()
    }
  }

  async _getBtpToken() {
    try {
      this._debug('fetching btp token')
      return await this._client.refreshBtpToken(this._token)
    } catch (e) {
      this._debug('error fetching btp token', e.message)
      throw e
    }
  }

  async _getPlugin() {
    const btpToken = await this._getBtpToken()

    // these are interspersed in order to not waste time if connection
    // is severed before full establishment
    if (!this._active) throw new Error('aborted monetization')

    const tier = await this._tiers.getTier(this._initiatingUrl)
    const serverWithTier = `${this._server}?tier=${tier}`

    if (!this._active) throw new Error('aborted monetization')

    this._plugin = new IlpPluginBtp({
      server: serverWithTier,
      btpToken
    })

    this._debug('connecting ilp plugin. server=', this._server)
    // createConnection(...) does this, so this is somewhat superfluous
    await this._plugin.connect()

    return this._plugin
  }

  async _getSPSPDetails() {
    this._debug('fetching spsp details. url=', this._spspUrl)
    let details: SPSPResponse
    try {
      details = await getSPSPResponse(this._spspUrl, this._requestId)
    } catch (e) {
      if (e instanceof SPSPError) {
        const status = e.response ? e.response.status : undefined
        // Abort on Bad Request 4XX
        if (!status || (status >= 400 && status < 500)) {
          this.abort()
        }
      }
      throw e
    }
    if (!this._active) throw new Error('aborted monetization')
    return details
  }

  async _stream() {
    this._lastOutgoingMs = Date.now()

    const [plugin, spspDetails] = await Promise.all([
      this._getPlugin(),
      this._getSPSPDetails()
    ])

    if (!this._active) return

    this._debug('creating ilp/stream connection.')
    this._connection = await createConnection({
      ...spspDetails,
      plugin,
      slippage: 0.05
    })

    if (!this._active) return

    // send practically forever at allowed bandwidth
    this._debug('attempting to send on connection.')
    this._ilpStream = this._connection.createStream()

    // TODO: if we save the tier from earlier we don't need to do this async
    // TODO: does doing this async allow a race condition if we stop right away
    const initialSendAmount = await this._bandwidth.getStreamSendMax()
    this._ilpStream.setSendMax(initialSendAmount)
    this._lastDelivered = 0

    return new Promise((resolve, reject) => {
      const onMoney = (sentAmount: string) => {
        this.onMoney(sentAmount)
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

        if (this._plugin.isConnected()) {
          this._debug('waiting plugin disconnect')
          await this._plugin.disconnect()
          this._debug('plugin disconnected')
        }

        // resolve instead of reject to avoid delay
        this._debug('resolving')
        resolve()
      }

      const onConnectionClose = () => {
        // TODO: this seems to *always* run despite the cleanup() call in
        //   the onPluginDisconnect() callback.
        //   This then is essentially a noop ? Is there any case where plugin
        //    disconnected won't be run first ?
        this._debug('onConnectionClose()')
        cleanUp()
        reject(new Error('connection closed.'))
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

      const addSentOnce = onlyOnce(() => {
        this._bandwidth.addSentAmount(this._ilpStream.totalSent)
      })

      const cleanUp = () => {
        this._debug('cleanup()')
        this._ilpStream.removeListener('outgoing_money', onMoney)
        this._connection.removeListener('close', onConnectionClose)
        addSentOnce()
        plugin.removeListener('disconnect', onPluginDisconnect)
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        clearTimeout(updateAmountTimeout)
      }

      plugin.once('disconnect', onPluginDisconnect)
      this._ilpStream.on('outgoing_money', onMoney)
      this._connection.once('close', onConnectionClose)
      let updateAmountTimeout = setTimeout(
        onUpdateAmountTimeout,
        UPDATE_AMOUNT_TIMEOUT
      )
    })
  }

  onMoney(sentAmount: string) {
    const delivered = Number(this._connection.totalDelivered)
    const amount = delivered - this._lastDelivered
    this._debug('delivered', delivered, 'lastDelivered', this._lastDelivered)
    this._lastDelivered = delivered

    if (amount > 0) {
      this._debug(`emitting money. amount=${amount}`)
      const now = Date.now()
      const msSinceLastPacket = now - this._lastOutgoingMs
      this._lastOutgoingMs = now
      const event: StreamMoneyEvent = {
        paymentPointer: this._paymentPointer,
        packetNumber: this._packetNumber++,
        requestId: this._requestId,
        initiatingUrl: this._initiatingUrl,
        msSinceLastPacket: msSinceLastPacket,
        sentAmount: sentAmount,

        // dest=received
        amount: String(amount),
        assetCode: notNullOrUndef(this._connection.destinationAssetCode),
        assetScale: notNullOrUndef(this._connection.destinationAssetScale),

        // source=source
        sourceAmount: sentAmount,
        sourceAssetCode: this._connection.sourceAssetCode,
        sourceAssetScale: this._connection.sourceAssetScale
      }
      this.emit('money', event)
    }
  }

  async stop() {
    this._active = false
    if (this._connection) {
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
      this._debug('stream close event fired')
      this._debug('plugin connected', this._plugin.isConnected())
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
  }

  async waitHoldsUptoMs(totalMs: number) {
    while ((totalMs -= 100) >= 0) {
      const holds = Object.keys(this._ilpStream['holds']).length
      this._debug({ holds: holds })
      if (holds === 0) {
        break
      } else {
        await timeout(100)
      }
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
}
