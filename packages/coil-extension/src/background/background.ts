// import '@abraham/reflection'
// import { Container } from 'inversify'
// import { GraphQlClient } from '@coil/client'
export const dbg = console.log

const bgPage = Math.random()

dbg('background page ok26')

const ws = new WebSocket('ws://localhost:4444')
ws.addEventListener('message', message => {
  dbg('got a message')
  const parsed = JSON.parse(message.data)
  chrome.runtime.reload()
})

setInterval(() => {
  console.log('interval from bg page', bgPage)
}, 5e3)

// import { makeLoggerMiddleware } from 'inversify-logger-middleware'
//
// import { API, BUILD_CONFIG, COIL_DOMAIN, VERSION } from '../webpackDefines'
// import { StorageService } from '../services/storage'
// import * as tokens from '../types/tokens'
// import { ClientOptions } from '../services/ClientOptions'
// import { decorateThirdPartyClasses } from '../services/decorateThirdPartyClasses'
// import { loggingEnabled } from '../util/isLoggingEnabled'
//
// import { BackgroundScript } from './services/BackgroundScript'
// import { BackgroundStorageService } from './services/BackgroundStorageService'
// import { Stream } from './services/Stream'
// import { createLogger } from './services/utils'
//
// async function configureContainer(container: Container) {
//   if (loggingEnabled) {
//     const logger = makeLoggerMiddleware()
//     container.applyMiddleware(logger)
//   }
//
//   container.bind(tokens.CoilDomain).toConstantValue(COIL_DOMAIN)
//   container.bind(tokens.UserAgent).toConstantValue(navigator.userAgent)
//   container.bind(tokens.WextApi).toConstantValue(API)
//   container.bind(tokens.BuildConfig).toConstantValue(BUILD_CONFIG)
//   container.bind(tokens.LoggingEnabled).toConstantValue(loggingEnabled)
//   container.bind(GraphQlClient.Options).to(ClientOptions)
//   container.bind(Storage).toConstantValue({})
//   container.bind(StorageService).to(BackgroundStorageService)
//   container.bind(Container).toConstantValue(container)
//
//   container.bind(Stream).toSelf().inTransientScope()
//
//   container
//     .bind(tokens.NoContextLoggerName)
//     .toConstantValue('tokens.NoContextLoggerName')
//
//   container.bind(tokens.Logger).toDynamicValue(createLogger).inTransientScope()
//
//   container.bind(tokens.LocalStorageProxy).toDynamicValue(context => {
//     return context.container.get(StorageService).makeProxy(['token'])
//   })
// }
//
// declare global {
//   interface Window {
//     bg: BackgroundScript
//     clearTokens: () => void
//     clearPopupRouteState: () => void
//   }
// }
//
// function prefixClearer(prefix: string) {
//   return () => {
//     for (let i = 0; i < localStorage.length; i++) {
//       const key = localStorage.key(i)
//       if (key?.startsWith(prefix)) {
//         console.log('deleting', key)
//         localStorage.removeItem(key)
//       }
//     }
//   }
// }
//
// window.clearPopupRouteState = prefixClearer('popup-route:')
// window.clearTokens = prefixClearer('anonymous_token:')
//
// async function main() {
//   if (loggingEnabled) {
//     console.log('Loading Coil extension:', JSON.stringify(VERSION))
//   }
//   decorateThirdPartyClasses()
//
//   const container = new Container({
//     defaultScope: 'Singleton',
//     autoBindInjectable: true
//   })
//
//   await configureContainer(container)
//   window.bg = container.get(BackgroundScript)
//   void window.bg.run()
// }
//
// main().catch(console.error)
