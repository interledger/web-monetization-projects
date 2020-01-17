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
  // TODO: this seems useless actually
  lastUpdateTimeMS: number

  /**
   *loading
   *    The document is still loading.
   * interactive
   *    The document has finished loading and the document has been parsed but
   *    sub-resources such as images, stylesheets and frames are still loading.
   * complete
   *    The document and all sub-resources have finished loading. The state
   *    indicates that the load event is about to fire.
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
  type: string
  from: string
  tabId: number
  frameId: number
}

export interface FrameEventWithFrame extends FrameEvent {
  frame: Frame
}

export interface FrameRemovedEvent extends FrameEvent {
  type: 'frameRemoved'
}

export interface FrameAddedEvent extends FrameEventWithFrame {
  type: 'frameAdded'
}

export interface FrameChangedEvent extends FrameEventWithFrame {
  type: 'frameChanged'
  changed: Partial<Frame>
}

@injectable()
export class BackgroundFramesService extends EventEmitter {
  tabs: Record<number, Array<Frame>> = {}
  traceLogging = false
  logTabsInterval = 2000

  // noinspection TypeScriptFieldCanBeMadeReadonly
  constructor(
    @logger('BackgroundFramesService')
    private log: Logger,
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {
    super()
    this.log = console.log.bind(console, 'BackgroundFramesService')
  }

  getFrame(tabId: number, frameId: number): Readonly<Frame> | undefined {
    const frames = this.getFrames(tabId)
    return frames.find(f => {
      return f.frameId == frameId
    })
  }

  getFrames(tabId: number): Array<Readonly<Frame>> {
    return (this.tabs[tabId] = this.tabs[tabId] ?? [])
  }

  updateOrAddFrame(
    from: string,
    tabId: number,
    frameId: number,
    partial: Readonly<Partial<Frame>>
  ) {
    const lastUpdateTimeMS = partial.lastUpdateTimeMS ?? Date.now()
    const frame = this.getFrame(tabId, frameId)
    if (frame && frame.lastUpdateTimeMS > lastUpdateTimeMS) {
      this.log('ignoring frame update', { tabId, frameId, changed: partial })
      return
    }
    const update = { lastUpdateTimeMS, ...partial }
    const frames = this.getFrames(tabId)
    const changed: Partial<Frame> = {}
    let changes = 0

    if (!frame) {
      if (isFullFrame(update)) {
        frames.push(update)
        const event: FrameAddedEvent = {
          type: 'frameAdded',
          from,
          tabId,
          frameId,
          frame: update
        }
        // const changedEvent: FrameChangedEvent = {
        //   ...event,
        //   type: 'frameChanged',
        //   changed: update
        // }
        this.emit('frameAdded', event)
        // TODO: does this make sense?
        // this.emit('frameChanged', changedEvent)
      } else {
        this.log(
          'error in frameAdded from=%s update=%s',
          from,
          JSON.stringify(update)
        )
      }
    } else if (frame) {
      Object.entries(update).forEach(([key, val]) => {
        if (frame[key] !== val && val != null) {
          // Mutate the frame in place
          ;(frame as Frame)[key] = val
          changed[key] = val
          if (key !== 'lastUpdateTimeMS') {
            changes++
          }
        }
      })
      if (changes) {
        const args: FrameChangedEvent = {
          type: 'frameChanged',
          from,
          tabId,
          frameId,
          changed,
          frame
        }
        this.emit('frameChanged', args)
      }
    }
  }

  private async getWebNavigationFrame(
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

  monitor() {
    const events = ['frameChanged', 'frameAdded']
    events.forEach(e => {
      this.on(e, (event: FrameEvent) => {
        this.log(e, JSON.stringify(event, null, 2))
      })
    })

    this.api.tabs.query({}, tabs => {
      tabs.forEach(tab => {
        if (tab.id) {
          this.useWebNavigationToUpdateFrames(tab.id)
        }
      })
    })

    if (this.logTabsInterval) {
      setInterval(() => {
        this.logTabs()
      }, this.logTabsInterval)
    }

    const makeCallback = (event: string) => {
      return (details: {
        url: string
        tabId: number
        frameId: number
        parentFrameId?: number
      }) => {
        if (!details.url.startsWith('http')) {
          return
        }

        const frame = this.getFrame(details.tabId, details.frameId)
        if (this.traceLogging) {
          this.log(
            'webNavigation.%s details:%s frame=%s',
            event,
            JSON.stringify(details),
            JSON.stringify({ frame })
          )
        }
        const partial = {
          href: details.url,
          frameId: details.frameId,
          parentFrameId: details.parentFrameId,
          state: null,
          top: details.frameId === 0
        }
        this.updateOrAddFrame(
          `webNavigation.${event}`,
          details.tabId,
          details.frameId,
          partial
        )
        if (this.getFrame(details.tabId, details.frameId)?.state == null) {
          this.requestFrameState(details.tabId, details.frameId)
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
      delete this.tabs[details.replacedTabId]
    })
    this.api.tabs.onRemoved.addListener(tabId => {
      this.log('tabs.onTabRemoved %s', tabId)
      delete this.tabs[tabId]
    })

    this.api.runtime.onMessage.addListener(
      async (message: ToBackgroundMessage, sender) => {
        const tabId = getTab(sender)
        const frameId = notNullOrUndef(sender.frameId)
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
          // Don't add frames, only update
          // TODO: remember why ?
          if (frame) {
            // top and frameId, parentFrameId don't change
            this.updateOrAddFrame('frameStateChange', tabId, frameId, {
              href,
              state
            })
          } else {
            const navFrame = await this.getWebNavigationFrame(tabId, frameId)
            this.updateOrAddFrame('frameStateChange', tabId, frameId, {
              frameId,
              href: navFrame.url,
              state,
              top: frameId === 0,
              parentFrameId: navFrame.parentFrameId
            })
          }
        }
      }
    )
  }

  private useWebNavigationToUpdateFrames(tabId: number) {
    this.api.webNavigation.getAllFrames({ tabId }, frames => {
      frames?.forEach(frame => {
        if (!frame.url.startsWith('http')) {
          return
        }
        this.updateOrAddFrame(
          'useWebNavigationToUpdateFrames',
          tabId,
          frame.frameId,
          {
            frameId: frame.frameId,
            top: frame.frameId === 0,
            href: frame.url,
            state: null,
            parentFrameId: frame.parentFrameId
          }
        )

        if (this.getFrame(tabId, frame.frameId)?.state == null) {
          this.requestFrameState(tabId, frame.frameId)
        }
      })
    })
  }

  private requestFrameState(tabId: number, frameId: number) {
    this.api.tabs.executeScript(tabId, {
      frameId: frameId,
      // language=JavaScript
      code: `
        (function sendMessage() {
          const frameStateChange = {
            command: 'frameStateChange',
            data: {
              state: document.readyState,
              href: window.location.href
            }
          }
          chrome.runtime.sendMessage(frameStateChange)
        })()
      `
    })
  }

  private logTabs() {
    this.log('tabs', JSON.stringify(this.tabs, null, 2))
    // this.log('tabs', JSON.stringify(Object.keys(this.tabs), null, 2))
  }
}
