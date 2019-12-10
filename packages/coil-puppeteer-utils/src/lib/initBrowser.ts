import getPort from 'get-port'
import webExt, { RunOptions } from 'web-ext'
import puppeteerFirefox from 'puppeteer-firefox'

import * as env from './env'
import { debug } from './debug'

export interface InitBrowserOptions {
  loadExtension?: boolean
  browser?: 'chrome' | 'firefox'
}

export async function initBrowser({
  loadExtension = true,
  browser = env.BROWSER_TYPE
}: InitBrowserOptions = {}) {
  const args = []

  if (browser === 'chrome') {
    if (loadExtension) {
      args.push(`--disable-extensions-except=${env.EXTENSION_PATH}`)
    }

    if (env.IS_CI) {
      args.push('--disable-gpu')
      args.push('--disable-setuid-sandbox')
      args.push('--no-sandbox')
    }

    // TODO: not sure need to directly require(...) this
    return require('puppeteer').launch({
      headless: env.IS_CI ? false : env.HEADLESS,
      defaultViewport: {
        width: 750,
        height: 1334,
        hasTouch: true,
        isMobile: true
      },
      devtools: env.DEVTOOLS,
      slowMo: 0,
      dumpio: true,
      executablePath: env.BROWSER_PATH,
      args
    })
  } else {
    // Enable logging
    // webExt.util.logger.consoleStream.makeVerbose()
    const port = await getPort()
    const options: RunOptions = {
      firefox: puppeteerFirefox.executablePath(),
      sourceDir: env.EXTENSION_PATH,
      args: [`-juggler=${port}`]
    }
    debug('launching firefox, with options: ', options)
    await webExt.cmd.run(options, {
      shouldExitProgram: false
    })

    return puppeteerFirefox.connect({
      browserWSEndpoint: `ws://127.0.0.1:${port}`
    })
  }
}
