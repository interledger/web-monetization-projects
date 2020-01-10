import { PlayOrPauseState, StickyState } from './streamControls'
import { StreamError } from './errors'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'

export interface TabState {
  favicon?: string
  coilSite?: string
  adapted: boolean
  monetized: boolean
  // Tracks the total amount of `source` money sent (not was received)
  total: number
  stickyState: StickyState
  playState: PlayOrPauseState
  lastMonetization: {
    command: MonetizationCommand | null
    timeMs: number
  }
  error?: StreamError
  icon?: {
    path: string
  }
  badge?: {
    text: string
    color?: string
  }
}
