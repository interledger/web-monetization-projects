import '@abraham/reflection'
import { Container } from 'inversify'
import { TokenStore } from '@coil/anonymous-tokens'

import { API, BUILD_CONFIG, COIL_DOMAIN, VERSION } from '../webpackDefines'
import { decorateThirdPartyClassesForInjection } from '../services/decorateThirdPartyClassesForInjection'
import { isLoggingEnabled } from '../util/isLoggingEnabled'
import * as tokens from '../types/tokens'
import { StoreProxy } from '../types/storage'

import { BackgroundScript } from './services/BackgroundScript'
import { BackgroundStoreService } from './services/BackgroundStoreService'
import { configureContainer } from './di/configureContainer'
import { BackgroundEvents } from './services/BackgroundEvents'

/**
 * We patch the window/self object so can access objects and utils from the
 * devtools console.
 */
interface Environment {
  bg?: BackgroundScript
  store?: StoreProxy
  clearTokens?: () => void
  clearPopupRouteState?: () => void
  topLevelListeners?: BackgroundEvents
}

async function main(env: Environment) {
  const loggingEnabled = await isLoggingEnabled(BUILD_CONFIG)
  if (loggingEnabled) {
    // eslint-disable-next-line no-console
    console.log('Loading Coil extension:', JSON.stringify(VERSION))
  }
  decorateThirdPartyClassesForInjection()

  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })

  container
    .bind(BackgroundEvents)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .toConstantValue(env.topLevelListeners ?? new BackgroundEvents(API))

  await configureContainer({
    container: container,
    loggingEnabled,
    coilDomain: COIL_DOMAIN,
    wextApi: API,
    buildConfig: BUILD_CONFIG,
    getActiveTab: async () => {
      // This query will not pick up dev tools tabs which may be currently
      // active, so we need to query for other active tabs in that case
      // and select the first.
      // It's possible that this may also result in an empty response set,
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
  env.bg = await container.getAsync(BackgroundScript)
  env.store = await container.getAsync(tokens.StoreProxy)
  env.clearTokens = () => {
    const store = container.get<TokenStore>(tokens.TokenStore)
    store.clear()
  }
  env.clearPopupRouteState = async () => {
    const service = await container.getAsync(BackgroundStoreService)
    const keys = service.keys()
    for (const key of keys) {
      if (key.startsWith('popup-route:')) {
        service.remove(key)
      }
    }
  }
  // noinspection ES6MissingAwait
  void env.bg.run()
}

// eslint-disable-next-line no-console
main(self as Environment).catch(console.error)
