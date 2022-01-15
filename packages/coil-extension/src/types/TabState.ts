import { PaymentDetails } from '@webmonetization/polyfill-utils'

import { PlayOrPauseState, StickyState } from './streamControls'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'
export const LastCommandKey = `requestId-lastCommand-` as const
export type LastCommandKeyType = typeof LastCommandKey

export interface FrameState {
  adapted: boolean
  // Tracks the total amount of `source` money sent (not was received)
  total: number
  [x: `${LastCommandKeyType}${string}`]:
    | {
        command: MonetizationCommand
        details: PaymentDetails
      }
    | undefined
    | null
}

export function isFrameMonetized(frameState: FrameState) {
  return Object.keys(frameState).some(
    key =>
      key.startsWith(LastCommandKey) &&
      frameState[key as LastCommandKeyType]?.command !== 'stop'
  )
}

export function isFrameStreaming(frameState: FrameState) {
  return Object.keys(frameState).some(
    key =>
      key.startsWith(LastCommandKey) &&
      frameState[key as LastCommandKeyType]?.command === 'start'
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
