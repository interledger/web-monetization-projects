import { MonetizationTagManager } from '@webmonetization/polyfill-utils'
import { injectable } from 'inversify'

import { SPSPRequestEvent } from '../../types/commands'

const COLOR_CSS = 'color: cyan; background-color: darkorange'

@injectable()
export class DebugService {
  // eslint-disable-next-line no-console
  log = console.log.bind(console)

  constructor(private storage: Storage) {}

  init(tm: MonetizationTagManager) {
    // TODO:WM2, log as errors ??
    tm.on('illegal-state-error', (error: Error) => {
      if (this.storage.WM_DEBUG) {
        this.log(
          '%c WM2 illegal tag state error:',
          COLOR_CSS,
          error.message.replace(/^Web-Monetization Error: /, '')
        )
      }
    })
    tm.on(
      'link-resolve-payment-endpoint-error',
      (link: HTMLLinkElement, error: Error) => {
        if (this.storage.WM_DEBUG) {
          this.log(
            '%c WM2 link paymentPointer malformed error:',
            COLOR_CSS,
            link,
            error.message
          )
        }
      }
    )
  }

  logSPSPEvent(request: SPSPRequestEvent) {
    if (this.storage.WM_DEBUG) {
      this.log(
        '%c WM2 simple payment setup protocol error:',
        COLOR_CSS,
        request.data.message
      )
    }
  }
}
