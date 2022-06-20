import { injectable } from 'inversify'

/*
 * Tests
 *   [x] must work after initial [re]load of background page
 * Thoughts
 *   What happens when you load 30 tabs in a row?
 *     Ideally only one fetch would occur, but there may be a handful
 * */
class ResourcePoller<T> {
  // This is far too frequent
  // The bigger it stretches, the closer to "well just refresh the page until
  // it works" means that it's pointless. If the fetch is done whenever a
  // content script is loaded it will be faster to just rely upon that.
  // interval = 10e3 // milliseconds
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchOp: Promise<any> | null = null
  cachedVal: T | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private resourceUrl: string, private format: (v: any) => T) {}

  start() {
    // This is worthwhile doing to "prime the cache" so to speak, upon startup
    this.fetchIfIdle()
    // setInterval(() => {
    //   this.fetchIfIdle()
    // }, this.interval)
  }

  private async doFetch() {
    try {
      const response = await fetch(this.resourceUrl)
      if (response.ok) {
        const json = await response.json()
        this.cachedVal = this.format(json)
      } else {
        throw new Error(
          `bad response ${response.status} ${response.statusText}`
        )
      }
    } finally {
      this.fetchOp = null
    }
  }

  fetchIfIdle() {
    if (!this.fetchOp) {
      this.fetchOp = this.doFetch()
    }
  }

  /**
   * We don't want to have concurrent requests due to the content script
   * being requested many times at once
   *
   * Is this even needed?
   *
   * If I did a fetch to a resource like every time a content script is loaded,
   * the browsers are clever enough to dedupe the requests and use cached
   * results right, or will they trigger a tonne of requests?
   *
   * I did check and the browser doesn't seem to cache, at least as is required
   * here.
   */
  triggerAndGetCachedOrNull(): T | null {
    this.fetchIfIdle()
    return this.cachedVal
  }
}

@injectable()
export class WM2OriginTrial {
  hardCodedAllowList = new Set(['https://quirksmode.org'])
  poller = new ResourcePoller(
    'http://localhost:8080/wm2-allowed-list.json',
    val => new Set<string>(val)
  )

  constructor(private storage: Storage) {}

  // We don't want this to be too slow as it could delay the progress (e.g. init
  // monetization tag observer, injecting polyfill) of the content script
  // which is awaiting a response.
  // Therefor we must always respond immediately, using an already in-memory
  // store of allowed urls.
  // What is a tolerable wait time for a result?
  // If the origin list is configured once at startup, then requested every
  // 10 minutes, with refreshes everytime a content script is init, then it
  // should be pretty fresh.
  async checkOrigin(url: string) {
    const dynamic = this.poller.triggerAndGetCachedOrNull()
    const origin = new URL(url).origin
    return Boolean(
      dynamic?.has(origin) ||
        this.hardCodedAllowList.has(origin) ||
        url.match(/https?:\/\/localhost\b/)
    )
  }
}
