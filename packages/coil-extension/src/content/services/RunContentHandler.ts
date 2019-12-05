import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { DocumentMonetization } from '@web-monetization/wext/content'

import * as tokens from '../../types/tokens'
import { getAdaptedSite } from '../util/adaptedRegex'
import { debug } from '../util/logging'
import { ContentRuntime } from '../types/ContentRunTime'

import { Frames } from './Frames'

interface GetPageData {
  adaptedPage: {
    paymentPointer: string
    channelImage: string
  }
}

interface HyperlinkElement extends Element {
  href: string
}

const CHANNEL_ID_REGEX = /https?:\/\/(www\.)?youtube\.com\/channel\//i

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

  async adaptedPageDetails(url: string, site: string) {
    debug('fetching payment pointer for this page', url)

    // Wait for page to load to ensure there's a channel url to grab
    if (document.readyState !== 'complete' && site === 'youtube') {
      await new Promise(resolve => {
        window.addEventListener('load', () => {
          resolve()
        })
      })
    }

    const variables = { url }

    try {
      if (site === 'youtube') {
        const channelElem = document.querySelector(
          '#text > a'
        ) as HyperlinkElement
        const { href: channelUrl } = channelElem
        if (channelUrl) {
          Object.assign(variables, { channelUrl })
        }
      }
    } catch (err) {
      debug('Failed to grab channel URL from Youtube page. err=', err)
    }

    const paymentPointerQuery = await this.client.query<GetPageData>({
      query: `query getPage($url: String!, $channelUrl: String) {
    adaptedPage(videoUrl: $url, channelUrl: $channelUrl) {
      paymentPointer
      channelImage
    }
  }`,
      token: null,
      variables
    })

    debug({ paymentPointerQuery })

    const data = paymentPointerQuery.data
    const adaptedPage = data?.adaptedPage
    const paymentPointer = adaptedPage?.paymentPointer
    const channelImage = adaptedPage?.channelImage
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

    const adaptedSite = getAdaptedSite(currentUrl)
    if (this.frames.isTopFrame && adaptedSite) {
      const { channelImage, paymentPointer } = await this.adaptedPageDetails(
        currentUrl,
        adaptedSite
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
