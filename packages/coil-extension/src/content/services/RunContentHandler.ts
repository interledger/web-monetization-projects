import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { DocumentMonetization } from '@web-monetization/wext/content'

import * as tokens from '../../types/tokens'
import { isAdaptedSite } from '../util/adaptedRegex'
import { debug } from '../util/logging'
import { ContentRuntime } from '../types/ContentRunTime'

import { Frames } from './Frames'

interface GetPageData {
  adaptedPage: {
    paymentPointer: string
    channelImage: string
  }
}

@injectable()
export class RunContentHandler {
  private constructor(
    private monetization: DocumentMonetization,
    @inject(tokens.ContentRuntime)
    private contentRuntime: ContentRuntime,
    @inject(tokens.Window)
    private window: Window,
    private frames: Frames,
    private client: GraphQlClient
  ) {}

  async adaptedPageDetails(url: string) {
    debug('fetching payment pointer for this page', url)

    const paymentPointerQuery = await this.client.query<GetPageData>({
      query: `query getPage($url: String!) {
    adaptedPage(videoUrl: $url) {
      paymentPointer
      channelImage
    }
  }`,
      token: null,
      variables: { url }
    })

    debug({ paymentPointerQuery })

    const data = paymentPointerQuery.data
    const adaptedPage = data && data.adaptedPage
    const paymentPointer = adaptedPage && adaptedPage.paymentPointer
    const channelImage = adaptedPage && adaptedPage.channelImage
    return {
      channelImage,
      paymentPointer
    }
  }

  async runContent() {
    const currentUrl = this.window.location.href
    debug(
      'Rerunning content script',
      currentUrl,
      'iframe=',
      this.frames.isIFrame
    )

    if (this.frames.isTopFrame && isAdaptedSite(currentUrl)) {
      const { channelImage, paymentPointer } = await this.adaptedPageDetails(
        currentUrl
      )

      if (!paymentPointer) {
        debug('page is not monetized. url=', currentUrl)
        this.monetization.setMetaTagContent(undefined)
      } else {
        this.contentRuntime.sendMessage({
          command: 'adaptedSite',
          data: {
            state: true,
            channelImage
          }
        })
        this.monetization.setMetaTagContent(paymentPointer)
      }
    }
  }
}
