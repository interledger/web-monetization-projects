import { timeout } from '../util/timeout'

interface PollForYouTubeChannelIdParams {
  selector: string
  everyMs: number
  times: number
}

export class DomService {
  constructor(private document: Document, private window: Window) {}

  async pollForElement<T extends HTMLElement = HTMLElement>({
    selector,
    everyMs,
    times
  }: PollForYouTubeChannelIdParams): Promise<T | null> {
    let polls = 0
    while (++polls <= times) {
      const el = this.document.querySelector<T>(selector)
      if (el) {
        return el
      } else {
        await timeout(everyMs)
      }
    }
    return null
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
}
