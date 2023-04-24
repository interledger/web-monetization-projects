import { inject, injectable } from 'inversify'

import type { ContentRuntime } from '../types/ContentRunTime'
import * as tokens from '../../types/tokens'
import type { BuildConfig } from '../../types/BuildConfig'

@injectable()
export class ContentAuthService {
  constructor(
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    private window: Window,
    private storage: Storage,
    @inject(tokens.ContentRuntime) private contentRuntime: ContentRuntime
  ) {}

  handleCoilTokenMessage() {
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
      }
    })
  }

  handleCoilWriteTokenWindowEvent() {
    this.window.addEventListener('coil_writeToken', event => {
      const token = this.storage.getItem('token')
      if (token) {
        // Note, this is invoked elsewhere too
        this.syncViaInjectToken()
      } else {
        this.sendLogoutMessage()
      }
    })
  }

  syncViaInjectToken() {
    // We don't want to automatically  login in mv3, only refresh the
    // page's token with a newer one from the extension.
    const existingToken = this.storage.getItem('token')
    if (this.buildConfig.isMV3 && !existingToken) {
      this.sendLogoutMessage()
    } else {
      this.contentRuntime.sendMessage(
        {
          command: 'injectToken',
          data: { token: existingToken }
        },
        result => {
          if (result) {
            this.storage.setItem('token', result)
          }
        }
      )
    }
  }

  private sendLogoutMessage() {
    this.contentRuntime.sendMessage({ command: 'logout' })
  }
}
