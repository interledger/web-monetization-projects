import { injectable } from '@dier-makr/annotations'

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
  injectCode(code: string) {
    this.inject(script => (script.innerHTML = code))
  }

  injectScript(src: string) {
    this.inject(script => (script.src = src))
  }

  inject(configure: (script: HTMLScriptElement) => void) {
    const document = this.document
    const script = document.createElement('script')
    configure(script)
    document.documentElement.appendChild(script)

    // clean it up afterwards
    document.documentElement.removeChild(script)
  }
}
