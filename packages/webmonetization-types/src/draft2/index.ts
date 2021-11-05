// See: https://github.com/WICG/webmonetization/issues/220
import { MonetizationProgressEventDetail } from '../index'

export type MonetizationStateError = 'error'
export type MonetizationStateIdle = 'idle'
export type MonetizationStateInteractive = 'interactive'
export type MonetizationState =
  | MonetizationStateError
  | MonetizationStateIdle
  | MonetizationStateInteractive

export interface NavigationMonetization extends EventTarget {
  state: MonetizationState
}

export interface MonetizationEvent
  extends CustomEvent<MonetizationProgressEventDetail> {
  type: 'monetization'
}
