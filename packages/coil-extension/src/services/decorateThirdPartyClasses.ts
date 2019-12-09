import { EventEmitter } from 'events'

import { decorate, injectable } from 'inversify'
import { AdaptiveBandwidth } from '@web-monetization/polyfill-utils'
import { BandwidthTiers } from '@coil/polyfill-utils'

import { decorateCoilClient } from './decorateCoilClient'

export function decorateThirdPartyClasses() {
  decorateCoilClient()
  decorate(injectable(), EventEmitter)
  decorate(injectable(), BandwidthTiers)
  decorate(injectable(), AdaptiveBandwidth)
}
