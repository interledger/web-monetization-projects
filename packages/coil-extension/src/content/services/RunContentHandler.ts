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

interface PollForYouTubeChannelIdParams {
  everyMs: number
}

@injectable()
export class RunContentHandler {
  private constructor(
    private monetization: DocumentMonetization,
    @inject(tokens.ContentRuntime)
    private contentRuntime: ContentRuntime,
    @inject(tokens.Window)
    private window: Window,
    @inject(tokens.Document)
    private document: Document,
    private frames: Frames,
    private client: GraphQlClient
  ) {}

  async adaptedPageDetails(url: string, site: string) {
    debug('fetching payment pointer for this page', url, site)

    const variables = { url }

    if (site === 'youtube') {
      // Wait for page to load and the element containing the channelId is
      // available

      await this.windowLoaded()
      const channelUrl = await this.pollForYouTubeChannelId({ everyMs: 100 })
      if (channelUrl) {
        Object.assign(variables, { channelUrl })
      }
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

  private async pollForYouTubeChannelId({
    everyMs
  }: PollForYouTubeChannelIdParams) {
    try {
      let polls = 0
      while (++polls <= 10) {
        const channelElem = this.document.querySelector<HTMLAnchorElement>(
          '.ytd-channel-name > a.yt-simple-endpoint'
        )
        if (channelElem) {
          const channelUrl = channelElem.href
          debug('channelUrl', channelUrl)
          if (channelUrl.match(/^\/channel\/\w+/)) {
            return channelUrl
          } else {
            break
          }
        } else {
          await new Promise(resolve => setTimeout(resolve, everyMs))
        }
      }
    } catch (err) {
      debug('Failed to grab channel URL from Youtube page. err=', err)
    }
  }

  async windowLoaded() {
    if (this.document.readyState !== 'complete') {
      await new Promise(resolve => {
        this.window.addEventListener(
          'load',
          () => {
            resolve()
          },
          { once: true }
        )
      })
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
