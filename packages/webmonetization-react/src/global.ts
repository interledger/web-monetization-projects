import { EventEmitter } from 'events'

import {
  MonetizationEventType,
  MonetizationExtendedDocument,
  MonetizationPendingEvent,
  MonetizationProgressEvent,
  MonetizationStartEvent,
  MonetizationState,
  MonetizationStopEvent
} from '@webmonetization/types'

export function getDocument() {
  return document as unknown as MonetizationExtendedDocument
}

const doc = getDocument()

// TODO: is there a more elegant pattern for this?
export class GlobalWebMonetizationState extends EventEmitter {
  private state: MonetizationState | null
  private paymentPointer: string | null
  private requestId: string | null
  private assetCode: string | null
  private assetScale: number | null
  private totalAmount: number
  private receipt: string | null
  private initialized: boolean

  constructor() {
    super()
    this.state = this.setStateFromDocumentMonetization()
    this.paymentPointer = null
    this.requestId = null
    this.assetCode = null
    this.assetScale = null
    this.totalAmount = 0
    this.receipt = null
    this.initialized = false

    this.onMonetizationStart = this.onMonetizationStart.bind(this)
    this.onMonetizationProgress = this.onMonetizationProgress.bind(this)
    this.onMonetizationPending = this.onMonetizationPending.bind(this)
    this.onMonetizationStop = this.onMonetizationStop.bind(this)
  }

  resetState() {
    this.paymentPointer = null
    this.requestId = null
    this.assetCode = null
    this.assetScale = null
    this.totalAmount = 0
    this.receipt = null
  }

  getState() {
    return {
      state: this.state,
      paymentPointer: this.paymentPointer,
      requestId: this.requestId,
      assetCode: this.assetCode,
      assetScale: this.assetScale,
      totalAmount: this.totalAmount,
      receipt: this.receipt,
      // synthetic state
      hasPaid: this.totalAmount !== 0 || this.state === 'started'
    }
  }

  init() {
    if (!this.initialized && doc.monetization) {
      this.initialized = true
      const addListener = (event: MonetizationEventType, listener: Function) =>
        doc.monetization.addEventListener(event, listener as EventListener)
      addListener('monetizationstart', this.onMonetizationStart)
      addListener('monetizationstop', this.onMonetizationStop)
      addListener('monetizationpending', this.onMonetizationPending)
      addListener('monetizationprogress', this.onMonetizationProgress)
    }
  }

  terminate() {
    if (this.initialized && doc.monetization) {
      this.initialized = false
      const removeListener = (
        event: MonetizationEventType,
        listener: Function
      ) =>
        doc.monetization.removeEventListener(event, listener as EventListener)
      removeListener('monetizationstart', this.onMonetizationStart)
      removeListener('monetizationstop', this.onMonetizationStop)
      removeListener('monetizationpending', this.onMonetizationPending)
      removeListener('monetizationprogress', this.onMonetizationProgress)
    }
  }

  onMonetizationStop(ev: MonetizationStopEvent) {
    if (ev.detail.finalized) {
      this.resetState()
    } else if (typeof ev.detail.finalized === 'undefined') {
      // Old implementation of web-monetization that didn't have finalized
      // event
      const metaTag: HTMLMetaElement | null = document.head.querySelector(
        'meta[name="monetization"]'
      )
      if (!metaTag || metaTag.content !== this.paymentPointer) {
        this.resetState()
      }
    }
    this.setStateFromDocumentMonetization()
    this.emit('monetizationstop')
  }

  setStateFromDocumentMonetization() {
    return (this.state =
      typeof document !== 'undefined'
        ? getDocument().monetization?.state
        : null)
  }

  onMonetizationPending(ev: MonetizationPendingEvent) {
    const { paymentPointer, requestId } = ev.detail

    if (this.requestId !== requestId) {
      this.resetState()
    }

    this.setStateFromDocumentMonetization()
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationStart(ev: MonetizationStartEvent) {
    const { paymentPointer, requestId } = ev.detail

    this.setStateFromDocumentMonetization()
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationProgress(ev: MonetizationProgressEvent) {
    const { amount, assetCode, assetScale, receipt } = ev.detail

    this.totalAmount = this.totalAmount + Number(amount)
    this.assetCode = assetCode
    this.assetScale = assetScale
    this.receipt = receipt || null
    this.emit('monetizationprogress')
  }
}

let globalWebMonetizationState: GlobalWebMonetizationState
export function getGlobalWebMonetizationState() {
  if (!globalWebMonetizationState) {
    globalWebMonetizationState = new GlobalWebMonetizationState()
  }
  return globalWebMonetizationState
}

export function initGlobalWebMonetizationState() {
  getGlobalWebMonetizationState().init()
}
