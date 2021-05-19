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

const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)

export function run() {
  const rootEl = document.getElementById('root')

  if (isExtension) {
    API.runtime.onMessage.addListener((message: ToPopupMessage) => {
      if (message.command === 'closePopup') {
        window.close()
      }
    })
    const host: PopupHost = {
      ...defaultPopupHost,
      runtime: {
        tabOpener: (url: string) => openTab.bind(null, API, url),
        sendMessage: API.runtime.sendMessage.bind(API.runtime)
      }
    }
    window.addEventListener('storage', e => {
      if (e.key === '$$popupCommand' && e.newValue) {
        const cmd: ToPopupMessage = JSON.parse(e.newValue)
        if (cmd.command === 'closePopup') {
          // window.close() itself actually causes a bad state on safari
          if (isSafari) {
            // eslint-disable-next-line no-console
            console.warn(
              'Should be running window.close(), ' +
                'but it is buggy on safari, navigator.userAgent=' +
                navigator.userAgent +
                '\n' +
                'see: ' +
                'https://github.com/coilhq/web-monetization-projects/issues/1077'
            )
          } else {
            window.close()
          }
        }
      } else {
        const event: StorageEventPartial = {
          key: e.key,
          newValue: e.newValue
        }
        host.events.emit('storage', event)
      }
    })
    ReactDOM.render(
      <IndexWithRoot storage={new StorageService()} host={host} />,
      rootEl
    )
  } else {
    const MockPopupsPage = withSharedTheme(mockPopupsPage())
    ReactDOM.render(<MockPopupsPage />, rootEl)
  }
}

run()
