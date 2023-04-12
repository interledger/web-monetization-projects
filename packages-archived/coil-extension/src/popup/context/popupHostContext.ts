import { EventEmitter } from 'events'

import React, { useContext } from 'react'

import { PopupHost } from '../types'
import { API, COIL_DOMAIN } from '../../webpackDefines'

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
const unimpl = (..._: any[]): any => {
  throw new Error('unimplemented')
}

export const defaultPopupHost: PopupHost = {
  key: 'default',
  events: new EventEmitter(),
  coilDomain: COIL_DOMAIN,
  isExtension: Boolean(API?.runtime?.id),
  runtime: {
    sendMessage: unimpl,
    tabOpener: unimpl
  }
}
export const PopupHostContext = React.createContext<PopupHost>(defaultPopupHost)

export const useHost = () => {
  return useContext(PopupHostContext)
}
