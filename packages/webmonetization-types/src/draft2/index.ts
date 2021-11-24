// See: https://github.com/WICG/webmonetization/issues/220

export type MonetizationStateError = 'error'
export type MonetizationStateIdle = 'idle'
export type MonetizationStateInteractive = 'interactive'
export type MonetizationState =
  | MonetizationStateError
  | MonetizationStateIdle
  | MonetizationStateInteractive

export interface NavigationMonetization extends EventTarget {
  state: MonetizationState
  onmonetization: ((event: MonetizationEvent) => void) | null
  onstatechange: ((event: Event & { type: 'statechange' }) => void) | null
}

export interface MonetizationEvent extends Event {
  type: 'monetization'
  // The link[@rel="monetization"] @href value
  url: string
  // The deprecated? Web-Monetization-Id. Used internally at the least as a
  // stream id.
  requestId: string

  // The amount * received * at the destination specified in the SPSP endpoint
  // TODO: were we going to collapse these?
  amount: string
  assetCode: string
  assetScale: number

  // Optional STREAM receipt
  receipt: string | null
}
