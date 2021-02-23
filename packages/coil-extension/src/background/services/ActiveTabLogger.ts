import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'

@injectable()
export class ActiveTabLogger {
  constructor(
    @inject(tokens.WextApi)
    private api = chrome
  ) {}

  log(log: string) {
    this.api.tabs.getCurrent(tab => {
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
