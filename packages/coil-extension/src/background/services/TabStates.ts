import { injectable } from 'inversify'

import { MonetizationCommand, TabState } from '../../types/TabState'
import { IconState } from '../../types/commands'
import { Colors } from '../consts/Colors'
import { Icons } from '../consts/Icons'

@injectable()
export class TabStates {
  activeTab: number | null = null
  private tabStates: { [tab: number]: TabState } = {}

  set(tab: number, state: Partial<TabState> = {}) {
    const existingState = this.get(tab)
    this.tabStates[tab] = { ...existingState, ...state }
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
      lastMonetization: {
        command: null,
        timeMs: Date.now()
      },
      playState: 'playing',
      monetized: false,
      adapted: false,
      total: 0,
      stickyState: 'auto'
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
          icon: { path: Icons.Inactive },
          badge: { text: '' }
        })
        break

      case 'monetized':
        this.set(tab, {
          icon: { path: Icons.Active }
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

  logLastMonetizationCommand(tab: number, command: MonetizationCommand) {
    this.set(tab, {
      lastMonetization: {
        command,
        timeMs: Date.now()
      }
    })
  }
}
