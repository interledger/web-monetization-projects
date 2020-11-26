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
let runs = 0

export function run() {
  console.log('localStorage == null', localStorage == null)
  if (localStorage == null && runs < 10) {
    runs++
    chrome.runtime.getBackgroundPage(w => {
      if (w) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).localStorage = w.localStorage
        console.log('w.localStorage == null', w.localStorage == null)
        run()
      } else {
        console.log('wtf')
      }
    })
    return
  }

  const dummy = {
    getItem(key: string): string | null {
      return null
    },
    setItem(key: string, value: string) {},
    clear() {},
    removeItem(key: string) {}
  }
  const store = new PopupState(new StorageService())
  store.sync()

  const context: Omit<PopupContext, 'runtime'> = {
    isExtension,
    coilDomain: COIL_DOMAIN,
    store
  }

  const rootEl = document.getElementById('root')
  const dummyFunction: any = () => null

  if (isExtension) {
    const listener = (message: ToPopupMessage) => {
      // console.log('message received on port', message)
      if (message.command === 'closePopup') {
        window.close()
      }
    }

    const port = chrome.runtime.connect()
    port.onDisconnect.addListener(() => {
      console.log('port disconnected!')
    })
    port.onMessage.addListener(listener)
    ReactDOM.render(
      <IndexWithRoot
        context={{
          ...context,
          runtime: {
            tabOpener: (url: string) => openTab.bind(null, API, url),
            // onMessageRemoveListener:
            // // dummyFunction,
            //   port.onMessage.removeListener.bind(port.onMessage) as any,
            sendMessage:
              // dummyFunction,
              port.postMessage.bind(port)
            // onMessageAddListener:
            // // dummyFunction,
            //   port.onMessage.addListener.bind(port.onMessage) as any
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

console.log('popup loaded')
let n = 0
setInterval(() => {
  n++
  if (localStorage == null) {
    console.log(n, 'localStorage == null', localStorage == null, Date.now())
  }
}, 100)
