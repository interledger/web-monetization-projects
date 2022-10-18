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

  init() {
    // You must use onResponseStarted
    this.api.webRequest.onResponseStarted.addListener(
      details => {
        const responseHeaders = details.responseHeaders ?? []
        const links = responseHeaders.filter(h => h.name === 'link')
        this.onLinks(links, { tabId: details.tabId, frameId: details.frameId })
      },
      { urls: ['<all_urls>'] },
      ['responseHeaders']
    )
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
    void this.monetization.startWebMonetization(
      {
        paymentPointer,
        requestId,
        attrs: {},
        fromBody: false,
        initiatingUrl: paymentPointer,
        tagType: 'link'
      },
      frame
    )
  }
}
