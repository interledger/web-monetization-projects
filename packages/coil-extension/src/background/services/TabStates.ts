import { inject, injectable } from 'inversify'
import { PaymentDetails } from '@webmonetization/polyfill-utils'
import { StorageService } from '@webmonetization/wext/services'

import {
  FrameState,
  getFrameTotal,
  hasRecentPacket,
  isFrameMonetized,
  isFrameStreaming,
  MonetizationCommand,
  TabState
} from '../../types/TabState'
import { IconState } from '../../types/commands'
import { FrameSpec } from '../../types/FrameSpec'
import * as tokens from '../../types/tokens'
import { LocalStorageProxy } from '../../types/storage'
import { BuildConfig } from '../../types/BuildConfig'

import { AuthService } from './AuthService'
import { PopupBrowserAction } from './PopupBrowserAction'
import { Logger, logger } from './utils'

@injectable()
export class TabStates {
  private tabStates: { [tab: number]: TabState } = {}

  constructor(
    private storage: StorageService,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private auth: AuthService,
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    @inject(tokens.ActiveTab)
    public activeTab: number,
    private popup: PopupBrowserAction,
    @logger('TabStates')
    private log: Logger
  ) {}

  set(tab: number, state: Partial<TabState> = {}) {
    const existingState = this.get(tab)
    this.tabStates[tab] = { ...existingState, ...state }
  }

  setFrame({ tabId, frameId }: FrameSpec, state: Partial<FrameState> = {}) {
    const frameStates = this.get(tabId).frameStates
    const existingFrameState =
      frameStates[frameId] ?? this.makeFrameStateDefault()
    this.set(tabId, {
      frameStates: {
        ...frameStates,
        ...{ [frameId]: { ...existingFrameState, ...state } }
      }
    })
  }

  clearFrame({ tabId, frameId }: FrameSpec) {
    const tabState = this.tabStates[tabId]
    if (tabState) {
      if (frameId !== 0) {
        delete tabState.frameStates[frameId]
      } else {
        // maintain default
        tabState.frameStates[0] = this.makeFrameStateDefault()
      }
    }
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
        [0]: this.makeFrameStateDefault()
      }
    }
    return state
  }

  private makeFrameStateDefault(): FrameState {
    return {
      adapted: false
    }
  }

  /**
   * Returns a non authoritative reference. Do not update it and expect updates
   * to be kept except by coincidence. Treat it as a copy.
   */
  get(tab: number, defaultValue = this.makeDefault()): TabState {
    return this.tabStates[tab] || { ...defaultValue }
  }

  getFrameOrDefault({ tabId, frameId }: FrameSpec) {
    return (
      this.tabStates[tabId].frameStates[frameId] ?? this.makeFrameStateDefault()
    )
  }

  clear(tab: number) {
    delete this.tabStates[tab]
  }

  setIcon(tab: number, state: IconState) {
    switch (state) {
      case 'inactive':
        this.set(tab, {
          iconPrimary: 'inactive',
          iconSecondary: null
        })
        break

      case 'monetized':
        this.set(tab, {
          iconPrimary: 'active'
        })
        break

      case 'unavailable':
        this.set(tab, {
          iconSecondary: 'unavailable'
        })
        break

      case 'streaming':
        this.set(tab, {
          iconSecondary: 'streaming'
        })
        break

      case 'streaming-paused':
        this.set(tab, {
          iconSecondary: 'streaming-paused'
        })
        break

      default:
        break
    }
  }

  logLastMonetizationCommand(
    frame: FrameSpec,
    command: MonetizationCommand,
    details: PaymentDetails | string
  ) {
    if (typeof details === 'string') {
      const maybeNull =
        this.getFrameOrDefault(frame)[`monetization-state-${details}`]
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const last = maybeNull!
      details = last?.details ?? { requestId: details }
    }

    this.setFrame(frame, {
      [`monetization-state-${details.requestId}`]: {
        command,
        details: details,
        total: this.getTotal(frame, details),
        lastPacket: 0
      }
    })
  }

  getTotal(frame: FrameSpec, details: PaymentDetails) {
    return (
      this.getFrameOrDefault(frame)[`monetization-state-${details.requestId}`]
        ?.total ?? 0
    )
  }

  reloadTabState(opts: { from?: string } = {}) {
    const { from } = opts

    const tab = this.activeTab
    const state = () => this.get(tab)
    this.setLocalStorageFromState(state())
    this.setBrowserActionStateFromAuthAndTabState()
    // Don't work off stale state, set(...) creates a copy ...
    this.popup.setBrowserAction(tab, state())
    if (from) {
      this.log(
        `reloadTabState tab=${tab}`,
        `from=${from}`,
        JSON.stringify(state(), null, 2)
      )
    }
  }

  private setBrowserActionStateFromAuthAndTabState() {
    const token = this.auth.getStoredToken()

    if (!token || !this.store.validToken) {
      this.popup.disable()
    }

    const tabId = this.activeTab

    if (tabId) {
      const tabState = this.getActiveOrDefault()

      if (Object.values(tabState.frameStates).find(f => isFrameMonetized(f))) {
        this.setIcon(tabId, 'monetized')
      }

      if (token == null) {
        this.setIcon(tabId, 'unavailable')
      } else if (token) {
        this.popup.enable()

        const tabState = this.getActiveOrDefault()
        const frameStates = Object.values(tabState.frameStates)
        const hasStream = Boolean(frameStates.find(f => isFrameMonetized(f)))
        const isStreaming: boolean =
          hasStream &&
          Boolean(
            frameStates.find(
              f =>
                isFrameStreaming(f) &&
                getFrameTotal(f) > 0 &&
                hasRecentPacket(f)
            )
          )

        if (hasStream) {
          this.setIcon(tabId, 'monetized')
          if (isStreaming) {
            const state =
              tabState.playState === 'playing'
                ? 'streaming'
                : 'streaming-paused'
            this.setIcon(tabId, state)
          }
        } else {
          this.setIcon(tabId, 'inactive')
        }
      }
    }
  }

  private setLocalStorageFromState(state: TabState) {
    const frameStates = Object.values(state.frameStates)

    state && state.coilSite
      ? this.storage.set('coilSite', state.coilSite)
      : this.storage.remove('coilSite')
    // TODO: Another valid case might be a singular adapted iframe inside a non
    // monetized top page.
    this.storage.set('adapted', Boolean(state?.frameStates[0]?.adapted))
    state && frameStates.find(f => isFrameMonetized(f))
      ? this.storage.set('monetized', true)
      : this.storage.remove('monetized')

    if (state && state.playState && state.stickyState) {
      this.store.playState = state.playState
      this.store.stickyState = state.stickyState
    } else if (state) {
      delete this.store.playState
      delete this.store.stickyState
    }

    if (this.buildConfig.extensionBuildString) {
      this.store.extensionBuildString = this.buildConfig.extensionBuildString
    }
    if (this.buildConfig.extensionPopupFooterString) {
      this.store.extensionPopupFooterString =
        this.buildConfig.extensionPopupFooterString
    }

    if (state) {
      const total = frameStates.reduce(
        (acc, val) => acc + getFrameTotal(val),
        0
      )
      this.storage.set('monetizedTotal', total)
    }
  }

  incrementTotal(frame: FrameSpec, requestId: string, incr: number) {
    const state =
      this.getFrameOrDefault(frame)[`monetization-state-${requestId}`]
    if (state != null) {
      state.total += incr
      state.lastPacket = Date.now()
    }
  }
}
