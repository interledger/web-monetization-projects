import { API } from '../webpackDefines'

import { PopupState } from './services/PopupState'

export interface PopupRuntime {
  sendMessage: typeof API.runtime.sendMessage
  tabOpener: (url: string) => () => void
}

export interface PopupContext {
  isExtension: boolean
  runtime: PopupRuntime
  store: PopupState
  coilDomain: string
}

export interface PopupProps {
  context: PopupContext
}
