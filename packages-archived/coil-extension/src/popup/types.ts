import { EventEmitter } from 'events'

import { API } from '../webpackDefines'

export interface PopupRuntime {
  sendMessage: typeof API.runtime.sendMessage
  tabOpener: (url: string) => () => void
}

export interface PopupHost {
  key: string
  isExtension: boolean
  coilDomain: string
  events: EventEmitter
  runtime: PopupRuntime
}
