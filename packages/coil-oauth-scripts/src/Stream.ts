import { EventEmitter } from 'events'

import PluginBtp from 'ilp-plugin-btp'
import * as IlpStream from 'ilp-protocol-stream'
import { Injector } from 'reduct'
import {
  AdaptiveBandwidth,
  asyncUtils,
  BackoffWaiter,
  BandwidthTiers,
  getSPSPResponse,
  SPSPResponse
} from '@web-monetization/polyfill-utils'

import { getDoc } from './documentExtensions'

const UPDATE_AMOUNT_INTERVAL = 2000

export enum MonetizationState {
  STOPPED,
  STARTED
}

export interface StreamStartOpts {
  btpToken: string
  btpEndpoint?: string
  spspEndpoint: string
  paymentPointer: string
  pageUrl: string
  requestId: string
}

const BTP_ENDPOINT_DEFAULT = 'btp+wss://coil.com/btp'

export class Stream {
  // StreamStartOpts ...
  // TODO: one field
  private requestId?: string
  private spspEndpoint?: string
  private btpToken?: string
  private btpEndpoint = BTP_ENDPOINT_DEFAULT
  private paymentPointer?: string
  private pageUrl?: string

  private state: MonetizationState = MonetizationState.STOPPED
  private active = false

  private activeChanges: EventEmitter = new EventEmitter()
  private backoff = new BackoffWaiter()
  private lastDelivered = 0
  private loop: Promise<void> | null = null

  private readonly tiers: BandwidthTiers
  private adaptiveBandwidth!: AdaptiveBandwidth

  refreshBtpToken(btpToken: string) {
    this.btpToken = btpToken
  }

  constructor(deps: Injector) {
    this.tiers = deps(BandwidthTiers)
  }

  start(opts: StreamStartOpts) {
    this.active = true
    this.btpToken = opts.btpToken
    this.btpEndpoint = opts.btpEndpoint || BTP_ENDPOINT_DEFAULT
    this.requestId = opts.requestId
    this.paymentPointer = opts.paymentPointer
    this.spspEndpoint = opts.spspEndpoint
    this.pageUrl = opts.pageUrl
    this.adaptiveBandwidth = new AdaptiveBandwidth(opts.pageUrl, this.tiers)

    if (!this.loop) {
      this.loop = this.streamRetryLoop()
    }
    this.activeChanges.emit('start')
  }

  stop() {
    this.active = false
    this.activeChanges.emit('stop')
  }

  isActive() {
    return this.active
  }

  private async streamRetryLoop(): Promise<void> {
    if (!this.spspEndpoint) {
      throw new Error('no spspEndpoint; was init called?')
    }

    if (!this.requestId) {
      throw new Error('no streamId; was init called?')
    }

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (!this.isActive()) {
        await new Promise(resolve => this.activeChanges.once('start', resolve))
      }

      try {
        await this.streamPayment(
          await getSPSPResponse(this.spspEndpoint, this.requestId)
        )
      } catch (e) {
        // TODO: a way to toggle this?
        console.error(`streaming error; retry in ${this.backoff} ms. error=`, e)
        await this.backoff.waitAndBackoff()
      }
    }
  }

  private async streamPayment(details: SPSPResponse): Promise<void> {
    if (!this.btpToken) {
      throw new Error('no btpToken; was init called?')
    }

    if (!this.spspEndpoint) {
      throw new Error('no spspEndpoint; was init called?')
    }

    if (!this.isActive()) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tier = await this.tiers.getTier(this.pageUrl!)
    const serverWithTier = `${this.btpEndpoint}?tier=${tier}`

    const plugin = new PluginBtp({
      server: serverWithTier,
      btpToken: this.btpToken
    })

    try {
      await plugin.connect()
      this.backoff.reset()

      if (!this.isActive()) {
        return
      }

      const connection = await IlpStream.createConnection({
        plugin,
        slippage: 0.05,
        ...details
      })

      if (!this.isActive()) {
        await connection.destroy()
        return
      }

      const initialSendMaxAmount = await this.adaptiveBandwidth.getStreamSendMax()
      const stream = connection.createStream()
      stream.setSendMax(initialSendMaxAmount)

      await new Promise((resolve, reject) => {
        const boundOutgoingMoney = this.onOutgoingMoney.bind(this, connection)
        const onPluginDisconnect = async () => {
          cleanUp()
          stream.destroy()
          // We need to wait for this else we get nasty errors in the console
          // re: messages trying to be written, perhaps by plugin.disconnect()
          await connection.destroy()
          resolve()
        }

        const onConnectionClose = () => {
          cleanUp()
          reject(new Error('connection closed'))
        }

        const onStop = onPluginDisconnect

        const onUpdateAmountInterval = async () => {
          const sendMaxAmount = await this.adaptiveBandwidth.getStreamSendMax()
          if (stream.isOpen()) {
            stream.setSendMax(sendMaxAmount)
          }
        }

        const addSentAmount = asyncUtils.onlyOnce(() => {
          this.adaptiveBandwidth.addSentAmount(stream.totalSent)
        })

        const cleanUp = () => {
          // TODO: comment why using setImmediate here
          setImmediate(() => {
            plugin.removeListener('disconnect', onPluginDisconnect)
            stream.removeListener('outgoing_money', boundOutgoingMoney)
            connection.removeListener('close', onConnectionClose)
            addSentAmount()
            this.activeChanges.removeListener('stop', onStop)
            this.lastDelivered = 0
            getDoc().monetization.state = 'pending'
            clearInterval(updateAmountInterval)
          })
        }

        plugin.on('disconnect', onPluginDisconnect)
        stream.on('outgoing_money', boundOutgoingMoney)
        connection.on('close', onConnectionClose)
        this.activeChanges.on('stop', onStop)
        const updateAmountInterval = setInterval(
          onUpdateAmountInterval,
          UPDATE_AMOUNT_INTERVAL
        )
      })
    } finally {
      await plugin.disconnect()
    }
  }

  private onOutgoingMoney(
    connection: IlpStream.Connection,
    sentAmount: string
  ) {
    if (this.state === MonetizationState.STOPPED) {
      this.state = MonetizationState.STARTED
      this.dispatchMonetizationStart()
    }

    // WM api deals in receiver units so we need to calculate how much the
    // receiver got from this packet.
    // TODO: should we be using some kind of bignumber for this?
    const deliveredAmount =
      Number(connection.totalDelivered) - this.lastDelivered
    this.lastDelivered = Number(connection.totalDelivered)
    this.dispatchMonetizationProgress(connection, deliveredAmount.toString())
  }

  private dispatchMonetizationStart() {
    const monetization = getDoc().monetization
    monetization.state = 'started'
    monetization.dispatchEvent(
      new CustomEvent('monetizationstart', {
        detail: {
          // TODO: We want meta[content] to support https:// urls as well
          // so what do we actually call this
          paymentPointer: this.paymentPointer,
          // TODO: correlation id makes more sense again ...
          // or stream id ... though STREAM id already has some kind of meaning
          // TODO: use new types
          requestId: this.requestId
        }
      })
    )
  }

  private dispatchMonetizationProgress(
    connection: IlpStream.Connection,
    amount: string
  ) {
    const detail = {
      amount,
      assetCode: connection.destinationAssetCode,
      assetScale: connection.destinationAssetScale,
      paymentPointer: this.paymentPointer,
      requestId: this.requestId
      // TODO: sourceAmount/sourceAssetCode/sourceAssetScale ?
    }
    getDoc().monetization.dispatchEvent(
      new CustomEvent('monetizationprogress', {
        detail: detail
      })
    )
  }
}
