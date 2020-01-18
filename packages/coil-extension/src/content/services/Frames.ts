import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { FrameStateChange, UnloadFrame } from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { API } from '../../webpackDefines'

@injectable()
export class Frames {
  isTopFrame: boolean
  isAnyCoilFrame: boolean
  isIFrame: boolean
  isCoilTopFrame: boolean
  isDirectChild: boolean

  constructor(
    private doc: Document,
    private window: Window,
    @inject(tokens.ContentRuntime)
    private runtime: ContentRuntime,
    @inject(tokens.CoilDomain) private coilDomain: string
  ) {
    this.isTopFrame = window === window.top
    this.isAnyCoilFrame = window.origin === coilDomain
    this.isIFrame = !this.isTopFrame
    this.isCoilTopFrame = this.isTopFrame && this.isAnyCoilFrame
    this.isDirectChild = this.isIFrame && window.parent === window.top

    if (this.isDirectChild) {
      // Note that this is generally only possible for frames from the same
      // origin. For example, it does not work for cinnamon/youtube
      // So getting access to the frameElement is useless.
      console.log(
        "this.window.frameElement?.getAttribute('id')",
        this.window.frameElement?.getAttribute('id')
      )
    }
  }

  monitor() {
    this.sendStateChange()
    this.doc.addEventListener('readystatechange', () => {
      this.sendStateChange()
    })

    /**
     * Be wary of context invalidation during extension reloading causing
     * confusion here.
     */
    this.window.addEventListener('unload', () => {
      this.sendUnloadMessage()
    })
    this.window.addEventListener('message', message => {
      console.log(
        'window.message to',
        window.location.href,
        message.origin,
        message.data
      )
    })
    if (this.isTopFrame) {
      setTimeout(() => {
        // Can't really use *= or ~= because of potential monetization in a string etc
        // need an allow syntax parser ....
        const frames = document.querySelectorAll<HTMLIFrameElement>(
          'iframe[allow]'
        )
        Array.from(frames).forEach((frame, ix) => {
          // WOULD need to parse here ...
          if (!frame.allow.match(/.*monetization.*/)) {
            console.log('monetization not allowed', frame.allow)
            return
          }
          const origin = new URL(frame.src).origin
          console.log({ origin, hasWindow: Boolean(frame.contentWindow) })
          frame.contentWindow?.postMessage(
            {
              // Need frameId/tabId
              msg: `hello to iframe[@id="${frame.getAttribute('id')}"]`,
              allow: frame.allow
            },
            origin
          )
        })
      }, 1000)
    }
  }

  private sendUnloadMessage() {
    const unload: UnloadFrame = {
      command: 'unloadFrame'
    }
    this.runtime.sendMessage(unload)
  }

  private sendStateChange() {
    const frameStateChange: FrameStateChange = {
      command: 'frameStateChange',
      data: {
        state: this.doc.readyState,
        href: this.window.location.href
      }
    }
    this.runtime.sendMessage(frameStateChange)
  }
}
