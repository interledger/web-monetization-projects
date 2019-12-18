import { injectable } from '@dier-makr/annotations'

import { logger, Logger } from './utils'

@injectable()
export class YoutubeService {
  searcher = /"channelId":"(.*?)"|data-channel-external-id="(.*?)"/

  constructor(
    @logger('YoutubeService')
    private log: Logger
  ) {}

  async fetchChannelId(videoUrl: string) {
    const resp = await fetch(videoUrl)
    if (!resp.ok || !resp.body) {
      return null
    } else {
      const chunk = await resp.text()
      this.log('searching chunk of length', chunk.length)
      const searched = this.searcher.exec(chunk)
      if (searched) {
        return searched[1] || searched[2]
      }
      return null
    }
  }
}
