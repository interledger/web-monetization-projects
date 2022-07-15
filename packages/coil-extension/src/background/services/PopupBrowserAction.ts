import { inject, injectable } from 'inversify'

import { TabState } from '../../types/TabState'
import * as tokens from '../../types/tokens'
import { BuildConfig } from '../../types/BuildConfig'

import { TabOpener } from './TabOpener'
import { PopupIconService } from './PopupIconService'

type TabIconDetails = chrome.browserAction.TabIconDetails

type Action = (tab: chrome.tabs.Tab) => void

@injectable()
export class PopupBrowserAction {
  private readonly openLogin: () => void
  private disabled = false
  private ignoreDefaultToggling = false
  private action: Action | null = null
  // Just cache the last call, including the tab id, rather than a map of
  // {$tabId: $path} which would require bookkeeping. This does "enough"
  private lastSetIconCallArgs: TabIconDetails & { calls: number } = { calls: 0 }

  constructor(
    private tabOpener: TabOpener,
    @inject(tokens.LoggingEnabled)
    private loggingEnabled: boolean,
    private icons: PopupIconService,
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    @inject(tokens.UserAgent) private userAgent: string,
    @inject(tokens.CoilDomain) private coilDomain: string,
    @inject(tokens.WextApi) private api: typeof chrome
  ) {
    this.openLogin = this.tabOpener.opener(`${this.coilDomain}/auth/login`)
    // disable popup if on android
    try {
      this.api.runtime.getPlatformInfo(result => {
        if (this.api.runtime.lastError) {
          if (this.loggingEnabled) {
            console.error(this.api.runtime.lastError)
          }
        }

        if (
          result?.os === 'android' &&
          !this.userAgent.includes('SamsungBrowser')
        ) {
          this.actionApi().setPopup({
            // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426484
            // Setting the popup to empty string which should allow onClicked
            // handlers to work is buggy on android firefox.
            // We work around this by setting a particular popup for android
            // which only uses chrome.tabs.create({url: 'coil.com/settings})
            popup: this.api.runtime.getURL('static/popupAndroid.html')
          })
          this.ignoreDefaultToggling = true
        }
      })
    } catch (e) {
      if (this.loggingEnabled) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    }
  }

  enable() {
    if (this.ignoreDefaultToggling) {
      return
    }
    this.clearAction()
    this.actionApi().setPopup({
      popup: this.api.runtime.getURL('/static/popup.html')
    })
    this.disabled = false
  }

  disable() {
    if (this.ignoreDefaultToggling || this.disabled) {
      return
    }
    this.setAction(this.openLogin)
    this.disabled = true
  }

  setDefaultInactive() {
    const actionApi = this.actionApi()
    if (actionApi) {
      actionApi.setIcon({
        path: this.icons.forTabState({ iconPrimary: 'inactive' })
      })
      const now = new Date()
      const nextMidnight = new Date()
      nextMidnight.setHours(24, 0, 0, 0)
      const msToNextMidnight = nextMidnight.getTime() - now.getTime()
      const andChange = 10
      setTimeout(() => {
        this.setDefaultInactive()
      }, msToNextMidnight + andChange)
    }
  }

  setBrowserAction(tabId: number, state: TabState) {
    const actionApi = this.actionApi()

    if (actionApi.setIcon) {
      const path = this.icons.forTabState(state)
      const args = {
        tabId,
        path: path
      }
      const changed =
        this.lastSetIconCallArgs.path !== args.path ||
        this.lastSetIconCallArgs.tabId !== args.tabId
      if (changed) {
        // Reset number of calls
        this.lastSetIconCallArgs.calls = 0
      }
      // It seems in some cases that are hard to determine, setIcon calls are
      // ignored, so the manifest declared default icon is seen instead.
      // Stop calling after the 10th call with the same tabId/path so the
      // network tab of devtools isn't littered with (*unworkable* amounts of)
      // related entries.
      if (changed || this.lastSetIconCallArgs.calls <= 10) {
        actionApi.setIcon(args)
        // We must ++prefix increment because we are copying
        this.lastSetIconCallArgs = {
          ...args,
          calls: ++this.lastSetIconCallArgs.calls
        }
      }
    }
  }

  private setAction(action: Action) {
    this.clearAction()
    const actionApi = this.actionApi()

    actionApi.setPopup({
      popup: ''
    })
    actionApi.onClicked.addListener(action)
    this.action = action
  }

  private actionApi() {
    const api = this.api
    return api.browserAction ?? api.action
  }

  private clearAction() {
    if (this.action) {
      this.actionApi().onClicked.removeListener(this.action)
    }
  }
}
