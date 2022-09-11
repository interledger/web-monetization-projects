import { inject, injectable } from 'inversify'

import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'
import { timeoutRejecting } from '../../util/timeout'

/**
 * See {@link ContentAuthService#handleCoilTokenMessage}
 *
 * Refused to display 'https://coil.com/healthz' in a frame because an
 * ancestor violates the following Content Security Policy directive:
 * "frame-ancestors 'self' *.featurepeek.com".
 *
 * TODO open up CSP for /healthz or some other minimal url as
 *   handler.html pulls in a lot of heft.
 */
@injectable()
export class SiteToken {
  constructor(
    @inject(tokens.CoilDomain)
    private coilDomain: string,
    @inject(tokens.WextApi)
    private api: typeof chrome
  ) {}

  async retrieve(): Promise<string | null> {
    if (self.document) {
      return this.retrieveViaIframeInjection()
    } else {
      return this.retrieveViaOpenTabAndExecuteScript()
    }
  }

  /**
   * Note: this requires the "tabs" permission listed in the manifest
   *       for MV3, it requires the "scripting" permission
   */
  async retrieveViaOpenTabAndExecuteScript(): Promise<string | null> {
    const tabId = await new Promise<number | null>(resolve => {
      this.api.tabs.query({}, tabs => {
        const tab = tabs.find(t => t.url?.startsWith(this.coilDomain))?.id
        resolve(tab ?? null)
      })
    })

    return new Promise(resolve => {
      if (tabId != null) {
        this.retrieveToken(tabId, resolve)
      } else {
        this.api.tabs.create(
          {
            active: false,
            url: this.coilDomain
          },
          tab => {
            const tabId = notNullOrUndef(tab.id)
            this.retrieveToken(tabId, resolve)
          }
        )
      }
    })
  }

  private retrieveToken(
    tabId: number,
    callback: (value: Promise<string>) => void
  ) {
    // Not available in MV3
    if (this.api.tabs.executeScript) {
      this.api.tabs.executeScript(
        tabId,
        { code: `localStorage.token`, frameId: 0 },
        ([result]) => {
          this.api.tabs.remove(tabId)
          callback(result)
        }
      )
    } else if (this.api.scripting) {
      this.api.scripting
        .executeScript({
          target: { tabId: tabId, allFrames: false },
          func: () => {
            return localStorage.token
          }
        })
        .then(([result]) => {
          callback(result.result)
        })
    }
  }

  async retrieveViaIframeInjection(): Promise<string | null> {
    const path = '/handler.html'
    const coilDomain = this.coilDomain
    const coilFrame = document.createElement('iframe')
    coilFrame.src = coilDomain + path
    document.body.appendChild(coilFrame)

    await Promise.race([
      timeoutRejecting(10e3),
      new Promise(resolve => coilFrame.addEventListener('load', resolve))
    ])

    // noinspection ES6MissingAwait
    const coilPromise = new Promise<string | null>((resolve, reject) => {
      window.addEventListener(
        'message',
        event => {
          if (event.origin !== coilDomain) {
            reject(
              new Error(
                `got message from unexpected origin. expected=${coilDomain}got=${event.origin}`
              )
            )
            return
          }
          resolve(event.data.token)
        },
        { once: true }
      )
    })

    // noinspection ES6MissingAwait
    const timeout = new Promise<never>((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('coil token retrieval timed out.'))
      }, 3000)
    })

    notNullOrUndef(coilFrame.contentWindow).postMessage(
      { command: 'coilToken' },
      coilDomain
    )
    let coilToken: string | null = null
    try {
      coilToken = await Promise.race([coilPromise, timeout])
    } catch (e) {
      //
    }
    document.body.removeChild(coilFrame)
    // normalize empty string (coil-web sometimes sets) to a null
    return coilToken || null
  }
}
