import ReactDOM from 'react-dom'
import React from 'react'
import { StorePersistence } from '@webmonetization/wext/services'

import { API } from '../webpackDefines'
import { StoreService } from '../services/storage'
import { ToPopupMessage } from '../types/commands'
import { withSharedTheme } from '../shared-theme/withSharedTheme'
import { openTab } from '../util/openTab'

import { isExtension, mockPopupsPage } from './mocks/loadMockedStates'
import { defaultPopupHost } from './context/popupHostContext'
import { PopupHost } from './types'
import { IndexWithRoot } from './Index'

export function run() {
  const rootEl = document.getElementById('root')

  if (isExtension) {
    const backgroundStore: StorePersistence = {
      cache: new Map(),
      clear(): void {
        // noop, method never called popup side
      },
      removeItem(key: string): void {
        API.runtime.sendMessage({ command: 'storeRemoveItem', data: { key } })
      },
      setItem(key: string, value): void {
        API.runtime.sendMessage({
          command: 'storeSetItem',
          data: { key, value }
        })
      }
    }

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
        if (message.data.value) {
          backgroundStore.cache.set(message.data.key, message.data.value)
        } else {
          backgroundStore.cache.delete(message.data.key)
        }
        host.events.emit('storeUpdate', message.data)
      }
    })

    API.runtime.sendMessage(
      {
        command: 'storeGetItems'
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      },
      (val: { items: Record<string, any> }) => {
        backgroundStore.cache = new Map(Object.entries(val.items))

        ReactDOM.render(
          <IndexWithRoot
            storage={new StoreService(backgroundStore)}
            host={host}
          />,
          rootEl
        )
      }
    )
  } else {
    const MockPopupsPage = withSharedTheme(mockPopupsPage())
    ReactDOM.render(<MockPopupsPage />, rootEl)
  }
}

run()
