import { EventEmitter } from 'events'

import { decorate, injectable } from 'inversify'
import { AdaptiveBandwidth } from '@web-monetization/polyfill-utils'
import { BandwidthTiers } from '@coil/polyfill-utils'
import { inversifyModule } from '@dier-makr/inversify'
import { GlobalModule } from '@dier-makr/annotations'

export function decorateThirdPartyClasses() {
  inversifyModule(GlobalModule)
  decorate(injectable(), EventEmitter)
  decorate(injectable(), BandwidthTiers)
  decorate(injectable(), AdaptiveBandwidth)
}
