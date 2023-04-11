import { EventEmitter } from 'events'

import { decorate, injectable } from 'inversify'
import { AdaptiveBandwidth } from '@webmonetization/polyfill-utils'
import { inversifyModule } from '@dier-makr/inversify'
import { GlobalModule } from '@dier-makr/annotations'

import { BandwidthTiers } from './BandwidthTiers'

export function decorateThirdPartyClassesForInjection() {
  inversifyModule(GlobalModule)
  decorate(injectable(), EventEmitter)
  decorate(injectable(), BandwidthTiers)
  decorate(injectable(), AdaptiveBandwidth)
}
