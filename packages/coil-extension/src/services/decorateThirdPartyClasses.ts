import { EventEmitter } from 'events'

import { decorate, injectable } from 'inversify'
import { BandwidthTiers } from '@coil/polyfill-utils'
import { inversifyModule } from '@dier-makr/inversify'
import { GlobalModule } from '@dier-makr/annotations'

export function decorateThirdPartyClasses() {
  inversifyModule(GlobalModule)
  decorate(injectable(), EventEmitter)
  decorate(injectable(), BandwidthTiers)
}
