import { MonetizationTagManager } from '@webmonetization/polyfill-utils'
import { injectable } from 'inversify'

const COLOR_CSS = 'color: aqua; background-color: black'

@injectable()
export class DebugService {
  // eslint-disable-next-line no-console
  log = console.log.bind(console)

  constructor(private storage: Storage) {}

  init(tm: MonetizationTagManager) {
    console.log('DebugService init')
    tm.on(
      'link-resolve-payment-endpoint-error',
      (link: HTMLLinkElement, error: Error) => {
        console.log(
          '%c WM2 link paymentPointer malformed:',
          COLOR_CSS,
          link,
          error.message
        )
      }
    )
  }
}
