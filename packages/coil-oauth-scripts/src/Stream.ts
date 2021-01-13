/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { EventEmitter } from 'events'

import PluginBtp from 'ilp-plugin-btp'
import * as IlpStream from 'ilp-protocol-stream'
import { Connection } from 'ilp-protocol-stream'
import { Injector } from 'reduct'
import {
  asyncUtils,
  BackoffWaiter,
  getFarFutureExpiry,
  getSPSPResponse,
  SPSPResponse,
  PaymentScheduler,
  ScheduleMode
} from '@web-monetization/polyfill-utils'
import {
  MonetizationProgressEvent,
  MonetizationStartEvent
} from '@web-monetization/types'

import { DocumentMonetization } from './DocumentMonetization'
import { debug } from './logging'

const UPDATE_AMOUNT_INTERVAL = 2000
// Use a high enough timeout to allow for large intervals between batches of payments.
const CONNECTION_IDLE_TIMEOUT = 5 * 60 * 1000

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

  //private adaptiveBandwidth!: AdaptiveBandwidth // XXX?
  private readonly monetization: DocumentMonetization
  private readonly schedule: PaymentScheduler = new PaymentScheduler(
    ScheduleMode.PrePay
  )

  private totalSentWatermark = 0 // tokens
  //private readonly throughput: number

  refreshBtpToken(btpToken: string) {
    this.btpToken = btpToken
  }

  constructor(deps: Injector) {
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
    //this.adaptiveBandwidth = new AdaptiveBandwidth(this.throughput) // XXX
    //this.schedule = new PaymentScheduler(ScheduleMode.PrePay)
    this.monetization.setMonetizationRequest({
      paymentPointer: opts.paymentPointer,
      requestId: opts.requestId
    })
    this.schedule.start()

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

  async stop(finalized = true) {
    this.schedule.stop()
    this.active = false
    this.monetization.setState({ state: 'stopped', finalized })
    if (finalized) {
      this.monetization.setMonetizationRequest(undefined)
    }
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
        this.monetization.setState({ state: 'pending' })
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

    const throughput = btpTokenThroughput(this.btpToken)
    //const schedule = new PaymentScheduler(ScheduleMode.PrePay)
    //schedule.start()

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
        slippage: 1.0,
        exchangeRate: 1.0,
        maximumPacketAmount: '10000000',
        idleTimeout: CONNECTION_IDLE_TIMEOUT,
        ...details,
        getExpiry: getFarFutureExpiry
      })

      if (!this.isActive()) {
        await connection.destroy()
        return
      }

      //const adaptiveBandwidth = this.adaptiveBandwidth
      //const initialSendMaxAmount = await adaptiveBandwidth.getStreamSendMax()
      const stream = connection.createStream()
      stream.setSendMax(throughput * 60 * this.currentStreamSendMax())

      const promise = new Promise<void>((resolve, reject) => {
        const boundOutgoingMoney = (sentAmount: string) => {
          this.schedule.onSent(+sentAmount / throughput / 60)
          const receipt = stream.receipt
            ? stream.receipt.toString('base64')
            : undefined
          setImmediate(
            this.onOutgoingMoney.bind(this),
            connection,
            sentAmount,
            receipt
          )
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
          // Round to ignore floating point errors.
          const newSendMax = Math.round(
            throughput * 60 * this.currentStreamSendMax()
          )
          if (+stream.sendMax < newSendMax) stream.setSendMax(newSendMax)
        }

        const cleanUp = asyncUtils.onlyOnce(() => {
          debug('cleanUp()')
          plugin.removeListener('disconnect', onPluginDisconnect)
          stream.removeListener('outgoing_money', boundOutgoingMoney)
          connection.removeListener('close', onConnectionClose)
          this.totalSentWatermark = this.schedule.totalSent()
          this.activeChanges.removeListener('stop', onStop)
          this.lastDelivered = 0
          this.monetization.setState({ state: 'stopped' })
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

  private onOutgoingMoney(
    connection: IlpStream.Connection,
    _: string, // sentAmount
    receipt?: string
  ) {
    if (this.state === MonetizationStateEnum.STOPPED) {
      this.state = MonetizationStateEnum.STARTED
      this.dispatchMonetizationStart()
    }

    // WM api deals in receiver units so we need to calculate how much the
    // receiver got from this packet.
    const deliveredAmount =
      Number(connection.totalDelivered) - this.lastDelivered
    this.lastDelivered = Number(connection.totalDelivered)
    this.dispatchMonetizationProgress(
      connection,
      deliveredAmount.toString(),
      receipt
    )
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
    connection: Connection,
    amount: string,
    receipt: string | undefined
  ) {
    const detail: MonetizationProgressEvent['detail'] = {
      amount,
      assetCode: connection.destinationAssetCode!,
      assetScale: connection.destinationAssetScale!,
      paymentPointer: this.paymentPointer!,
      requestId: this.requestId!,
      receipt
    }
    this.monetization.dispatchMonetizationProgressEvent(detail)
  }

  pause() {
    return this.stop(false)
  }

  // Returns token fraction.
  private currentStreamSendMax(): number {
    const elapsed = this.schedule['watch'].time()
    return (
      (elapsed < 60_000
        ? firstMinuteBandwidth(elapsed)
        : this.schedule.sendMax()) - this.totalSentWatermark
    )
  }
}

// Returns token fraction.
function firstMinuteBandwidth(elapsedMs: number): number {
  const s = elapsedMs / 1e3 // seconds
  if (30 < s) return 60 / 60
  if (10 < s) return 30 / 60
  if (5 < s) return 10 / 60
  return 5 / 60 // initially 5 seconds
}

function btpTokenThroughput(token: string): number {
  const payload = Buffer.from(token.split('.')[1], 'base64')
  const { throughput } = JSON.parse(payload.toString())
  if (throughput === undefined) throw new Error('throughput not found')
  return throughput
}
