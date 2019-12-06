import {
  MonetizationEvent,
  MonetizationProgressEvent,
  MonetizationStartEvent,
  MonetizationState
} from '@web-monetization/types'

import { getDoc } from './documentExtensions'
import { debug } from './logging'

export class DocumentMonetization {
  private state: MonetizationState = 'stopped'
  private request?: MonetizationStartEvent['detail']

  constructor(private doc: Document) {}

  setMonetizationRequest(request?: MonetizationStartEvent['detail']) {
    this.request = request
  }

  setState(state: MonetizationState) {
    debug('SET STATE', 'new:', state, 'old:', this.state)
    const changed = this.state != state
    this.state = state
    if (changed) {
      getDoc(this.doc).monetization.state = state
      if (this.request && (state === 'stopped' || state === 'pending')) {
        this.dispatchMonetizationEvent(
          state === 'pending' ? 'monetizationpending' : 'monetizationstop',
          this.request
        )
      }
    }
    return changed
  }

  dispatchMonetizationStartEventAndSetMonetizationState(
    detail: MonetizationStartEvent['detail']
  ) {
    // Indicate that payment has started.
    const changed = this.setState('started')
    if (!changed) {
      throw new Error(`expecting state transition`)
    }
    // First nonzero packet has been fulfilled
    this.dispatchMonetizationEvent('monetizationstart', detail)
  }

  private dispatchMonetizationEvent(
    name: MonetizationEvent['type'],
    detail: MonetizationEvent['detail']
  ) {
    getDoc(this.doc).monetization.dispatchEvent(
      new CustomEvent(name, { detail })
    )
  }

  dispatchMonetizationProgressEvent(
    detail: MonetizationProgressEvent['detail']
  ) {
    this.dispatchMonetizationEvent('monetizationprogress', detail)
  }
}
