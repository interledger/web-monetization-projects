import { EventEmitter } from 'events'

import {
  MonetizationExtendedDocument,
  MonetizationProgressEvent,
  MonetizationStartEvent
} from '@web-monetization/types'

export function getDocument() {
  return (document as unknown) as MonetizationExtendedDocument
}

const doc = getDocument()

// TODO: is there a more elegant pattern for this?
export class GlobalWebMonetizationState extends EventEmitter {
  private state: string | null
  private paymentPointer: string | null
  private requestId: string | null
  private assetCode: string | null
  private assetScale: number | null
  private totalAmount: number
  private initialized: boolean

  constructor() {
    super()
    const doc = getDocument()
    this.state = doc.monetization && doc.monetization.state
    this.paymentPointer = null
    this.requestId = null
    this.assetCode = null
    this.assetScale = null
    this.totalAmount = 0
    this.initialized = false

    this.onMonetizationStart = this.onMonetizationStart.bind(this)
    this.onMonetizationProgress = this.onMonetizationProgress.bind(this)
  }

  getState() {
    return {
      state: this.state,
      paymentPointer: this.paymentPointer,
      requestId: this.requestId,
      assetCode: this.assetCode,
      assetScale: this.assetScale,
      totalAmount: this.totalAmount
    }
  }

  init() {
    if (!this.initialized && doc.monetization) {
      this.initialized = true
      doc.monetization.addEventListener('monetizationstart', (this
        .onMonetizationStart as unknown) as EventListener)
      doc.monetization.addEventListener('monetizationprogress', (this
        .onMonetizationProgress as unknown) as EventListener)
    }
  }

  terminate() {
    if (this.initialized && doc.monetization) {
      this.initialized = false
      doc.monetization.removeEventListener('monetizationstart', (this
        .onMonetizationStart as unknown) as EventListener)
      doc.monetization.removeEventListener('monetizationprogress', (this
        .onMonetizationProgress as unknown) as EventListener)
    }
  }

  onMonetizationStart(ev: MonetizationStartEvent) {
    const { paymentPointer, requestId } = ev.detail

    this.state = doc.monetization && doc.monetization.state
    this.paymentPointer = paymentPointer
    this.requestId = requestId
    this.emit('monetizationstart')
  }

  onMonetizationProgress(ev: MonetizationProgressEvent) {
    const { amount, assetCode, assetScale } = ev.detail

    this.totalAmount = this.totalAmount + Number(amount)
    this.assetCode = assetCode
    this.assetScale = assetScale
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
