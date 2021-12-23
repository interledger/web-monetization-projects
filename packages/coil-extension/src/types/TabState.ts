import { PaymentDetails } from '@webmonetization/polyfill-utils'

import { PlayOrPauseState, StickyState } from './streamControls'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'

export interface FrameState {
  adapted: boolean
  monetized: boolean
  // Tracks the total amount of `source` money sent (not was received)
  total: number
  [x: `requestId-lastCommand-${string}`]:
    | {
        command: MonetizationCommand
        details: PaymentDetails
      }
    | undefined
    | null
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
