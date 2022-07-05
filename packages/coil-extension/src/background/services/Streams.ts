import { EventEmitter } from 'events'

import { PaymentDetails } from '@webmonetization/polyfill-utils'
import { Container, injectable } from 'inversify'
import { BandwidthTiers } from '@coil/polyfill-utils'

import * as tokens from '../../types/tokens'

import { Stream } from './Stream'

@injectable()
export class Streams extends EventEmitter {
  private readonly _streams: { [id: string]: Stream }

  constructor(
    private container: Container,
    private readonly _tiers: BandwidthTiers
  ) {
    super()
    this._streams = {}
  }

  /*
   * Note re: `initiatingUrl`. A monetization request may persist throughout
   * different urls in the case of HTML5 history.pushState and a site wide
   * meta tag.
   */
  beginStream(
    id: string,
    options: PaymentDetails & {
      spspEndpoint: string
      token: string
      initiatingUrl: string
    }
  ) {
    const child = this.container.createChild()
    child.bind(tokens.CreateStreamDetails).toConstantValue({ ...options })
    this._streams[id] = child.get(Stream)
    this._streams[id].on('money', details => {
      this.emit('money', { url: options.initiatingUrl, id, ...details })
    })
    const events = ['abort', 'spsp-event']
    events.forEach(ev => {
      this._streams[id].on(ev, (...args: unknown[]) => {
        this.emit(ev, ...args)
      })
    })
    void this._streams[id].start()
  }

  pauseStream(id: string) {
    if (this._streams[id]) {
      void this._streams[id].pause()
    }
  }

  resumeStream(id: string) {
    if (this._streams[id]) {
      void this._streams[id].resume()
    }
  }

  closeStream(id: string) {
    if (this._streams[id]) {
      void this._streams[id].stop()
      this.emit('close', id)
      this._streams[id].removeAllListeners()
      delete this._streams[id]
    }
  }

  getStream(id: string) {
    return this._streams[id]
  }
}
