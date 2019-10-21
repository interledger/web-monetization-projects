import { PlayOrPauseState, StickyState } from './streamControls'

export interface TabState {
  favicon?: string
  coilSite?: string
  adapted: boolean
  monetized: boolean
  // Tracks the total amount of `source` money sent (not was received)
  total: number
  stickyState: StickyState
  playState: PlayOrPauseState
  icon?: {
    path: string
  }
  badge?: {
    text: string
    color?: string
  }
}
