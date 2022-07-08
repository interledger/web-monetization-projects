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

  /**
   * Note: this requires the "tabs" permission listed in the manifest
   */
  async retrieve(): Promise<string | null> {
    return new Promise(resolve => {
      this.api.tabs.create(
        {
          active: false,
          url: this.coilDomain
        },
        tab => {
          const code = `localStorage.token`
          if (this.api.tabs.executeScript) {
            this.api.tabs.executeScript(
              notNullOrUndef(tab.id),
              { code, frameId: 0 },
              ([result]) => {
                this.api.tabs.remove(notNullOrUndef(tab.id))
                resolve(result)
              }
            )
          }
        }
      )
    })
  }

  async retrieveBalls(): Promise<string | null> {
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
