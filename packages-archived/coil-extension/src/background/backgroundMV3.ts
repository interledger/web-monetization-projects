/* eslint-disable no-console */
import { API, BUILD_CONFIG } from '../webpackDefines'
import { ChromeScripting } from '../types/chrome/chromeScripting'

import { Reloader } from './mv3/reloader'
import { BackgroundEvents } from './services/BackgroundEvents'
import { main, Environment } from './backgroundMain'

console.clear()
export const dbg = console.log.bind('ServiceWorker')
dbg('backgroundMV3.ts')

// In MV3, event listeners should be bound first thing
// Do this before async BackgroundScript object graph creation.
// This doesn't even seem to work inside main(), before getAsync(Background)
const topLevelListeners = new BackgroundEvents(API)
topLevelListeners.bindBufferingListeners()

if (BUILD_CONFIG.dev) {
  const reloader = new Reloader(chrome, console.log.bind(console, 'Reloader: '))
  reloader.connect()
}

// TODO: make a PR for @types/chrome
const scripting = API.scripting as unknown as ChromeScripting

// TODO:MV3 not working in incognito tabs: https://bugs.chromium.org/p/chromium/issues/detail?id=1363001
scripting
  .registerContentScripts([
    {
      id: 'wm-polyfill.js',
      matches: ['https://*/*', 'http://*/*'],

      js: ['wm-polyfill.js'],
      allFrames: true,
      world: 'MAIN',

      persistAcrossSessions: true,
      runAt: 'document_start'
    }
  ])
  .catch((err: Error) => {
    // The lifecycle of registered scripts can outlast that of the
    // background SW
    if (!err.message.startsWith('Duplicate script ID')) {
      console.error(err)
    }
  })

main({ env: self as Environment, topLevelListeners }).catch(console.error)
