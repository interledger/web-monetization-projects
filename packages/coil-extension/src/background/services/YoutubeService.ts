import { injectable } from 'inversify'

import { logger } from './utils'
import type { Logger } from './utils'

@injectable()
export class YoutubeService {
  constructor(
    @logger('YoutubeService')
    private log: Logger
  ) {}

  async fetchChannelId(videoUrl: string) {
    let resp: Response
    try {
      resp = await fetch(videoUrl, {
        mode: 'same-origin',
        cache: 'only-if-cached'
      })
    } catch (e) {
      resp = await fetch(videoUrl)
    }

    if (!resp.ok || !resp.body) {
      return null
    } else {
      const chunk = await resp.text()
      this.log('searching chunk of length', chunk.length)
      const searcher = /"channelId":"(.*?)"|data-channel-external-id="(.*?)"/g
      let searched: RegExpExecArray | null = null
      let found: string | null = null
      do {
        searched = searcher.exec(chunk)
        if (searched) {
          found = searched[1] || searched[2]
          this.log('found', found)
        } else {
          this.log('not found')
        }
      } while (searched)
      return found ?? null
    }
  }
}
