import { inject, injectable } from 'inversify'
import {
  MonetizationEvent,
  MonetizationProgressEvent,
  MonetizationStartEvent,
  MonetizationState
} from '@web-monetization/types'

import * as tokens from '../tokens'

import { ScriptInjection } from './ScriptInjection'

@injectable()
export class DocumentMonetization {
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
  }

  setState(state: MonetizationState) {
    const changed = this.state != state
    this.state = state
    if (changed) {
      this.scripts.inject(`document.monetization.state = '${state}'`)
      if (this.request && (state === 'stopped' || state === 'pending')) {
        this.postMonetizationMessage(
          state === 'pending' ? 'monetizationpending' : 'monetizationstop',
          this.request
        )
      }
    }
    return changed
  }

  postMonetizationStartWindowMessageAndSetMonetizationState(
    detail: MonetizationStartEvent['detail']
  ) {
    // Indicate that payment has started.
    const changed = this.setState('started')
    if (!changed) {
      throw new Error(`expecting state transition`)
    }
    // First nonzero packet has been fulfilled
    this.postMonetizationMessage('monetizationstart', detail)
  }

  postMonetizationMessage(
    name: MonetizationEvent['type'],
    detail: MonetizationEvent['detail']
  ) {
    this.window.postMessage(
      {
        webMonetization: true,
        name,
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
