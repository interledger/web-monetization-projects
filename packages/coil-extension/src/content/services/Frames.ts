import { inject, injectable } from 'inversify'
import { parsePolicyDirectives } from '@web-monetization/polyfill-utils'

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
    if (this.isTopFrame) {
      this.window.addEventListener(
        'load',
        () => {
          // Can't really use *= or ~= because of potential monetization in a string etc
          // need an allow syntax parser ....
          const frames = document.querySelectorAll<HTMLIFrameElement>(
            'iframe[allow]'
          )
          Array.from(frames).forEach((frame, ix) => {
            if (!frame.allow) {
              return
            }
            // WOULD need to parse here ...
            const parsed = parsePolicyDirectives(frame.allow)
            if (!('monetization' in parsed)) {
              return
            }
            const origin = new URL(frame.src).origin
            frame.contentWindow?.postMessage(
              {
                // Need frameId/tabId
                msg: `hello to iframe[@id="${frame.getAttribute('id')}"]`,
                allow: frame.allow
              },
              origin
            )
          })
        },
        { once: true }
      )
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
