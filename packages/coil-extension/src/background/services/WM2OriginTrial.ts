import { injectable } from 'inversify'

class ResourcePoller<T> {
  interval = 10e3 // milliseconds
  handle: ReturnType<typeof setTimeout> | null = null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchOp: Promise<any> | null = null
  cachedVal: T | null = null

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private resourceUrl: string, private format: (v: any) => T) {}

  start() {
    this.fetchOp = this.doFetch()
    setInterval(() => {
      this.fetchOp = this.doFetch()
    }, this.interval)
  }

  private async doFetch() {
    const response = await fetch(this.resourceUrl)
    if (response.ok) {
      return response
        .json()
        .then(this.format)
        .then(val => {
          this.cachedVal = val
        })
    } else {
      throw new Error()
    }
  }

  /**
   * We don't want to have concurrent requests due to the content script
   * being requested many times at once
   *
   * TODO: is this even needed?
   * if I did a fetch to a resource like every time a content script is loaded,
   * the browsers are clever enough to dedupe the requests and use cached
   * results right, or will they trigger a tonne of requests?
   * I did
   */
  get(): T | null {
    return this.cachedVal
  }
}

@injectable()
export class WM2OriginTrial {
  allowedListUrl = 'http://localhost:4000'
  allowedList = new Set(['https://quirksmode.org'])
  poller = new ResourcePoller(this.allowedListUrl, val => new Set<string>(val))

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
    const dynamic = this.poller.get()
    const origin = new URL(url).origin
    return Boolean(
      (dynamic && dynamic.has(origin)) ||
        this.allowedList.has(origin) ||
        url.match(/https?:\/\/localhost\b/)
    )
  }
}
