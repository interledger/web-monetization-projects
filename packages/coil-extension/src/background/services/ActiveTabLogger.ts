import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'

@injectable()
export class ActiveTabLogger {
  sendLogs = Boolean(localStorage.ACTIVE_TAB_LOGGING)

  constructor(
    @inject(tokens.WextApi)
    private api = chrome
  ) {}

  log(log: string) {
    if (!this.sendLogs) {
      return
    }
    this.api.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0]
      if (tab?.id != null) {
        const message = {
          command: 'logInActiveTab',
          data: {
            log: log
          }
        }
        this.api.tabs.sendMessage(tab.id, message)
      }
    })
  }
}
