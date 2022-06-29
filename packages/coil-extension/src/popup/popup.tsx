import ReactDOM from 'react-dom'
import React from 'react'

import { API } from '../webpackDefines'
import { StorageService } from '../services/storage'
import { ToPopupMessage } from '../types/commands'
import { withSharedTheme } from '../shared-theme/withSharedTheme'
import { openTab } from '../util/openTab'

import { isExtension, mockPopupsPage } from './mocks/loadMockedStates'
import { defaultPopupHost } from './context/popupHostContext'
import { PopupHost } from './types'
import { StorageEventPartial } from './context/storeContext'
import { IndexWithRoot } from './Index'

export function run() {
  const rootEl = document.getElementById('root')

  if (isExtension) {
    const host: PopupHost = {
      ...defaultPopupHost,
      runtime: {
        tabOpener: (url: string) => openTab.bind(null, API, url),
        sendMessage: API.runtime.sendMessage.bind(API.runtime)
      }
    }
    API.runtime.onMessage.addListener((message: ToPopupMessage) => {
      if (message.command === 'closePopup') {
        window.close()
      } else if (message.command === 'storeUpdate') {
        const event: StorageEventPartial = {
          key: message.data.key,
          newValue: message.data.value
        }
        host.events.emit('storage', event)
      }
    })
    ReactDOM.render(
      <IndexWithRoot storage={new StorageService(localStorage)} host={host} />,
      rootEl
    )
  } else {
    const MockPopupsPage = withSharedTheme(mockPopupsPage())
    ReactDOM.render(<MockPopupsPage />, rootEl)
  }
}

run()
