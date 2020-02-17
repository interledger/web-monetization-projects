import { inject, injectable } from 'inversify'
import { parsePolicyDirectives } from '@web-monetization/polyfill-utils'

import * as tokens from '../../types/tokens'
import { FrameStateChange, UnloadFrame } from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'

@injectable()
export class Frames {
  isTopFrame: boolean
  isAnyCoilFrame: boolean
  isIFrame: boolean
  isCoilTopFrame: boolean
  isDirectChildFrame: boolean
  isMonetizableFrame: boolean

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
    this.isDirectChildFrame = this.isIFrame && window.parent === window.top
    this.isMonetizableFrame = this.isTopFrame || this.isDirectChildFrame
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
          void this.checkForAllowedIFrames()
        },
        { once: true }
      )
    }
  }

  private async checkForAllowedIFrames() {
    // Can't really use *= or ~= because of potential monetization in a string etc
    // need an allow syntax parser ....
    const frames = document.querySelectorAll<HTMLIFrameElement>('iframe[allow]')
    const allowed = Array.from(frames).filter((frame, ix) => {
      if (!frame.allow) {
        return false
      }
      const parsed = parsePolicyDirectives(frame.allow)
      return 'monetization' in parsed
    })

    if (allowed.length) {
      // send allowIFrames (implied tabId/frameId and number frames) message
      // create uuidv4 in background page ...
      //
      this.reportAllowedToBackgroundPageThenPostAllowTokens(allowed)
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

  private reportAllowedToBackgroundPageThenPostAllowTokens(
    allowed: HTMLIFrameElement[]
  ) {}
}
