import { API } from '../webpackDefines'

import { PopupStateType } from './services/PopupState'

export interface PopupRuntime {
  sendMessage: typeof API.runtime.sendMessage
  onMessageAddListener: typeof API.runtime.onMessage.addListener
  onMessageRemoveListener: typeof API.runtime.onMessage.removeListener
  tabOpener: (url: string) => () => void
}

export interface PopupContext {
  isExtension: boolean
  runtime: PopupRuntime
  state: PopupStateType
  coilDomain: string
}

export interface PopupProps {
  context: PopupContext
}
