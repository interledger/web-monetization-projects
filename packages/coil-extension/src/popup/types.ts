import { API } from '../webpackDefines'

import { PopupState } from './services/PopupState'

export interface PopupRuntime {
  sendMessage: typeof API.runtime.sendMessage
  onMessageAddListener: typeof API.runtime.onMessage.addListener
  onMessageRemoveListener: typeof API.runtime.onMessage.removeListener
  tabOpener: (url: string) => () => void
}

export interface PopupContext {
  isExtension: boolean
  runtime: PopupRuntime
  store: PopupState
  // This default may be overridden by coilDomain in the store
  coilDomain: string
}

export interface PopupProps {
  context: PopupContext
}
