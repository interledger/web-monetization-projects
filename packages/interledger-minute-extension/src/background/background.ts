/* eslint-disable @typescript-eslint/no-explicit-any */
import * as crypto from 'crypto'

import PluginBtp from 'ilp-plugin-btp'

import { makeDebug } from '../logging'

import * as SPSP from './spsp-query'

import MessageSender = chrome.runtime.MessageSender

const debug = makeDebug('background:')

interface Receiver {
  url: string
  receiver: string // paymentPointer
  query: {
    destination_account: string
    shared_secret: string
    content_type: string
  }
  sequence: number
  paymentId: Buffer
}

class Background {
  private readonly _secret: string
  private readonly _server: string
  private readonly _plugin: PluginBtp
  private readonly _chunkAmount: number
  private readonly _interval: number
  private _receivers: Map<number, Receiver>

  constructor() {
    this._secret = crypto.randomBytes(16).toString('hex')
    debug(`secret: ${this._secret}`)
    this._server = `btp+ws://:${this._secret}@localhost:7768`
    debug(`server: ${this._server}`)
    this._plugin = new PluginBtp({ server: this._server })
    this._receivers = new Map()
    this._chunkAmount = 25
    this._interval = 500
  }

  async connect() {
    debug('connecting plugin')
    await this._plugin.connect()
    debug('connected plugin')

    // TODO: need to handle anything during connect phase?
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      debug('received message. request=', request)
      this._handleMessage(request, sender, sendResponse)
      return true
    })

    debug('connecting indexeddb for stats')

    debug('registered listener')
    setImmediate(async () => {
      // eslint-disable-next-line no-constant-condition
      while (true) {
        try {
          const tab = await this._getCurrentTab()
          if (!tab.id) {
            continue
          }
          const receiver = this._receivers.get(tab.id)

          if (receiver && tab.url === receiver.url) {
            debug('sending single chunk payment')
            await this._incrementSite(receiver.url)
          } else {
            this._receivers.delete(tab.id)
          }
        } catch (e) {
          if (e.message !== 'no tab is active') {
            debug('sending error. error=', e)
          }
        }

        await new Promise(resolve => setTimeout(resolve, this._interval))
      }
    })

    chrome.tabs.onRemoved.addListener(tabId => {
      this._receivers.delete(tabId)
    })
  }

  async _handleMessage(
    request: any,
    sender: MessageSender,
    sendResponse: (result: any) => void
  ) {
    if (request.command === 'pay' && sender.tab && sender.tab.highlighted) {
      await this._setStream(request.msg.receiver, sender.tab)
      sendResponse(true)
    } else if (request.command === 'stats') {
      sendResponse(await this._getStats())
    } else {
      sendResponse(false)
    }
  }

  async _setStream(receiver: string, tab: chrome.tabs.Tab) {
    if (!tab.id || !tab.url) {
      return
    }

    this._receivers.delete(tab.id)
    if (!receiver) {
      debug('removing receiver for', tab.id)
      return
    }

    debug('querying', receiver)
    const query = await SPSP.query(receiver)
    debug('got query result', query)
    debug('tab url:', tab.url)
    this._receivers.set(tab.id, {
      url: tab.url,
      query,
      sequence: 1,
      paymentId: crypto.randomBytes(16),
      receiver
    })
  }

  async _getCurrentTab() {
    return new Promise<chrome.tabs.Tab>((resolve, reject) => {
      chrome.tabs.query({ currentWindow: true, highlighted: true }, tabs => {
        if (!tabs.length) return reject(new Error('no tab is active'))
        resolve(tabs[0])
      })
    })
  }

  private async _getStats() {
    return {
      sites: []
    }
  }

  private async _incrementSite(url: string) {
    debug('_incrementSite', url)
  }
}

const background = new Background()
void background.connect()
