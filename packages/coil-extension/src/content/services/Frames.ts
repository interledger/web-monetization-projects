import { inject, injectable } from 'inversify'
import { parsePolicyDirectives } from '@web-monetization/polyfill-utils'
import * as uuid from 'uuid'

import * as tokens from '../../types/tokens'
import { FrameStateChange, UnloadFrame } from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { FrameSpec } from '../../types/FrameSpec'

function isMonetizationAllowed(frame: HTMLIFrameElement) {
  let allowed = false
  try {
    if (frame.allow) {
      const parsed = parsePolicyDirectives(frame.allow)
      allowed = 'monetization' in parsed
    }
  } catch (e) {
    allowed = false
  }
  return allowed
}

function sameFrame(f1: FrameSpec, f2: FrameSpec) {
  return f1.tabId === f2.tabId && f1.frameId === f2.frameId
}

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

  // iframe to FrameSpc
  frames = new WeakMap<
    HTMLIFrameElement,
    {
      frame: Promise<FrameSpec>
    }
  >()

  // correlationId to resolve/reject
  frameQueue = new Map<
    string,
    {
      resolve: (val: FrameSpec) => void
      reject: (error: Error) => void
    }
  >()

  async checkIfIframeIsAllowedFromBackground(
    frameSpec: FrameSpec
  ): Promise<boolean> {
    const iframes = Array.from(
      this.doc.querySelectorAll<HTMLIFrameElement>('iframe')
    )
    for (const frameEl of iframes) {
      let result = this.frames.get(frameEl)
      if (!result) {
        const correlationId = uuid.v4()
        const framePromise = new Promise<FrameSpec>((resolve, reject) => {
          console.log('framePromise created!')
          // Handler for this will report to background page with the correlationId
          // The background page will get the parentId from the frames service
          // The correlationId will
          this.frameQueue.set(correlationId, { resolve, reject })
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          frameEl.contentWindow!.postMessage(
            {
              wmIFrameCorrelationId: correlationId
            },
            '*'
          )
        })
        result = {
          frame: framePromise
        }
        this.frames.set(frameEl, result)
      }
      // No else! result should be set if not in frames WeakMap
      if (result) {
        if (sameFrame(await result.frame, frameSpec)) {
          console.log('frame promise resolved!')
          return isMonetizationAllowed(frameEl)
        }
      }
    }
    return false
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

  reportCorrelation(data: { frame: FrameSpec; correlationId: string }) {
    console.error('reporting correlation', data)
    const key = data.correlationId
    const queued = this.frameQueue.get(key)
    if (queued) {
      this.frameQueue.delete(key)
      queued.resolve(data.frame)
    } else {
      console.warn('unknown correlation id/frame', data)
    }
  }
}
