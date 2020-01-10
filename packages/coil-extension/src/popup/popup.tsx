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

export function run() {
  const store = new PopupState(new StorageService())

  store.sync()

  const context: Omit<PopupContext, 'runtime'> = {
    isExtension,
    coilDomain: COIL_DOMAIN,
    store
  }

  const rootEl = document.getElementById('root')

  if (isExtension) {
    API.runtime.onMessage.addListener((message: ToPopupMessage) => {
      if (message.command === 'closePopup') {
        window.close()
      }
    })
    ReactDOM.render(
      <IndexWithRoot
        context={{
          ...context,
          runtime: {
            tabOpener: (url: string) => openTab.bind(null, API, url),
            onMessageRemoveListener: API.runtime.onMessage.removeListener.bind(
              API.runtime.onMessage
            ),
            sendMessage: API.runtime.sendMessage.bind(API.runtime),
            onMessageAddListener: API.runtime.onMessage.addListener.bind(
              API.runtime.onMessage
            )
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

run()
