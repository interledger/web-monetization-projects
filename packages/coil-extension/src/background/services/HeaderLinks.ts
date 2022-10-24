import { inject, injectable } from 'inversify'
import parseLink from 'parse-link-header'
import * as uuid from 'uuid'

import * as tokens from '../../types/tokens'
import { FrameSpec } from '../../types/FrameSpec'

import { MonetizationService } from './MonetizationService'

@injectable()
export class HeaderLinks {
  constructor(
    @inject(tokens.WextApi)
    private api: typeof chrome,
    private monetization: MonetizationService
  ) {}

  async init() {
    // You must use onResponseStarted rather than onHeadersReceived if
    // you need a guarantee the headers haven't been modified by another
    // extension.
    // TODO: when does this happen in relation to tab removed?
    // When you refresh a tab, does the new request start before removing the
    // old tab? In such a way that onResponseStarted fires before tab removed
    // or frame removed for the old tab.
    const haveWebRequest = await this.havePermission('webRequest')

    if (haveWebRequest) {
      this.api.webRequest.onResponseStarted.addListener(
        details => {
          const responseHeaders = details.responseHeaders ?? []
          const links = responseHeaders.filter(h => h.name === 'link')
          this.onLinks(links, {
            tabId: details.tabId,
            frameId: details.frameId
          })
        },
        { urls: ['<all_urls>'] },
        ['responseHeaders']
      )
    }
  }

  private async havePermission(permission: string) {
    return new Promise(resolve => {
      this.api.permissions.contains({ permissions: [permission] }, contains => {
        resolve(contains)
      })
    })
  }

  private async sendMessage(msg: unknown, frame: FrameSpec) {
    return new Promise((resolve, reject) => {
      this.api.tabs.sendMessage(
        frame.tabId,
        msg,
        { frameId: frame.frameId },
        response => {
          if (this.api.runtime.lastError) {
            reject(this.api.runtime.lastError)
          } else {
            resolve(response)
          }
        }
      )
    })
  }

  onLinks(headers: chrome.webRequest.HttpHeader[], frame: FrameSpec) {
    for (const header of headers) {
      const obj = parseLink(header.value)
      const link = obj ? obj['monetization'] : null
      if (link?.rel === 'monetization') {
        const paymentPointer = link.url
        this.onPaymentPointer(paymentPointer, frame)
      }
    }
  }

  private onPaymentPointer(paymentPointer: string, frame: FrameSpec) {
    const requestId = uuid.v4()
    // Start the monetization ASAP
    const request = {
      paymentPointer,
      requestId,
      attrs: {},
      fromBody: false,
      fromHTTPHeader: true,
      initiatingUrl: paymentPointer,
      tagType: 'link' as const
    }
    void this.monetization.startWebMonetization(request, frame)
    // Need to send the request to the MonetizationRequestManager somehow.
    // When built for MV3, the state in the SW is transient, so it's helpful to
    // store tab related state in the content script.

    // When the content script registers, it should be given the request
    // At this point, the content script /may/ not even be running, so simply
    // sending the request via api.tabs.sendMessage may not work, though it
    // could be done with retries and a backoff delay.
  }
}
