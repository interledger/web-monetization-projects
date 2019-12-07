import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { DocumentMonetization } from '@web-monetization/wext/content'

import * as tokens from '../../types/tokens'
import { getAdaptedSite } from '../util/getAdaptedSite'
import { debug } from '../util/logging'
import { ContentRuntime } from '../types/ContentRunTime'

import { Frames } from './Frames'
import { DomService } from './DomService'

interface GetPageData {
  adaptedPage: {
    paymentPointer: string
    channelImage: string
  }
}

interface PollForYouTubeChannelIdParams {
  everyMs: number
  times: number
}

@injectable()
export class RunContentHandler {
  private constructor(
    private monetization: DocumentMonetization,
    private dom: DomService,
    @inject(tokens.ContentRuntime)
    private contentRuntime: ContentRuntime,
    private window: Window,
    private frames: Frames,
    private client: GraphQlClient
  ) {}

  async adaptedPageDetails(url: string, site: string) {
    debug('fetching payment pointer for this page', url, site)

    const variables = { url }

    if (site === 'youtube') {
      // Wait for page to load and the element containing the channelId is
      // available
      await this.dom.documentReady()
      const channelUrl = await this.pollForYouTubeChannelId()
      if (channelUrl) {
        Object.assign(variables, { channelUrl })
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const queryWithChannel = `query getPage($url: String!, $channelUrl: String) {
  adaptedPage(videoUrl: $url, channelUrl: $channelUrl) {
    paymentPointer
    channelImage
  }
}`
    const query = `query getPage($url: String!, $channelUrl: String) {
  adaptedPage(videoUrl: $url, channelUrl: $channelUrl) {
    paymentPointer
    channelImage
  }
}`
    const paymentPointerQuery = await this.client.query<GetPageData>({
      query,
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

  private async pollForYouTubeChannelId() {
    try {
      const selector = '.ytd-channel-name > a.yt-simple-endpoint'
      const channelElem = await this.dom.pollForElement<HTMLAnchorElement>({
        selector,
        everyMs: 100,
        times: 10
      })
      if (channelElem) {
        const channelUrl = channelElem.href
        debug('channelUrl', channelUrl)
        // TODO: channelUrl validation
        if (channelUrl) {
          return channelUrl
        } else {
          return
        }
      }
    } catch (err) {
      debug('Failed to grab channel URL from Youtube page. err=', err)
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
