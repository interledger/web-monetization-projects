import { PaymentDetails } from '@webmonetization/polyfill-utils'

import { PlayOrPauseState, StickyState } from './streamControls'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'
export const MonetizationStateKey = `monetization-state-` as const
export type MonetizationStateKeyType = typeof MonetizationStateKey

export interface FrameState {
  adapted: boolean
  // Tracks the total amount of `source` money sent (not was received)
  total: number
  [x: `${MonetizationStateKeyType}${string}`]:
    | {
        command: MonetizationCommand
        details: PaymentDetails
        total: number
      }
    | undefined
    | null
}

export function isFrameMonetized(frameState: FrameState) {
  return Object.keys(frameState).some(
    key =>
      key.startsWith(MonetizationStateKey) &&
      frameState[key as MonetizationStateKeyType]?.command !== 'stop'
  )
}

export function isFrameStreaming(frameState: FrameState) {
  return Object.keys(frameState).some(
    key =>
      key.startsWith(MonetizationStateKey) &&
      frameState[key as MonetizationStateKeyType]?.command === 'start'
  )
}

export interface TabState {
  favicon?: string
  coilSite?: string
  stickyState: StickyState
  playState: PlayOrPauseState
  iconPrimary?: 'active' | 'inactive'
  iconSecondary?: 'unavailable' | 'streaming' | 'streaming-paused' | null
  frameStates: Record<number, FrameState>
}
