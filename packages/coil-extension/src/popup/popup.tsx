import ReactDOM from 'react-dom'
import React from 'react'

import { openTab } from '../util/openTab'
import { API, COIL_DOMAIN } from '../webpackDefines'
import { StorageService } from '../services/storage'
import { ToPopupMessage } from '../types/commands'
import { withSharedTheme } from '../shared-theme/withSharedTheme'

import { PopupState } from './services/PopupState'
import { PopupContext } from './types'
import { isExtension, mockPopupsPage } from './mocks/loadMockedStates'
import { Index } from './Index'

const IndexWithRoot = withSharedTheme(Index)

export function run(bgPageWindow: Window | undefined) {
  console.log('have bgPageWindow', !!bgPageWindow)
  const store = new PopupState(new StorageService())
  store.sync()

  const context: Omit<PopupContext, 'runtime'> = {
    isExtension,
    coilDomain: COIL_DOMAIN,
    store
  }

  const rootEl = document.getElementById('root')

  if (isExtension) {
    // TODO: how can we listen for this ?
    // Can we get a handle on the bg window (and objects) without any
    // grief ?
    // Some kind of hacky localStorage abuse ?
    const listener = (message: ToPopupMessage) => {
      // console.log('message received on port', message)
      if (message.command === 'closePopup') {
        window.close()
      }
    }

    ReactDOM.render(
      <IndexWithRoot
        context={{
          ...context,
          runtime: {
            tabOpener: (url: string) => openTab.bind(null, API, url),
            sendMessage: API.runtime.sendMessage.bind(API.runtime)
          }
        }}
      />,
      rootEl
    )
  } else {
    const MockPopupsPage = withSharedTheme(
      mockPopupsPage(IndexWithRoot, context)
    )

    ReactDOM.render(<MockPopupsPage />, rootEl)
  }
}

chrome.runtime.getBackgroundPage(window => {
  run(window)
  console.log('popup run() finished')
})

// eslint-disable-next-line no-console
