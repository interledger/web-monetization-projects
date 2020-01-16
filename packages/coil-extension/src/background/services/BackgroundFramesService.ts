import { injectable, inject } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

import Tab = chrome.tabs.Tab
import { assertFullySpec, getTab } from '../../util/tabs'
import { ToBackgroundMessage } from '../../types/commands'

import { logger, Logger } from './utils'

interface Frame {
  /**
   *
   */
  state: string
  /**
   *
   */
  href: string
  title: string
  top?: boolean
  uuid?: string
}

@injectable()
export class BackgroundFramesService {
  tabs: Record<number, Array<Frame>> = {}

  constructor(
    @logger('BackgroundFramesService')
    private log: Logger,
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {}

  monitor() {
    setInterval(() => {
      // this.logTabs()
    }, 2e3)

    this.api.runtime.onMessage.addListener(
      (message: ToBackgroundMessage, sender) => {
        const tabId = getTab(sender)
        if (message.command === 'unloadFrame') {
          console.log('unloadFrame')
          const frames = (this.tabs[tabId] = this.tabs[tabId] ?? [])
          const ix = frames.findIndex(f => f.uuid === message.data.uuid)
          if (ix !== -1) {
            this.log('removing', ix)
            frames.splice(ix, 1)
          }
        } else if (message.command === 'frameStateChange') {
          this.log(
            'frameStateChange message',
            tabId,
            JSON.stringify(message, null, 2)
          )

          const { title, href, uuid, state, top } = message.data
          const frames = (this.tabs[tabId] = this.tabs[tabId] ?? [])
          const frame = frames.find(f => {
            return f.uuid == uuid
          })
          if (!frame) {
            frames.push({
              uuid,
              title,
              href,
              state,
              top
            })
          } else {
            // top and uuid don't change
            frame.title = title
            frame.href = href
            frame.state = state
          }
        }
      }
    )
    this.api.tabs.onUpdated.addListener((tabId, change, tab) => {
      this.log(
        '<tabs.onUpdated>',
        tabId,
        JSON.stringify(change),
        JSON.stringify(tab, null, 2)
      )
      // this.logTabs()
      // this.log('</tabs.onUpdated>')
      assertFullySpec(tab)
      // const frames = (this.tabs[tabId] = this.tabs[tabId] ?? [])
    })
  }

  private logTabs() {
    this.log('tabs', JSON.stringify(this.tabs, null, 2))
  }
}
