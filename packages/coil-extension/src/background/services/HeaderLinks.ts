import { inject, injectable } from 'inversify'
import parseLink from 'parse-link-header'
import * as uuid from 'uuid'
import { MonetizationRequest } from '@webmonetization/polyfill-utils'

import * as tokens from '../../types/tokens'
import { FrameSpec } from '../../types/FrameSpec'

import { MonetizationService } from './MonetizationService'
import { logger, Logger } from './utils'
import { BackgroundFramesService } from './BackgroundFramesService'

@injectable()
export class HeaderLinks {
  requests: [MonetizationRequest, FrameSpec][] = []

  constructor(
    @inject(tokens.WextApi)
    private api: typeof chrome,
    private frameService: BackgroundFramesService,
    private monetization: MonetizationService,
    @logger('HeaderLinks')
    private log: Logger
  ) {}

  async init() {
    // You must use onResponseStarted rather than onHeadersReceived if
    // you need a guarantee the headers haven't been modified by another
    // extension.
    // TODO: when does this happen in relation to tab removed?
    // When you refresh a tab, does the new request start before removing the
    // old tab? In such a way that onResponseStarted fires before tab removed
    // or frame removed for the old tab.
    // Answer: webRequest.onResponseStarted, THEN tabs.onRemoved when using
    // cmd + r to refresh. About 2ms between it.
    const haveWebRequest = await this.havePermission('webRequest')

    if (haveWebRequest) {
      this.api.webRequest.onResponseStarted.addListener(
        details => {
          const frame = {
            tabId: details.tabId,
            frameId: details.frameId
          }
          if (frame.tabId < 0) {
            return
          }
          const responseHeaders = details.responseHeaders ?? []
          const links = responseHeaders.filter(h => h.name === 'link')
          this.onLinks(links, frame)
          this.log('DEBUG received headers for', frame, Date.now())
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

  onLinks(headers: chrome.webRequest.HttpHeader[], frame: FrameSpec) {
    for (const header of headers) {
      const obj = parseLink(header.value)
      const link = obj ? obj['monetization'] : null
      if (link?.rel === 'monetization') {
        const paymentPointer = link.url
        void this.onPaymentPointer(paymentPointer, frame)
      }
    }
  }

  private async onPaymentPointer(paymentPointer: string, frame: FrameSpec) {
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

    this.requests.push([request, frame])

    /**
     * There seems to be a problem with the monetization stopping immediately
     * What causes this?
     *
     * @see BackgroundScript#contentScriptInit
     * @see MonetizationService#startWebMonetization
     *
     *    This calls this.tabStates.clearFrame(spec)
     *    which clears the state set by the initial "ticks" of
     *    the async startWebMonetization routine
     *    One off the latter ticks checks the state
     */

    // const already = this.frameService.getFrame(frame)
    // if (already) {
    //   // Wait for the frame to be removed, so it isn't just stumped
    //   // on immediately.
    //   await new Promise(resolve => {
    //     this.frameService.on('frameRemoved', (event) => {
    //       if (sameFrame(event, frame)) {
    //         resolve(null)
    //       }
    //     })
    //   })
    //   void this.monetization.startWebMonetization(request, frame)
    // } else {
    //   throw new Error('unexpected state')
    // }

    // Need to send the request to the MonetizationRequestManager somehow.
    // When built for MV3, the state in the SW is transient, so it's helpful to
    // store tab related state in the content script.

    // When the content script registers, it should be given the request
    // At this point, the content script /may/ not even be running, so simply
    // sending the request via api.tabs.sendMessage may not work, though it
    // could be done with retries and a backoff delay.
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
}
