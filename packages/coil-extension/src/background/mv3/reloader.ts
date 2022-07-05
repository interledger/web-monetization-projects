import '@abraham/reflection'
import WS from 'reconnecting-websocket'
import { injectable } from 'inversify'

@injectable()
export class Reloader {
  constructor(
    private wextApi: typeof chrome,
    private log: typeof console.log,
    private port = 4444
  ) {}

  connect() {
    const ws = this.makeWebSocket()

    ws.addEventListener('message', message => {
      const parsed = JSON.parse(message.data)
      this.log(
        'received message from server',
        JSON.stringify(parsed.data, null, 2)
      )
      if (parsed.data.changed.includes('backgroundMV3.js')) {
        void this.doBackgroundReload()
      }
    })

    const logger = (prefix: string) => this.log.bind(console, prefix)
    for (const event of ['open', 'error', 'close'] as const) {
      ws.addEventListener(event, logger(`WebSocket logging on${event}`))
    }
  }

  private makeWebSocket() {
    return new WS(`ws://localhost:${this.port}`)
  }

  private async doBackgroundReload() {
    // Reload the active tab
    const tab = await this.getActiveTab()
    if (tab && tab.url !== 'chrome://extensions') {
      this.wextApi.tabs.reload()
    }
    // Reload the service worker
    this.wextApi.runtime.reload()
  }

  private async getActiveTab(): Promise<chrome.tabs.Tab | undefined> {
    const tabs = await this.wextApi.tabs.query({
      active: true,
      currentWindow: true
    })
    return tabs[0]
  }
}
