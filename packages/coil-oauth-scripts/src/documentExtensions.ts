import { MonetizationObject } from '@web-monetization/types'

import { MonetizationPolyfill } from './MonetizationPolyfill'

interface DocumentExtensions {
  coilMonetizationPolyfill: MonetizationPolyfill
  monetization: MonetizationObject
  monetizationExtensionInstalled: boolean
}

// Unfortunately one ill effect of a global tsconfig is that globals are, well,
// global :)
export function getDoc() {
  return (document as unknown) as Document & DocumentExtensions
}
