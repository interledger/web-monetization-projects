import { API } from '../webpackDefines'
import { ChromeScripting } from '../types/chrome/chromeScripting'

import { Reloader } from './mv3/reloader'

// eslint-disable-next-line no-console
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
  .catch((err: Error) => {
    // The lifecycle of registered scripts can outlast that of the
    // background SW
    if (!err.message.startsWith('Duplicate script ID')) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  })

import './background'
