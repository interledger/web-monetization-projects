import { inject, injectable } from 'inversify'

import { notNullOrUndef } from '../../util/nullables'
import * as tokens from '../../types/tokens'

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
  constructor(
    @inject(tokens.CoilDomain)
    private coilDomain: string,
    private window: Window
  ) {}

  async clear() {
    return this.sendAndReceiveMessage({ command: 'clearToken' })
  }

  async sendAndReceiveMessage<T>(
    message: unknown,
    timeoutMs = 3e3
  ): Promise<T | null> {
    const coilFrame = await this.appendCoilIframe()
    const coilDomain = this.coilDomain
    notNullOrUndef(coilFrame.contentWindow).postMessage(message, coilDomain)
    const responsePromise = new Promise<T>((resolve, reject) => {
      this.window.addEventListener(
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
          resolve(event.data)
        },
        { once: true }
      )
    })
    // noinspection ES6MissingAwait
    const timeout = new Promise<never>((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('no response, timed out.'))
      }, timeoutMs)
    })

    let response: T | null = null
    try {
      response = await Promise.race([responsePromise, timeout])
    } catch (e) {
      console.error('send and receive message error', e)
      //
    }
    document.body.removeChild(coilFrame)
    return response
  }

  private async appendCoilIframe(path = '/handler.html') {
    const coilDomain = this.coilDomain
    const coilFrame = document.createElement('iframe')
    coilFrame.src = coilDomain + path
    document.body.appendChild(coilFrame)
    await new Promise(resolve => coilFrame.addEventListener('load', resolve))
    return coilFrame
  }

  async retrieve(): Promise<string | null> {
    const response = await this.sendAndReceiveMessage<{ token: string }>({
      command: 'coilToken'
    })
    return response?.token ?? null
  }
}
