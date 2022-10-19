import {
  MonetizationEvent,
  MonetizationProgressEvent,
  MonetizationStartEvent,
  MonetizationState,
  MonetizationStopEvent,
  TipEvent
} from '@webmonetization/types'
import { inject, injectable } from '@dier-makr/annotations'
import { MonetizationRequest } from '@webmonetization/polyfill-utils'

import * as tokens from '../tokens'

import { ScriptInjection } from './ScriptInjection'
import { includePolyFillMessage } from './wmPolyfill'
import { mozClone } from './mozClone'

interface SetStateParams {
  state: MonetizationState
  requestId?: string
  finalized?: boolean
}

// Name of event dispatched on document
const MONETIZATION_DOCUMENT_EVENT_NAME = 'monetization-v1'

@injectable()
export class DocumentMonetization {
  private finalized = true
  private state: MonetizationState = 'stopped'
  private request?: MonetizationRequest

  constructor(
    private doc: Document,
    private scripts: ScriptInjection,
    @inject(tokens.PolyfillCode)
    private polyfillCode: string
  ) {}

  injectMonetizationPolyfill() {
    try {
      this.scripts.injectCode(this.polyfillCode)
    } catch (e) {
      console.error(e)
      console.warn(includePolyFillMessage)
    }
  }

  setMonetizationRequest(request?: MonetizationRequest) {
    this.request = request
    this.finalized = true
  }

  getMonetizationRequest() {
    return this.request
  }

  /**
   * Set the document state first, then emit associated event.
   * Only emit if state has changed.
   * This needs to handle multiple requests to change to the same state
   * (where state can be a composite, eg. {state: 'stopped', finalized: false})
   */
  setState({ requestId, state, finalized }: SetStateParams) {
    if (requestId && this.request?.requestId !== requestId) {
      return
    }

    // Nonsensical transition from non started to stopped
    if (
      state === 'stopped' &&
      !finalized &&
      this.state === 'stopped' &&
      this.finalized
    ) {
      return
    }

    finalized = Boolean(finalized)
    // We may need to emit a stop event more than once in the case of the user
    // pausing (monetizationstop event with finalized: false) then the tag
    // being removed (monetizationstop event with finalized: true)
    const changedFinalized = this.finalized !== finalized
    const changedState = this.state != state
    const changed = changedState || changedFinalized
    this.finalized = finalized
    this.state = state

    if (changed) {
      if (changedState) {
        this.emitEvent('monetizationstatechange', {
          state
        })
      }
      if (this.request && (state === 'stopped' || state === 'pending')) {
        this.dispatchMonetizationEvent(
          state === 'pending' ? 'monetizationpending' : 'monetizationstop',
          {
            paymentPointer: this.request.paymentPointer,
            requestId: this.request.requestId
          },
          finalized
        )
      }
    }
    return changed
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private emitEvent(type: string, detail: any) {
    const obj = {
      type,
      detail
    }
    this.doc.dispatchEvent(
      new CustomEvent(MONETIZATION_DOCUMENT_EVENT_NAME, {
        detail: mozClone(obj, this.doc)
      })
    )
  }

  dispatchMonetizationStartEventAndSetMonetizationState(
    detail: MonetizationStartEvent['detail']
  ) {
    // Indicate that payment has started.
    const changed = this.setState({
      state: 'started',
      requestId: detail.requestId
    })
    if (!changed) {
      throw new Error(`expecting state transition`)
    }
    // First nonzero packet has been fulfilled
    this.dispatchMonetizationEvent('monetizationstart', detail)
  }

  dispatchMonetizationEvent(
    type: MonetizationEvent['type'],
    detailSource: MonetizationEvent['detail'],
    finalized?: boolean
  ) {
    // Don't mutate the request (and omit initiating url)
    const detail = { ...detailSource }

    if (type === 'monetizationstop') {
      const stop = detail as MonetizationStopEvent['detail']
      stop.finalized = Boolean(finalized)
    }
    this.emitEvent(type, detail)
  }

  dispatchMonetizationProgressEvent(
    detail: MonetizationProgressEvent['detail']
  ) {
    // Protect against extremely unlikely race condition
    // A progress message coming before a content -> background script
    // stopWebMonetization message handler has had a chance to run.
    if (this.request?.requestId === detail.requestId) {
      this.dispatchMonetizationEvent('monetizationprogress', detail)
    }
  }

  doDispatchTipEvent(type: TipEvent['type'], detailSource: TipEvent['detail']) {
    const detail = { ...detailSource }
    this.emitEvent(type, detail)
  }

  dispatchTipEvent(detail: TipEvent['detail']) {
    this.doDispatchTipEvent('tip', detail)
  }

  setMetaTagContent(paymentPointer?: string) {
    const document = this.doc
    let meta: HTMLMetaElement | null = document.head.querySelector(
      'meta[name="monetization"]'
    )
    if (!meta && paymentPointer) {
      meta = document.createElement('meta')
      meta.name = 'monetization'
      meta.content = paymentPointer
      document.head.appendChild(meta)
    } else if (meta && !paymentPointer) {
      document.head.removeChild(meta)
    } else if (meta && paymentPointer) {
      meta.content = paymentPointer
    }
  }

  hasRequest() {
    return !!this.request
  }

  getState() {
    return this.state
  }
}
