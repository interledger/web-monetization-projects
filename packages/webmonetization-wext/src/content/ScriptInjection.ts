import { createHash } from 'crypto'

import { injectable } from '@dier-makr/annotations'

import { wmPolyfill } from './wmPolyfill'

@injectable()
export class ScriptInjection {
  constructor(private document: Document) {}

  /**
   * Content scripts run in a separate javascript context to the page.
   * Use this method as a last resort, only to inject code that MUST run
   * in the same context as the page. e.g. to inject document.monetization in
   * a manner that makes it available.
   *
   * Try and communicate via window messaging, and existing DOM channels, such
   * as EventTargets
   *
   * See this issue for further context:
   *  https://github.com/coilhq/web-monetization-projects/issues/1248
   *
   * @param code - to run in a page's normal JS context
   */
  inject(code: string) {
    const data = Buffer.from(code, 'utf-8')
    const digest = createHash('sha256').update(data).digest()
    const polyfillHash = `sha256-${digest.toString('base64')}`
    const script = this.document.createElement('script')
    script.src = chrome.runtime.getURL(`${polyfillHash}.js`)
    this.document.documentElement.appendChild(script)
    // clean it up afterwards
    this.document.documentElement.removeChild(script)
    // const document = this.document
    // const script = document.createElement('script')
    // script.innerHTML = code
    // document.documentElement.appendChild(script)
    //
    // // clean it up afterwards
    // document.documentElement.removeChild(script)
  }
}
