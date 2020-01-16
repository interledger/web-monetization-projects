import { inject, injectable } from 'inversify'
import * as uuid from 'uuid'

import * as tokens from '../../types/tokens'
import { FrameStateChange, UnloadFrame } from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'

@injectable()
export class Frames {
  isTopFrame: boolean
  isAnyCoilFrame: boolean
  isIFrame: boolean
  isCoilTopFrame: boolean
  uuid: string = uuid.v4()

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
  }

  monitor() {
    this.sendStateChange()
    this.doc.addEventListener('readystatechange', () => {
      this.sendStateChange()
    })
    this.window.addEventListener('unload', () => {
      const unload: UnloadFrame = {
        command: 'unloadFrame',
        data: {
          uuid: this.uuid
        }
      }
      this.runtime.sendMessage(unload)
    })
  }

  private sendStateChange() {
    const frameStateChange: FrameStateChange = {
      command: 'frameStateChange',
      data: {
        top: this.isTopFrame,
        state: this.doc.readyState,
        uuid: this.uuid,
        href: this.window.location.href,
        title: this.doc.title
      }
    }
    this.runtime.sendMessage(frameStateChange)
  }
}
