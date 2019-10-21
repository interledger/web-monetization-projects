import { EventEmitter } from 'events'

import { decorate, inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'
import {
  AdaptiveBandwidth,
  BandwidthTiers
} from '@web-monetization/polyfill-utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function injectArg(param: any): ParameterDecorator {
  return (inject(param) as unknown) as ParameterDecorator
}

export function decorateCoilClient() {
  decorate(injectable(), GraphQlClient)
  decorate(injectable(), GraphQlClient.Options)
  decorate(injectArg(GraphQlClient.Options), GraphQlClient, 0)
}

export function decorateThirdPartyClasses() {
  decorateCoilClient()
  decorate(injectable(), EventEmitter)
  decorate(injectable(), BandwidthTiers)
  decorate(injectable(), AdaptiveBandwidth)
}
