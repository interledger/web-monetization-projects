import { inject, injectable } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

import { getTab } from '../../util/tabs'
import { ToBackgroundMessage } from '../../types/commands'
import { notNullOrUndef } from '../../util/nullables'

import { logger, Logger } from './utils'

interface Frame {
  /**
   *
   */
  state: Document['readyState']
  /**
   * Url kept up to date via webNavigation apis and content script
   * readystatechange listener messages
   */
  href: string
  /**
   * Top iframe
   */
  top: boolean
  /**
   * Will be 0 for topmost iframe
   */
  frameId: number
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

  getFrame(tabId: number, frameId: number) {
    const frames = (this.tabs[tabId] = this.tabs[tabId] ?? [])
    return frames.find(f => {
      return f.frameId == frameId
    })
  }

  monitor() {
    setInterval(() => {
      this.logTabs()
    }, 2e3)

    const callback = ({
      url,
      tabId,
      frameId
    }: {
      url: string
      tabId: number
      frameId: number
    }) => {
      const frame = this.getFrame(tabId, frameId)
      if (frame) {
        frame.href = url
      }
    }
    this.api.webNavigation.onHistoryStateUpdated.addListener(callback)
    this.api.webNavigation.onHistoryStateUpdated.addListener(() => {
      this.logTabs()
    })
    this.api.webNavigation.onReferenceFragmentUpdated.addListener(callback)
    this.api.webNavigation.onCommitted.addListener(callback)
    this.api.webNavigation.onCompleted.addListener(callback)
    this.api.webNavigation.onBeforeNavigate.addListener(callback)
    this.api.tabs.onRemoved.addListener(tabId => {
      delete this.tabs[tabId]
    })

    this.api.runtime.onMessage.addListener(
      (message: ToBackgroundMessage, sender) => {
        const tabId = getTab(sender)
        const frameId = notNullOrUndef(sender.frameId)
        const top = frameId === 0

        if (message.command === 'unloadFrame') {
          this.log('unloadFrame %s', frameId)
          const frames = (this.tabs[tabId] = this.tabs[tabId] ?? [])
          const ix = frames.findIndex(f => f.frameId === frameId)
          if (ix !== -1) {
            this.log('removing', ix)
            frames.splice(ix, 1)
          }
          if (frames.length === 0) {
            delete this.tabs[tabId]
          }
        } else if (message.command === 'frameStateChange') {
          this.log(
            'frameStateChange, frameId=%s, tabId=%s, message=%s',
            sender.frameId,
            tabId,
            JSON.stringify(message, null, 2)
          )

          const { href, state } = message.data
          const frames = (this.tabs[tabId] = this.tabs[tabId] ?? [])
          const frame = frames.find(f => {
            return f.frameId == frameId
          })
          if (!frame) {
            frames.push({
              frameId,
              href,
              state,
              top
            })
          } else {
            // top and frameId don't change
            frame.href = href
            frame.state = state
          }
        }
        this.logTabs()
      }
    )
  }

  private logTabs() {
    this.log('tabs', JSON.stringify(this.tabs, null, 2))
  }
}
