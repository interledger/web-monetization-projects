import {
  MonetizationEvent,
  MonetizationProgressEvent,
  MonetizationStartEvent,
  MonetizationState,
  MonetizationStopEvent
} from '@web-monetization/types'
import { injectable } from '@dier-makr/annotations'

import { ScriptInjection } from './ScriptInjection'

interface SetStateParams {
  state: MonetizationState
  finalized?: boolean
}

@injectable()
export class DocumentMonetization {
  private finalized = true
  private state: MonetizationState = 'stopped'
  private request?: MonetizationStartEvent['detail']

  constructor(
    private window: Window,
    private doc: Document,
    private scripts: ScriptInjection
  ) {}

  /**
   * Adapter from posted messages on window to `CustomEvent`s
   * TODO: less janky cross-platform way to create a generic EventTarget
   *  You can create an EventTarget using new on Chrome/Firefox but not Safari
   *  Will route any messages with webMonetization: true to
   *  document.monetization dispatchEvent
   *
   */
  injectDocumentMonetization() {
    this.scripts.inject(
      // language=JavaScript
      `
      document.monetization = document.createElement('div')
      document.monetization.state = 'stopped'
      window.addEventListener('message', function (event) {
        if (event.source === window && event.data.webMonetization) {
          document.monetization.dispatchEvent(
            new CustomEvent(event.data.name, {
              detail: event.data.detail
            }))
        }
      })
    `
    )
  }

  setMonetizationRequest(request?: MonetizationStartEvent['detail']) {
    this.request = request
    this.finalized = true
  }

  /**
   * Set the document state first, then emit associated event.
   * Only emit if state has changed.
   * This needs to handle multiple requests to change to the same state
   * (where state can be a composite, eg. {state: 'stopped', finalized: false})
   */
  setState({ state, finalized }: SetStateParams) {
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
        this.scripts.inject(`document.monetization.state = '${state}'`)
      }
      if (this.request && (state === 'stopped' || state === 'pending')) {
        this.postMonetizationMessage(
          state === 'pending' ? 'monetizationpending' : 'monetizationstop',
          this.request,
          finalized
        )
      }
    }
    return changed
  }

  postMonetizationStartWindowMessageAndSetMonetizationState(
    detail: MonetizationStartEvent['detail']
  ) {
    // Indicate that payment has started.
    const changed = this.setState({ state: 'started' })
    if (!changed) {
      throw new Error(`expecting state transition`)
    }
    // First nonzero packet has been fulfilled
    this.postMonetizationMessage('monetizationstart', detail)
  }

  postMonetizationMessage(
    type: MonetizationEvent['type'],
    detailSource: MonetizationEvent['detail'],
    finalized?: boolean
  ) {
    // Don't mutate the request
    const detail = { ...detailSource }
    if (type === 'monetizationstop') {
      const stop = detail as MonetizationStopEvent['detail']
      stop.finalized = Boolean(finalized)
    }
    this.window.postMessage(
      {
        webMonetization: true,
        name: type,
        detail
      },
      this.window.location.origin
    )
  }

  postMonetizationProgressWindowMessage(
    detail: MonetizationProgressEvent['detail']
  ) {
    // Protect against extremely unlikely race condition
    // A progress message coming before a content -> background script
    // stopWebMonetization message handler has had a chance to run.
    if (this.request?.requestId === detail.requestId) {
      this.postMonetizationMessage('monetizationprogress', detail)
    }
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
}
