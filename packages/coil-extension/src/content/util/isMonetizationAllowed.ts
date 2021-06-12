import { parsePolicyDirectives } from '@webmonetization/polyfill-utils'

export function isMonetizationAllowed(frame: HTMLIFrameElement) {
  const allowValue = frame.attributes.getNamedItem('allow')?.value
  let allowed = false
  try {
    if (allowValue) {
      const parsed = parsePolicyDirectives(allowValue)
      allowed = 'monetization' in parsed
    }
  } catch (e) {
    allowed = false
  }
  return allowed
}
