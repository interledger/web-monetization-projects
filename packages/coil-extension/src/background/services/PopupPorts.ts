import { inject, injectable } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

@injectable()
export class PopupPorts {
  private ports = new Set<chrome.runtime.Port>()

  constructor(@inject(tokens.WextApi) private api = chrome) {}

  setup() {
    this.api.runtime.onConnect.addListener(port => {
      this.ports.add(port)
      port.onDisconnect.addListener(port => {
        this.ports.delete(port)
      })
    })
  }

  sendMessage(message: unknown) {
    for (const port of this.ports.values()) {
      port.postMessage(message)
    }
  }
}
