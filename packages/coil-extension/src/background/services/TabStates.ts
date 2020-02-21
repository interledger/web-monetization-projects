import { injectable } from 'inversify'

import { FrameState, MonetizationCommand, TabState } from '../../types/TabState'
import { IconState } from '../../types/commands'
import { Colors } from '../consts/Colors'

import { PopupIconService } from './PopupIconService'

@injectable()
export class TabStates {
  activeTab: number | null = null
  private tabStates: { [tab: number]: TabState } = {}

  constructor(private icons: PopupIconService) {}

  set(tab: number, state: Partial<TabState> = {}) {
    const existingState = this.get(tab)
    this.tabStates[tab] = { ...existingState, ...state }
  }

  setFrame(tab: number, frame: number, state: Partial<FrameState> = {}) {
    const frameStates = this.get(tab).frameStates
    const existingState = this.get(tab).frameStates[frame]
    this.set(tab, {
      frameStates: {
        ...frameStates,
        ...{ [frame]: { ...existingState, ...state } }
      }
    })
  }

  tabKeys(): number[] {
    return Object.keys(this.tabStates).map(Number)
  }

  getActiveOrDefault(): TabState {
    return (
      (this.activeTab != null && this.tabStates[this.activeTab]) ||
      this.makeDefault()
    )
  }

  private makeDefault() {
    const state: TabState = {
      playState: 'playing',
      stickyState: 'auto',
      frameStates: {
        [0]: {
          monetized: false,
          adapted: false,
          total: 0,
          lastMonetization: {
            command: null,
            timeMs: Date.now()
          }
        }
      }
    }
    return state
  }

  /**
   * Returns a non authoritative reference. Do not update it and expect updates
   * to be kept except by coincidence. Treat it as a copy.
   */
  get(tab: number, defaultValue = this.makeDefault()): TabState {
    return this.tabStates[tab] || { ...defaultValue }
  }

  clear(tab: number) {
    delete this.tabStates[tab]
  }

  setIcon(tab: number, state: IconState) {
    switch (state) {
      case 'inactive':
        this.set(tab, {
          icon: { path: this.icons.getInactive() },
          badge: { text: '' }
        })
        break

      case 'monetized':
        this.set(tab, {
          icon: { path: this.icons.getActive() }
        })
        break

      case 'unavailable':
        this.set(tab, {
          badge: { text: '!', color: Colors.Red }
        })
        break

      case 'streaming':
        this.set(tab, {
          badge: { text: '$', color: Colors.Green }
        })
        break

      case 'streaming-paused':
        this.set(tab, {
          badge: { text: '\u23F8', color: Colors.Green }
        })
        break

      default:
        break
    }
  }

  logLastMonetizationCommand(
    tab: number,
    frameID: number,
    command: MonetizationCommand
  ) {
    this.setFrame(tab, frameID, {
      lastMonetization: {
        command,
        timeMs: Date.now()
      }
    })
  }
}
