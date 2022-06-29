import '@abraham/reflection'
import { Container } from 'inversify'

import { API, BUILD_CONFIG, COIL_DOMAIN, VERSION } from '../webpackDefines'
import { decorateThirdPartyClasses } from '../services/decorateThirdPartyClasses'
import { isLoggingEnabled } from '../util/isLoggingEnabled'

import { BackgroundScript } from './services/BackgroundScript'
import { configureContainer } from './di/configureContainer'
import { IDBTokenStore } from './services/AnonymousTokens'

declare global {
  interface Window {
    bg: BackgroundScript
    clearTokens: () => void
    clearPopupRouteState: () => void
  }
}

function prefixClearer(prefix: string) {
  return () => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key?.startsWith(prefix)) {
        console.log('deleting', key)
        localStorage.removeItem(key)
      }
    }
  }
}

window.clearPopupRouteState = prefixClearer('popup-route:')
window.clearTokens = () => {
  void IDBTokenStore.clear()
}

async function main() {
  const loggingEnabled = await isLoggingEnabled(BUILD_CONFIG)
  if (loggingEnabled) {
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
    storage: localStorage,
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
  void window.bg.run()
}

main().catch(console.error)
