import { inject, injectable } from 'inversify'
import {
  MonetizationProgressEvent,
  MonetizationStartEvent
} from '@web-monetization/types'

import * as tokens from '../tokens'

import { ScriptInjection } from './ScriptInjection'

@injectable()
export class DocumentMonetization {
  constructor(
    @inject(tokens.Window)
    private window: Window,
    @inject(tokens.Document)
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
      document.monetization.state = 'pending'
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

  postMonetizationStartWindowMessageAndSetMonetizationState(
    detail: MonetizationStartEvent['detail']
  ) {
    // Indicate that payment has started.
    // First nonzero packet has been fulfilled
    this.scripts.inject(`document.monetization.state = 'started'`)

    this.window.postMessage(
      {
        webMonetization: true,
        name: 'monetizationstart',
        detail
      },
      this.window.location.origin
    )
  }

  postMonetizationProgressWindowMessage(
    detail: MonetizationProgressEvent['detail']
  ) {
    this.window.postMessage(
      {
        webMonetization: true,
        name: 'monetizationprogress',
        detail
      },
      this.window.location.origin
    )
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
