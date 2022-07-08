import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { FrameSpec } from '../../types/FrameSpec'

@injectable()
export class ActiveTabLogger {
  sendLogs = Boolean(self.localStorage?.ACTIVE_TAB_LOGGING)

  constructor(
    @inject(tokens.WextApi)
    private api: typeof chrome
  ) {}

  async log(log: string, frame?: FrameSpec) {
    if (!this.sendLogs) {
      return
    }
    const activeTab = await this.getActiveTab()
    if (typeof activeTab === 'number') {
      const message = {
        command: 'logInActiveTab',
        data: {
          log: log
        }
      }
      this.api.tabs.sendMessage(frame?.tabId ?? activeTab, message, {
        frameId: frame?.frameId ?? 0
      })
    }
  }

  async getActiveTab() {
    return new Promise((resolve, reject) => {
      this.api.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tab = tabs[0]
        const id = tab?.id
        resolve(id)
      })
    })
  }
}
