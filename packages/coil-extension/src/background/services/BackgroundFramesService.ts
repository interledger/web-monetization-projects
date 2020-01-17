import { EventEmitter } from 'events'

import { inject, injectable } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

import { getTab } from '../../util/tabs'
import { ToBackgroundMessage } from '../../types/commands'
import { notNullOrUndef } from '../../util/nullables'

import { logger, Logger } from './utils'

import GetFrameResultDetails = chrome.webNavigation.GetFrameResultDetails

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Frame extends Record<string, any> {
  lastUpdateTimeMS: number

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

  /**
   * Will be -1 for topmost iframe
   */
  parentFrameId: number
}

const isFullFrame = (partial: Partial<Frame>): partial is Frame => {
  return Boolean(
    typeof partial.frameId === 'number' &&
      typeof partial.parentFrameId === 'number' &&
      typeof partial.href === 'string' &&
      typeof partial.top === 'boolean'
  )
}

export interface FrameEvent {
  tabId: number
  frameId: number
  frame: Frame
}

export interface FrameChangedEvent extends FrameEvent {
  changed: Partial<Frame>
}

@injectable()
export class BackgroundFramesService extends EventEmitter {
  tabs: Record<number, Array<Frame>> = {}
  traceLogging = false

  constructor(
    @logger('BackgroundFramesService')
    private log: Logger,
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {
    super()
  }

  getFrame(tabId: number, frameId: number) {
    const frames = this.getFrames(tabId)
    return frames.find(f => {
      return f.frameId == frameId
    })
  }

  private getFrames(tabId: number) {
    return (this.tabs[tabId] = this.tabs[tabId] ?? [])
  }

  updateOrAddFrame(
    tabId: number,
    frameId: number,
    partial: Readonly<Partial<Frame>>
  ) {
    const frame = this.getFrame(tabId, frameId)
    if (
      frame &&
      frame.lastUpdateTimeMS &&
      partial.lastUpdateTimeMS &&
      frame.lastUpdateTimeMS > partial.lastUpdateTimeMS
    ) {
      this.log('ignoring frame update', { tabId, frameId, changed: partial })
      return
    }

    const update = { ...partial, lastUpdateTimeMS: Date.now() }
    const frames = this.getFrames(tabId)
    const changed: Partial<Frame> = {}
    let hasChanged = false

    if (!frame) {
      if (isFullFrame(update)) {
        frames.push(update)
        const event: FrameEvent = { tabId, frameId, frame: update }
        const changedEvent: FrameChangedEvent = {
          changed: update,
          tabId,
          frameId,
          frame: update
        }
        this.emit('frameAdded', event)
        this.emit('frameChanged', changedEvent)
      } else {
        this.log('error in frameAdded', JSON.stringify(update))
      }
    } else if (frame) {
      Object.entries(update).forEach(([key, val]) => {
        if (frame[key] !== val) {
          frame[key] = val
          changed[key] = val
          hasChanged = true
        }
      })
      if (hasChanged) {
        const args: FrameChangedEvent = { tabId, frameId, changed, frame }
        this.emit('frameChanged', args)
      }
    }
  }

  monitor() {
    this.on('frameChanged', (event: FrameChangedEvent) => {
      this.log('frameChanged', JSON.stringify(event, null, 2))
    })

    this.api.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id) {
          this.useWebNavigationToUpdateFrames(tab.id)
        }
      })
    })

    setInterval(() => {
      // this.logTabs()
    }, 2e3)

    const makeCallback = (event: string) => {
      return (details: { url: string; tabId: number; frameId: number }) => {
        const frame = this.getFrame(details.tabId, details.frameId)
        if (this.traceLogging) {
          this.log(
            'webNavigation.%s details:%s frame=%s',
            event,
            JSON.stringify(details),
            JSON.stringify({ frame })
          )
        }
        if (frame) {
          frame.href = details.url
        }
      }
    }

    this.api.webNavigation.onHistoryStateUpdated.addListener(
      makeCallback('onHistoryStateUpdated')
    )
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
      if (windowId === -1) {
        // special window (devtools etc)
        return
      }
      this.log('windows.onFocusChanged windowId=%s', windowId)
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
          if (this.traceLogging) {
            this.log(
              'frameStateChange, frameId=%s, tabId=%s, message=%s',
              sender.frameId,
              tabId,
              JSON.stringify(message, null, 2)
            )
          }

          const { href, state } = message.data
          const frame = this.getFrame(tabId, frameId)
          if (!frame) {
            /*const navFrame = await this.webNavigationGetFrame(tabId, frameId)
            if (!this.getFrame(tabId, frameId)) {
              this.updateOrAddFrame(tabId, frameId, {
                frameId,
                href: navFrame.url,
                state,
                top,
                parentFrameId: navFrame.parentFrameId
              })
            }*/
          } else {
            // top and frameId, parentFrameId don't change
            this.updateOrAddFrame(tabId, frameId, { href, state })
          }
        }
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
    this.log('tabActivated', tabId)
    // const tabFrames = this.getFrames(tabId)
    /// this.useWebNavigationToUpdateFrames(tabId, tabFrames)
  }

  private useWebNavigationToUpdateFrames(tabId: number) {
    this.api.webNavigation.getAllFrames({ tabId }, frames => {
      frames?.forEach(frame => {
        if (!frame.url.startsWith('http')) {
          return
        }
        this.updateOrAddFrame(tabId, frame.frameId, {
          frameId: frame.frameId,
          top: frame.frameId === 0,
          href: frame.url,
          state: null,
          parentFrameId: frame.parentFrameId
        })

        if (this.getFrame(tabId, frame.frameId)?.state == null) {
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
    this.log('tabs', JSON.stringify(Object.keys(this.tabs), null, 2))
  }
}
