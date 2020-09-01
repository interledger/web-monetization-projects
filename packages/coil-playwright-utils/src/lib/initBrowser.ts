import getPort from 'get-port'
import webExt, { RunOptions } from 'web-ext'
import { BrowserContext, chromium, firefox } from 'playwright'
import * as tmp from 'tmp'

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

    const dirResult = tmp.dirSync()
    process.on('beforeExit', dirResult.removeCallback)
    return chromium.launchPersistentContext(
      // TODO: clean up on process exit
      dirResult.name,
      {
        headless: headless1,
        chromiumSandbox: false,
        // TODO:pw
        viewport: {
          width: 750,
          height: 1334
        },
        hasTouch: true,
        isMobile: true,
        devtools: env.DEVTOOLS,
        slowMo: 0,
        // https://github.com/microsoft/playwright/issues/1959
        // TODO: convert puppeteer dumpio flag
        // https://github.com/microsoft/playwright/issues/1959#issuecomment-619069349
        // DEBUG=pw:browser* node test.js
        logger: {
          isEnabled(
            name: string,
            severity: 'verbose' | 'info' | 'warning' | 'error'
          ): boolean {
            return false
          },
          log(
            name: string,
            severity: 'verbose' | 'info' | 'warning' | 'error',
            message: string | Error,
            args: Array<Object>,
            hints
          ) {
            //
          }
        },
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
