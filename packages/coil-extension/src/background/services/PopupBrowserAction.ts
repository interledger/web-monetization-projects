import { inject, injectable } from 'inversify'

import { TabState } from '../../types/TabState'
import * as tokens from '../../types/tokens'
import { Colors } from '../consts/Colors'
import { Icons } from '../consts/Icons'

import { TabOpener } from './TabOpener'
import { Config } from './Config'

type Action = (tab: chrome.tabs.Tab) => void

@injectable()
export class PopupBrowserAction {
  private readonly openLogin: () => void
  private disabled = false
  private ignoreDefaultToggling = false
  private action: Action | null = null

  constructor(
    private tabOpener: TabOpener,
    @inject(tokens.Config) private config: Config,
    @inject(tokens.WextApi) private api: typeof window.chrome
  ) {
    this.openLogin = () =>
      this.tabOpener.open(`${this.config.coilDomain}/login`)
    // disable popup if on android
    this.api.runtime.getPlatformInfo(result => {
      if (result.os === 'android') {
        this.api.browserAction.setPopup({
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
  }

  enable() {
    if (this.ignoreDefaultToggling) {
      return
    }
    this.clearAction()
    const api = this.api

    api.browserAction.setPopup({
      popup: api.runtime.getURL('/static/popup.html')
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

  setBrowserAction(tabId: number, state: TabState) {
    // In some strange cases on android these are not set
    const api = this.api

    if (api.browserAction.setIcon) {
      api.browserAction.setIcon({
        tabId,
        path: (state && state.icon && state.icon.path) || Icons.Inactive
      })
    }

    if (api.browserAction.setBadgeText) {
      api.browserAction.setBadgeText({
        tabId,
        text: (state && state.badge && state.badge.text) || ''
      })
    }

    if (api.browserAction.setBadgeBackgroundColor) {
      api.browserAction.setBadgeBackgroundColor({
        tabId,
        color: (state && state.badge && state.badge.color) || Colors.White
      })
    }
  }

  private setAction(action: Action) {
    this.clearAction()
    const api = this.api
    api.browserAction.setPopup({
      popup: ''
    })
    api.browserAction.onClicked.addListener(action)
    this.action = action
  }

  private clearAction() {
    if (this.action) {
      this.api.browserAction.onClicked.removeListener(this.action)
    }
  }
}
