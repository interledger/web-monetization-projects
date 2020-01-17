import { inject, injectable } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

import { getTab } from '../../util/tabs'
import { ToBackgroundMessage } from '../../types/commands'
import { notNullOrUndef } from '../../util/nullables'

import { logger, Logger } from './utils'

import GetFrameResultDetails = chrome.webNavigation.GetFrameResultDetails

interface Frame {
  /**
   *
   */
  state: Document['readyState'] | null
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

  parentFrameId: number | null
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
    const frames = this.getFrames(tabId)
    return frames.find(f => {
      return f.frameId == frameId
    })
  }

  private getFrames(tabId: number) {
    return (this.tabs[tabId] = this.tabs[tabId] ?? [])
  }

  monitor() {
    setInterval(() => {
      this.logTabs()
    }, 2e3)

    const makeCallback = (event: string) => {
      return (details: { url: string; tabId: number; frameId: number }) => {
        const frame = this.getFrame(details.tabId, details.frameId)
        this.log(
          'webNavigation.%s details:%s frame=%s',
          event,
          JSON.stringify(details),
          JSON.stringify({ frame })
        )
        if (frame) {
          frame.href = details.url
        }
      }
    }

    this.api.webNavigation.onHistoryStateUpdated.addListener(
      makeCallback('onHistoryStateUpdated')
    )
    this.api.webNavigation.onHistoryStateUpdated.addListener(() => {
      this.logTabs()
    })
    this.api.webNavigation.onReferenceFragmentUpdated.addListener(
      makeCallback('onReferenceFragmentUpdated')
    )
    this.api.webNavigation.onCommitted.addListener(makeCallback('onCommitted'))
    this.api.webNavigation.onCompleted.addListener(makeCallback('onCompleted'))
    this.api.webNavigation.onBeforeNavigate.addListener(
      makeCallback('onBeforeNavigate')
    )
    this.api.webNavigation.onTabReplaced.addListener(details => {
      this.log(
        'webNavigation.onTabReplaced details=%s',
        JSON.stringify(details)
      )
      // TODO ??
      delete this.tabs[details.replacedTabId]
    })
    this.api.tabs.onActivated.addListener(async info => {
      this.log('tabs.onActivated tabId=%s', info.tabId)
      this.onTabActivated(info.tabId)
    })
    this.api.windows.onFocusChanged.addListener(async windowId => {
      this.log('windows.onFocusChanged windowId=%s', windowId)
      if (windowId === -1) {
        // special window (devtools etc)
        return
      }
      const tabId = await this.getActiveTabId(windowId)
      this.onTabActivated(tabId)
    })
    this.api.tabs.onRemoved.addListener(tabId => {
      this.log('tabs.onTabRemoved %s', tabId)
      delete this.tabs[tabId]
    })

    this.api.runtime.onMessage.addListener(
      async (message: ToBackgroundMessage, sender) => {
        const tabId = getTab(sender)
        const frameId = notNullOrUndef(sender.frameId)
        const top = frameId === 0
        if (message.command === 'frameStateChange') {
          this.log(
            'frameStateChange, frameId=%s, tabId=%s, message=%s',
            sender.frameId,
            tabId,
            JSON.stringify(message, null, 2)
          )

          const { href, state } = message.data
          const frames = this.getFrames(tabId)
          const frame = this.getFrame(tabId, frameId)
          if (!frame) {
            const navFrame = await this.webNavigationGetFrame(tabId, frameId)
            if (!this.getFrame(tabId, frameId)) {
              frames.push({
                frameId,
                href: navFrame.url,
                state,
                top,
                parentFrameId: navFrame.parentFrameId
              })
            }
          } else {
            // top and frameId, parentFrameId don't change
            frame.href = href
            frame.state = state
          }
        }
        this.logTabs()
      }
    )
  }

  private async webNavigationGetFrame(
    tabId: number,
    frameId: number
  ): Promise<GetFrameResultDetails> {
    return new Promise((resolve, reject) => {
      this.api.webNavigation.getFrame({ tabId, frameId }, frame => {
        if (frame) {
          resolve(frame)
        } else {
          reject()
        }
      })
    })
  }

  private onTabActivated(tabId: number) {
    const tabFrames = this.getFrames(tabId)
    this.api.webNavigation.getAllFrames({ tabId }, frames => {
      frames?.forEach(frame => {
        if (!frame.url.startsWith('http')) {
          return
        }
        const storedFrame = this.getFrame(tabId, frame.frameId)
        if (!storedFrame) {
          this.api.tabs.executeScript(tabId, {
            frameId: frame.frameId,
            code: `
 const frameStateChange = {
  command: 'frameStateChange',
  data: {
    state: document.readyState,
    href: window.location.href
  }
}
chrome.runtime.sendMessage(frameStateChange)
 `
          })
          tabFrames.push({
            frameId: frame.frameId,
            top: frame.frameId === 0,
            href: frame.url,
            state: null,
            parentFrameId: frame.parentFrameId
          })
        }
      })
    })
  }

  private async getActiveTabId(windowId: number) {
    return await new Promise<number>((resolve, reject) => {
      this.api.tabs.query({ active: true, windowId }, tabs => {
        if (tabs.length === 0 || tabs[0].id == null) reject()
        resolve(tabs[0].id)
      })
    })
  }

  private logTabs() {
    this.log('tabs', JSON.stringify(this.tabs, null, 2))
  }
}
