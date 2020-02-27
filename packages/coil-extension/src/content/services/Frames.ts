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
  }

  sendAllowMessages(allowToken: string) {
    const iframes = Array.from(
      this.doc.querySelectorAll<HTMLIFrameElement>('iframe')
    )

    for (const frame of iframes) {
      let allowed = false
      try {
        if (frame.allow) {
          const parsed = parsePolicyDirectives(frame.allow)
          allowed = 'monetization' in parsed
        }
      } catch (e) {
        allowed = false
      }
      if (frame.contentWindow) {
        frame.contentWindow.postMessage(
          {
            wmIframe: {
              allowToken,
              allowed
            }
          },
          '*'
        )
      }
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
