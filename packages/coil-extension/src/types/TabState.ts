import { PlayOrPauseState, StickyState } from './streamControls'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'

export interface FrameState {
  paymentPointer?: string
  adapted: boolean
  monetized: boolean
  // Tracks the total amount of `source` money sent (not was received)
  total: number
  lastMonetization: {
    requestId: string | null
    command: MonetizationCommand | null
  }
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
