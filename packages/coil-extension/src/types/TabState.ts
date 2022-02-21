import { PaymentDetails } from '@webmonetization/polyfill-utils'

import { PlayOrPauseState, StickyState } from './streamControls'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'
export const MonetizationStateKey = `monetization-state-` as const
export type MonetizationStateKeyType = typeof MonetizationStateKey

export interface FrameState {
  paymentPointer?: string
  adapted: boolean
  // Tracks the total amount of `source` money sent (not was received)
  [x: `${MonetizationStateKeyType}${string}`]:
    | {
        command: MonetizationCommand
        details: PaymentDetails
        total: number
        lastPacket: number
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

export function getFrameTotal(frameState: FrameState) {
  return getRequestStates(frameState).reduce((acc, val) => {
    return acc + val.total
  }, 0)
}

export function getRequestStates(frame: FrameState) {
  return Object.keys(frame)
    .filter(key => key.startsWith(MonetizationStateKey))
    .map(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      k => frame[k as MonetizationStateKeyType]!
    )
}

export function hasRecentPacket(frameState: FrameState) {
  const now = Date.now()
  return getRequestStates(frameState).some(s => {
    return now - s.lastPacket <= 5e3
  })
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
