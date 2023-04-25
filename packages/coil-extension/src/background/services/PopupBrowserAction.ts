import { inject, injectable } from 'inversify'

import { TabState } from '../../types/TabState'
import * as tokens from '../../types/tokens'
import type { BuildConfig } from '../../types/BuildConfig'

import { TabOpener } from './TabOpener'
import { PopupIconService } from './PopupIconService'

type Action = (tab: chrome.tabs.Tab) => void

@injectable()
export class PopupBrowserAction {
  private readonly openLogin: () => void
  private disabled = false
  private ignoreDefaultToggling = false
  private action: Action | null = null

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
            // eslint-disable-next-line no-console
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
      actionApi.setIcon(args)
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
