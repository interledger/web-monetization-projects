import { inject, injectable } from 'inversify'

import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'
import { Config } from '../../services/Config'

/**
 * See {@link handleCoilTokenMessage}
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
  constructor(private config: Config) {
    setInterval(() => {
      console.log({ coilDomain: config.coilDomain })
    }, 5e3)
  }

  async retrieve(path = '/handler.html'): Promise<string | null> {
    const coilDomain = this.config.coilDomain
    const coilFrame = document.createElement('iframe')
    coilFrame.src = coilDomain + path
    document.body.appendChild(coilFrame)
    await new Promise(resolve => coilFrame.addEventListener('load', resolve))

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
