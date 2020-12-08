import { inject, injectable } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

@injectable()
export class GPCService {
  constructor(
    @inject(tokens.WextApi)
    private api = chrome
  ) {}

  enable() {
    const filter = { urls: ['<all_urls>'] }
    const optExtraInfoSpec = ['requestHeaders', 'blocking']
    this.api.webRequest.onBeforeSendHeaders.addListener(
      details => {
        const requestHeaders = details.requestHeaders
        if (requestHeaders) {
          requestHeaders.push({ name: 'Sec-GPC', value: '1' })
          return { requestHeaders }
        }
      },
      filter,
      optExtraInfoSpec
    )

    // declarativeWebRequest code Doesn't work (condition is bunk)
    // and wouldn't anyway on FF/Safari
    // see: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions
    /*// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const declarativeWebRequest: any = chrome.declarativeWebRequest
    this.api.declarativeWebRequest.onRequest.addRules([
      {
        conditions: [
          {}
        ],
        actions: [
          new declarativeWebRequest.SetRequestHeader({
            name: 'Sec-GPC',
            value: '1'
          })
        ]
      }
    ])*/
  }
}
