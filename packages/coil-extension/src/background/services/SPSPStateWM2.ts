import { inject, injectable } from 'inversify'
import * as tokens from '@webmonetization/wext/tokens'

import { SPSPRequestEvent } from '../../types/commands'

import { Streams } from './Streams'
import { StreamAssociations } from './StreamAssociations'

@injectable()
export class SPSPStateWM2 {
  streamState: {
    [requestId: string]: {
      loaded: boolean
      erred: boolean
    }
  } = {}

  constructor(
    private assoc: StreamAssociations,
    private streams: Streams,
    @inject(tokens.WextApi)
    private wext: typeof chrome
  ) {}

  bindToStreamsEvents() {
    this.streams.on('spsp-event', (event, requestId) => {
      this.handleEvent(event, requestId)
    })
    this.streams.on('close', requestId => {
      delete this.streamState[requestId]
    })
  }

  //TODO:WM2
  sendProgressEvent(requestId: string): boolean {
    return true
  }

  /**
   * Make sure we only have these combinations:
   *  load
   *  load, then error
   *  error
   *
   */
  handleEvent(event: SPSPRequestEvent['data']['event'], requestId: string) {
    let dispatch = false

    const state = (this.streamState[requestId] ??= {
      erred: false,
      loaded: false
    })

    if (event === 'load') {
      if (!state.loaded && !state.erred) {
        dispatch = true
        state.loaded = true
      }
    } else if (event === 'error') {
      if (!state.erred) {
        dispatch = true
        state.erred = true
      }
    }

    if (dispatch) {
      const command: SPSPRequestEvent = {
        command: 'spspRequestEvent',
        data: {
          event: event,
          requestId
        }
      }

      const frame = this.assoc.getStreamFrame(command.data.requestId)
      this.wext.tabs.sendMessage(frame.tabId, command, {
        frameId: frame.frameId
      })
    }
  }
}
