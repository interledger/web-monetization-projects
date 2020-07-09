import { inject, injectable } from 'inversify'

import { STORAGE_KEY } from '../../types/storage'
import { ContentRuntime } from '../types/ContentRunTime'
import * as tokens from '../../types/tokens'

@injectable()
export class ContentAuthService {
  constructor(
    private window: Window,
    private storage: Storage,
    @inject(tokens.ContentRuntime) private contentRuntime: ContentRuntime
  ) {}

  handleCoilTokenMessages() {
    this.window.addEventListener('message', event => {
      const extUrl = this.contentRuntime.getURL('')
      if (extUrl !== event.origin + '/') {
        return
      }

      const { command } = event.data
      if (command === 'coilToken') {
        ;(event.source as Window).postMessage(
          { token: this.storage.getItem('token') },
          event.origin
        )
      } else if (command === 'clearToken') {
        this.storage.removeItem('token')
        delete localStorage.token
        ;(event.source as Window).postMessage(
          {
            clearToken: true,
            log: `clearTokentop window =${
              this.window.top === this.window
            } location=${
              this.window.location.href
            } localStorage=${JSON.stringify(localStorage)}`
          },
          event.origin
        )
      }
    })
  }

  handleCoilWriteTokenWindowEvent() {
    this.window.addEventListener('coil_writeToken', event => {
      const token = this.storage.getItem('token')
      if (token) {
        this.syncViaInjectToken()
      } else {
        this.contentRuntime.sendMessage({ command: 'logout' })
      }
    })
  }

  syncViaInjectToken() {
    this.contentRuntime.sendMessage(
      {
        command: 'injectToken',
        data: { token: this.storage.getItem(STORAGE_KEY.token) }
      },
      result => {
        if (result) {
          this.storage.setItem(STORAGE_KEY.token, result)
        }
      }
    )
  }
}
