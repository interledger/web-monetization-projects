// FROM UPKEEP TEMPLATE
import * as uuid from 'uuid'
import {
  MonetizationEvent,
  MonetizationExtendedDocument
} from '@web-monetization/types'
import Ajv from 'ajv'

import { listenOnce, timeout } from './utils'
import { MonetizationStopEventSchema } from './schema/MonetizationStopEvent'

const EVENTS = [
  'monetizationpending',
  'monetizationstart',
  'monetizationstop',
  'monetizationprogress'
]

export class MonetizationImplTest {
  ix = 0
  constructor(
    private document: MonetizationExtendedDocument,
    private window: Window,
    private log: (log: string) => void
  ) {}

  async test() {
    const document = this.document

    this.step('document.monetization object is defined')
    this.assert(typeof document.monetization !== 'undefined')
    this.step('document.monetization is instance of EventTarget')
    this.assert(document.monetization instanceof EventTarget)
    this.step('typeof document.monetization.state is "string"')
    // noinspection SuspiciousTypeOfGuard
    this.assert(typeof document.monetization.state === 'string')
    this.step('document.monetization.state should initialize "stopped"')
    this.assert(document.monetization.state === 'stopped')
    const meta = document.head.querySelector('meta[name="monetization"]')
    this.step(`should have &#x3C;meta id="initial-static"&#x3E; tag`)
    this.assert(meta?.id === 'initial-static')
    this.step('next event should be monetizationpending')
    const pending = await this.nextMonetizationEvent('monetizationpending')
    this.assert(pending.type === 'monetizationpending', `got ${pending.type}`)
    this.step('document.monetization.state should be pending')
    this.assert(this.stateAsString() === 'pending')

    this.step('requestId should be a canonically encoded uuid')
    const requestId = pending.detail.requestId
    this.assert(uuid.validate(requestId), `got: ${requestId}`)

    this.step('requestId should be uuid v4')
    const version = uuid.version(requestId)
    this.assert(version === 4, `got: ${version}`)

    this.step('next event should be monetizationstart')
    const start = await this.nextMonetizationEvent('monetizationstart')
    this.assert(start.type === 'monetizationstart', `got ${start.type}`)

    this.step(`requestId should be same as monetizationpending event`)
    this.assert(
      start.detail.requestId === requestId,
      `got ${start.detail.requestId}`
    )

    this.step('removing the meta tag should emit monetizationstop')
    meta?.remove()
    const stop = await this.nextMonetizationEvent('monetizationstop')
    this.assert(stop.type === 'monetizationstop', `got: ${stop.type}`)
    this.step('stop event should have final: true')
    this.assert(
      stop.detail.finalized,
      `got: finalized=${stop.detail.finalized}`
    )
    const aj = new Ajv()
    this.step('stop event should be well formed')
    this.assert(
      aj.validate(MonetizationStopEventSchema, stop) as boolean,
      aj.errorsText(aj.errors)
    )
  }

  private stateAsString() {
    return this.document.monetization.state as string
  }

  private async nextMonetizationEvent(event = 'monetization', ms = 10e3) {
    const events = EVENTS.map(async e => {
      return timeout(
        `waiting for next "${event}" event`,
        ms,
        listenOnce(e, this.document.monetization)
      )
    })
    return (await Promise.race(events)) as Promise<MonetizationEvent>
  }

  private step(description: string) {
    this.ix++
    this.log(`${this.ix}) ${description}`)
  }

  private assert(b: boolean, reason?: string): asserts b {
    this.failIf(!b, reason)
  }

  private failIf(b: boolean, reason?: string) {
    if (b) {
      const message = '\tfailed!'
      this.log(reason ? `${message}\n\t${reason}` : message)
      throw new Error(message)
    } else {
      this.log('\tpassed!')
    }
  }
}
