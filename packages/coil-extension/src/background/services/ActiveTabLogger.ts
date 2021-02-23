import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'

@injectable()
export class ActiveTabLogger {
  constructor(
    @inject(tokens.WextApi)
    private api = chrome
  ) {}

  log(log: string) {
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
