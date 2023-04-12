import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { FrameSpec } from '../../types/FrameSpec'
import { StoreProxy } from '../../types/storage'

@injectable()
export class ActiveTabLogger {
  sendLogs = Boolean(this.store.ACTIVE_TAB_LOGGING)

  constructor(
    @inject(tokens.StoreProxy)
    private store: StoreProxy,
    @inject(tokens.WextApi)
    private api: typeof chrome
  ) {}

  log(log: string, frame?: FrameSpec) {
    if (!this.sendLogs) {
      return
    }
    void this.doLog(log, frame)
  }

  private async doLog(log: string, frame?: FrameSpec) {
    const activeTab = await this.getActiveTab()
    if (typeof activeTab === 'number') {
      const message = {
        command: 'logInActiveTab',
        data: {
          log
        }
      }
      this.api.tabs.sendMessage(frame?.tabId ?? activeTab, message, {
        frameId: frame?.frameId ?? 0
      })
    }
  }

  async getActiveTab() {
    return new Promise(resolve => {
      this.api.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0]
        const id = tab?.id
        resolve(id)
      })
    })
  }
}
