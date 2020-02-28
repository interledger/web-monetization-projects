import { parsePolicyDirectives } from '@web-monetization/polyfill-utils'

export function isMonetizationAllowed(frame: HTMLIFrameElement) {
  let allowed = false
  try {
    if (frame.allow) {
      const parsed = parsePolicyDirectives(frame.allow)
      allowed = 'monetization' in parsed
    }
  } catch (e) {
    allowed = false
  }
  return allowed
}
