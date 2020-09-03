// FROM UPKEEP TEMPLATE
import * as uuid from 'uuid'
import {
  MonetizationEvent,
  MonetizationExtendedDocument
} from '@web-monetization/types'
import Ajv from 'ajv'

import { listenOnce, timeout } from './utils'
import { MonetizationStopEventSchema } from './schema/MonetizationStopEvent'
import { MonetizationPendingEventSchema } from './schema/MonetizationPendingEvent'
import { MonetizationStartEventSchema } from './schema/MonetizationStartEvent'
import { MonetizationProgressEventSchema } from './schema/MonetizationProgressEvent'

const EVENTS = [
  'monetizationpending',
  'monetizationstart',
  'monetizationstop',
  'monetizationprogress'
]

const ajv = new Ajv({ allErrors: true })

export class MonetizationImplTest {
  ix = 0

  constructor(
    private document: MonetizationExtendedDocument,
    private window: Window,
    private log: (log: string) => void
  ) {}

  async test() {
    const staticMeta = this.document.head.querySelector(
      'meta[name="monetization"]'
    )
    const {
      requestId: staticId
    } = await this.staticMetaInitAndPendingToFirstProgress(staticMeta)
    await this.staticMetaRemoval(staticMeta)
    const { meta, requestId: metaId } = await this.dynamicMetaAddition()
    this.step(
      "requestId has changed from previous section's monetization request"
    )
    this.assert(metaId !== staticId)
    const { requestId: changeId } = await this.dynamicContentChange(meta)
    this.step(
      "requestId has changed from previous section's monetization request"
    )
    this.assert(changeId !== metaId)
  }

  private async dynamicContentChange(meta: HTMLMetaElement) {
    this.startSection('dynnamic content change: stop previous to new progress')
    meta.content = '$twitter.xrptipbot.com/Coil'
    await this.waitStop()
    return this.pendingToProgress()
  }

  private async dynamicMetaAddition() {
    this.startSection('dynamic meta addition: pending to progress')
    const meta = this.document.createElement('meta')
    meta.name = 'monetization'
    meta.content = '$twitter.xrptipbot.com/sharafian_'
    this.document.head.appendChild(meta)
    const { requestId } = await this.pendingToProgress()
    return { requestId, meta }
  }

  private async staticMetaRemoval(meta: Element | null) {
    this.startSection('static meta tag removal: monetization stop')
    this.step('removing the meta tag should emit monetizationstop')

    // Due to the async/threaded (multiple JS contexts) nature of the extension
    // this may take a while and it's reasonable to see some monetizationprogress
    // events. Ignore them
    meta?.remove()
    await this.waitStop()
  }

  private async waitStop() {
    let stop: MonetizationEvent
    do {
      stop = await this.nextMonetizationEvent('monetizationstop')
    } while (stop.type === 'monetizationprogress')

    this.step('next event should be monetizationstop')
    this.assert(stop.type === 'monetizationstop', `got: ${stop.type}`)

    this.step('document.monetization.state should be stopped')
    this.assert(this.stateAsString() === 'stopped')

    this.step('stop event should have final: true')
    this.assert(
      stop.detail.finalized,
      `got: finalized=${stop.detail.finalized}`
    )
    this.assertEventWellFormed(
      'monetizationstop',
      MonetizationStopEventSchema,
      stop
    )
  }

  private assertEventWellFormed(
    type: string,
    schema: Record<string, unknown>,
    event: MonetizationEvent
  ) {
    this.step(`${type} should be well formed`)
    this.assert(
      ajv.validate(schema, event) as boolean,
      ajv.errorsText(ajv.errors)
    )
  }

  private async staticMetaInitAndPendingToFirstProgress(meta: Element | null) {
    const document = this.document
    this.startSection('static meta tag: pending to progress')
    this.step('document.monetization object is defined')
    this.assert(typeof document.monetization !== 'undefined')
    this.step('document.monetization is instance of EventTarget')
    this.assert(document.monetization instanceof EventTarget)
    this.step('typeof document.monetization.state is "string"')
    // noinspection SuspiciousTypeOfGuard
    this.assert(typeof document.monetization.state === 'string')
    this.step('document.monetization.state should initialize "stopped"')
    this.assert(document.monetization.state === 'stopped')
    this.step(`should have &lt;meta id="initial-static"...&gt; tag`)
    this.assert(meta?.id === 'initial-static')
    return this.pendingToProgress()
  }

  private async pendingToProgress() {
    this.step('next event should be monetizationpending')
    const pending = await this.nextMonetizationEvent('monetizationpending')
    this.assert(pending.type === 'monetizationpending', `got ${pending.type}`)
    this.assertEventWellFormed(
      'monetizationpending',
      MonetizationPendingEventSchema,
      pending
    )
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

    this.step('document.monetization.state should be started')
    this.assert(this.stateAsString() === 'started')

    this.assertEventWellFormed(
      'monetizationstart',
      MonetizationStartEventSchema,
      start
    )

    this.step(`requestId should be same as monetizationpending event`)
    this.assert(
      start.detail.requestId === requestId,
      `got ${start.detail.requestId}`
    )

    this.step('next event should be progress')
    const progress = await this.nextMonetizationEvent('monetizationprogress')
    this.assert(progress.type === 'monetizationprogress', `got ${start.type}`)

    this.step('document.monetization.state should be started')
    this.assert(this.stateAsString() === 'started')

    this.step(`requestId should be same as monetizationpending event`)
    this.assert(
      progress.detail.requestId === requestId,
      `got ${progress.detail.requestId}`
    )
    this.assertEventWellFormed(
      'monetizationprogress',
      MonetizationProgressEventSchema,
      progress
    )
    return { requestId }
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

  private startSection(description: string) {
    this.ix = 0
    this.log(`<h3>${description}</h3>`)
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
