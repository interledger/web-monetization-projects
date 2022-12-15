import { inject, injectable } from 'inversify'

import { ContentRuntime } from '../types/ContentRunTime'
import * as tokens from '../../types/tokens'

@injectable()
export class ContentAuthService {
  constructor(
    private window: Window,
    private storage: Storage,
    @inject(tokens.ContentRuntime)
    private contentRuntime: ContentRuntime
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
        this.refreshUser()
      } else {
        this.sendLogoutMessage()
      }
    })
  }

  refreshUser() {
    this.contentRuntime.sendMessage({ command: 'refreshUser' })
  }

  private sendLogoutMessage() {
    this.contentRuntime.sendMessage({ command: 'logout' })
  }
}
