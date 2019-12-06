/* eslint-disable @typescript-eslint/no-non-null-assertion */

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
import {
  MonetizationProgressEvent,
  MonetizationStartEvent
} from '@web-monetization/types'

import { DocumentMonetization } from './DocumentMonetization'
import { debug } from './logging'

const UPDATE_AMOUNT_INTERVAL = 2000

export enum MonetizationStateEnum {
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

  private state: MonetizationStateEnum = MonetizationStateEnum.STOPPED
  private active = false

  private activeChanges: EventEmitter = new EventEmitter()
  private backoff = new BackoffWaiter()
  private lastDelivered = 0
  private loop: Promise<void> | null = null
  private existing?: Promise<void>

  private readonly tiers: BandwidthTiers
  private adaptiveBandwidth!: AdaptiveBandwidth
  private monetization: DocumentMonetization

  refreshBtpToken(btpToken: string) {
    this.btpToken = btpToken
  }

  constructor(deps: Injector) {
    this.tiers = deps(BandwidthTiers)
    this.monetization = new DocumentMonetization(document)
  }

  async start(opts: StreamStartOpts) {
    await this.finalizeExisting()
    this.active = true
    this.btpToken = opts.btpToken
    this.btpEndpoint = opts.btpEndpoint || BTP_ENDPOINT_DEFAULT
    this.requestId = opts.requestId
    this.paymentPointer = opts.paymentPointer
    this.spspEndpoint = opts.spspEndpoint
    this.pageUrl = opts.pageUrl
    this.adaptiveBandwidth = new AdaptiveBandwidth(opts.pageUrl, this.tiers)
    this.monetization.setMonetizationRequest({
      paymentPointer: opts.paymentPointer,
      requestId: opts.requestId
    })

    if (!this.loop) {
      this.loop = this.streamRetryLoop()
    }
    this.activeChanges.emit('start')
  }

  async finalizeExisting() {
    if (this.existing) {
      try {
        await this.existing
      } catch (e) {
        //
      } finally {
        this.existing = undefined
      }
    }
  }

  async stop() {
    this.active = false
    this.monetization.setState('stopped')
    this.monetization.setMonetizationRequest(undefined)
    this.state = MonetizationStateEnum.STOPPED
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
        // await this.finalizeExisting()
        this.monetization.setState('pending')
        debug('Start streamPayment()')
        const promise = (this.existing = this.streamPayment(
          await getSPSPResponse(this.spspEndpoint, this.requestId)
        ))
        await promise
        debug('End streamPayment()')
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

    const plugin = new PluginBtp({
      server: this.btpEndpoint,
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

      const adaptiveBandwidth = this.adaptiveBandwidth
      const initialSendMaxAmount = await adaptiveBandwidth.getStreamSendMax()
      const stream = connection.createStream()
      stream.setSendMax(initialSendMaxAmount)

      const promise = new Promise((resolve, reject) => {
        const boundOutgoingMoney = (sentAmount: string) => {
          setImmediate(this.onOutgoingMoney.bind(this), connection, sentAmount)
        }
        const onPluginDisconnect = async () => {
          cleanUp()
          // stream.destroy()
          // // We need to wait for this else we get nasty errors in the console
          // // re: messages trying to be written, perhaps by plugin.disconnect()
          // await connection.destroy()
          resolve()
        }

        const onConnectionClose = () => {
          cleanUp()
          reject(new Error('connection closed'))
        }

        const onStop = onPluginDisconnect

        const onUpdateAmountInterval = async () => {
          const sendMaxAmount = await adaptiveBandwidth.getStreamSendMax()
          if (stream.isOpen()) {
            stream.setSendMax(sendMaxAmount)
          }
        }

        const addSentAmount = asyncUtils.onlyOnce(() => {
          adaptiveBandwidth.addSentAmount(stream.totalSent)
        })

        const cleanUp = asyncUtils.onlyOnce(() => {
          debug('cleanUp()')
          plugin.removeListener('disconnect', onPluginDisconnect)
          stream.removeListener('outgoing_money', boundOutgoingMoney)
          connection.removeListener('close', onConnectionClose)
          addSentAmount()
          this.activeChanges.removeListener('stop', onStop)
          this.lastDelivered = 0
          this.monetization.setState('stopped')
          this.monetization.setMonetizationRequest(undefined)
          this.state = MonetizationStateEnum.STOPPED
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          clearInterval(updateAmountInterval)
        })

        plugin.on('disconnect', onPluginDisconnect)
        stream.on('outgoing_money', boundOutgoingMoney)
        connection.on('close', onConnectionClose)
        this.activeChanges.once('stop', () => {
          debug('activeChanges on stop!')
          onStop()
        })
        const updateAmountInterval = setInterval(
          onUpdateAmountInterval,
          UPDATE_AMOUNT_INTERVAL
        )
      })
      await promise
    } finally {
      await plugin.disconnect()
    }
  }

  private onOutgoingMoney(connection: IlpStream.Connection, _: string) {
    if (this.state === MonetizationStateEnum.STOPPED) {
      this.state = MonetizationStateEnum.STARTED
      this.dispatchMonetizationStart()
    }

    // WM api deals in receiver units so we need to calculate how much the
    // receiver got from this packet.
    const deliveredAmount =
      Number(connection.totalDelivered) - this.lastDelivered
    this.lastDelivered = Number(connection.totalDelivered)
    this.dispatchMonetizationProgress(connection, deliveredAmount.toString())
  }

  private dispatchMonetizationStart() {
    const detail: MonetizationStartEvent['detail'] = {
      paymentPointer: this.paymentPointer!,
      requestId: this.requestId!
    }
    this.monetization.dispatchMonetizationStartEventAndSetMonetizationState(
      detail
    )
  }

  private dispatchMonetizationProgress(
    connection: IlpStream.Connection,
    amount: string
  ) {
    const detail: MonetizationProgressEvent['detail'] = {
      amount,
      assetCode: connection.destinationAssetCode!,
      assetScale: connection.destinationAssetScale!,
      paymentPointer: this.paymentPointer!,
      requestId: this.requestId!
    }
    this.monetization.dispatchMonetizationProgressEvent(detail)
  }
}
