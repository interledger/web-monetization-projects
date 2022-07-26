import { API } from '../webpackDefines'
import { ChromeScripting } from '../types/chrome/chromeScripting'

import { Reloader } from './mv3/reloader'

export const dbg = console.log.bind('ServiceWorker')
dbg('backgroundMV3.ts')
dbg('typeof self.localStorage', self.localStorage)

const reloader = new Reloader(chrome, console.log.bind(console, 'Reloader: '))
reloader.connect()

const scripting = API.scripting as unknown as ChromeScripting

scripting
  .registerContentScripts([
    {
      matches: ['https://*/*', 'http://*/*'],
      id: 'wm-polyfill.js',
      world: 'MAIN',
      js: ['wm-polyfill.js'],
      runAt: 'document_start'
    }
  ])
  // eslint-disable-next-line no-console
  .catch(console.error)

import './background'
