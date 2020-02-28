import { inject, injectable } from 'inversify'
import * as uuid from 'uuid'

import * as tokens from '../../types/tokens'
import { FrameStateChange, UnloadFrame } from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { FrameSpec, sameFrame } from '../../types/FrameSpec'
import { isMonetizationAllowed } from '../util/isMonetizationAllowed'
import { notNullOrUndef } from '../../util/nullables'

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

  // iframe to FrameSpec
  frames = new WeakMap<
    HTMLIFrameElement,
    {
      frame: Promise<FrameSpec>
    }
  >()

  // correlationId to promise resolver
  frameQueue = new Map<
    string,
    {
      resolve: (val: FrameSpec) => void
    }
  >()

  // TODO:disentangle allow checking from enqueuing correlations
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
        const framePromise = new Promise<FrameSpec>(resolve => {
          // Handler for this will report to background page with the correlationId
          // The background page will get the parentId from the frames service
          // The correlationId will be sent to the parent page which will then
          // find the promise in the queue and `resolve` it with {tabId, frameId}
          this.frameQueue.set(correlationId, { resolve })
          notNullOrUndef(frameEl.contentWindow).postMessage(
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
      if (sameFrame(await result.frame, frameSpec)) {
        return isMonetizationAllowed(frameEl)
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
