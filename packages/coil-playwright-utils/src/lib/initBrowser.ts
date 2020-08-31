import getPort from 'get-port'
import webExt, { RunOptions } from 'web-ext'
import { BrowserContext, chromium, firefox } from 'playwright'

import * as env from './env'
import { debug } from './debug'

export interface InitBrowserOptions {
  loadExtension?: boolean
  browser?: 'chrome' | 'firefox'
}

export async function initBrowser({
  loadExtension = true,
  browser = env.BROWSER_TYPE
}: InitBrowserOptions = {}): Promise<BrowserContext> {
  const args = []
  const headless1 = env.IS_CI ? false : env.HEADLESS

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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return chromium.launchPersistentContext(
      '/Users/nicholasdudfield/projects/web-monetization/packages/coil-extension/tmp',
      {
        headless: headless1,
        chromiumSandbox: false,
        // TODO:pw
        // defaultViewport: {
        //   width: 750,
        //   height: 1334,
        //   hasTouch: true,
        //   isMobile: true
        // },
        devtools: env.DEVTOOLS,
        slowMo: 0,
        // TODO:pw
        // dumpio: true,
        executablePath: env.BROWSER_PATH,
        args
      }
    )
  } else {
    // const ff1 = await firefox.launch({headless: headless1})
    // return ff1.newContext()

    // Enable logging
    webExt.util.logger.consoleStream.makeVerbose()
    webExt.util.logger.consoleStream.startCapturing()

    const port = await getPort()
    const options: RunOptions = {
      firefox: firefox.executablePath(),
      sourceDir: env.EXTENSION_PATH,
      args: [`-juggler=${port}`]
    }

    debug('launching firefox, with options: ', options)
    await webExt.cmd.run(options, {
      shouldExitProgram: false
    })

    // 3. Parse firefox logs and extract juggler endpoint.
    const JUGGLER_MESSAGE = `Juggler listening on`
    const message = webExt.util.logger.consoleStream.capturedMessages.find(
      msg => msg.includes(JUGGLER_MESSAGE)
    )
    // webExt.util.logger.consoleStream.capturedMessages.forEach(debug)
    webExt.util.logger.consoleStream.stopCapturing()

    if (!message) {
      throw new Error()
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const wsEndpoint = message.split(JUGGLER_MESSAGE).pop()!.trim()

    console.log({ wsEndpoint })

    const ff = await firefox.connect({
      wsEndpoint
    })

    return ff.newContext()
  }
}
