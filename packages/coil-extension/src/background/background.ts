import '@abraham/reflection'
import { Container } from 'inversify'
import { TokenStore } from '@coil/anonymous-tokens'

import { API, BUILD_CONFIG, COIL_DOMAIN, VERSION } from '../webpackDefines'
import { decorateThirdPartyClasses } from '../services/decorateThirdPartyClasses'
import { isLoggingEnabled } from '../util/isLoggingEnabled'
import * as tokens from '../types/tokens'
import { StorageProxy } from '../types/storage'
import { StorageService } from '../services/storage'

import { BackgroundScript } from './services/BackgroundScript'
import { configureContainer } from './di/configureContainer'
import {
  BackgroundStorageService,
  IDBPersistence
} from './services/BackgroundStorageService'

declare global {
  interface Window {
    bg: BackgroundScript
    store: StorageProxy
    clearTokens: () => void
    clearPopupRouteState: () => void
  }
}

async function main() {
  const loggingEnabled = await isLoggingEnabled(BUILD_CONFIG)
  if (loggingEnabled) {
    // eslint-disable-next-line no-console
    console.log('Loading Coil extension:', JSON.stringify(VERSION))
  }
  decorateThirdPartyClasses()

  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })

  await configureContainer({
    container: container,
    loggingEnabled,
    coilDomain: COIL_DOMAIN,
    wextApi: API,
    buildConfig: BUILD_CONFIG,
    // TODO: In MV3 all listeners must be bound at the top level
    getActiveTab: async () => {
      // This query will not pick up dev tools tabs which may be currently active
      // so, we need to query for other active tabs in that case and select the
      // first. It's possible that this may also result in an empty response set,
      // however hopefully this state will be very transient.
      for (const currentWindow of [true, false]) {
        const tabs = await new Promise<chrome.tabs.Tab[]>(resolve => {
          chrome.tabs.query({ active: true, currentWindow }, tabs => {
            resolve(tabs)
          })
        })
        if (tabs.length) {
          return tabs[0].id
        }
      }
    }
  })

  window.bg = await container.getAsync(BackgroundScript)
  window.store = await container.getAsync(tokens.StorageProxy)
  window.clearTokens = () => {
    const store = container.get<TokenStore>(tokens.TokenStore)
    store.clear()
  }
  window.clearPopupRouteState = async () => {
    const service = await container.getAsync(BackgroundStorageService)
    const keys = service.keys()
    for (const key of keys) {
      if (key.startsWith('popup-route:')) {
        service.remove('popup-route:')
      }
    }
  }
  // noinspection ES6MissingAwait
  void window.bg.run()
}

// eslint-disable-next-line no-console
main().catch(console.error)
