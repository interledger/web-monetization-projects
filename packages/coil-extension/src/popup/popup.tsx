import { EventEmitter } from 'events'

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
    events: new EventEmitter(),
    isExtension,
    coilDomain: COIL_DOMAIN,
    store
  }

  const rootEl = document.getElementById('root')

  if (isExtension) {
    window.addEventListener('storage', event => {
      if (event.key !== 'monetizedTotal') {
        console.log('storage event:', event.key, event.newValue)
      }
      if (event.key === '$$popupCommand' && event.newValue) {
        const cmd: ToPopupMessage = JSON.parse(event.newValue)
        if (cmd.command === 'closePopup') {
          console.log('should be running window.close()!', navigator.userAgent)
          // window.close() actually causes a Bodgy state itself on safari
          // window.close()
        } else {
          context.events.emit('$$popupCommand', cmd)
        }
      } else {
        context.events.emit('storage', {
          type: 'storage',
          key: event.key,
          newValue: event.newValue
        })
      }
    })

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

run()
// eslint-disable-next-line no-console
console.log('popup run() finished')
