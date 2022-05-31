// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./module.d.ts" />

import * as fs from 'fs'
import * as os from 'os'

import getPort from 'get-port'
import webExt, { RunOptions } from 'web-ext'
import { BrowserContext, default as puppeteer } from 'puppeteer'

import * as env from './env'
import { debug } from './debug'

const JUGGLER_MESSAGE = `Juggler listening on`

export interface InitBrowserOptions {
  loadExtension?: boolean
  browser?: 'chrome' | 'firefox'
}

function jugglerEndpointWatcher() {
  // Enable logging
  webExt.util.logger.consoleStream.makeVerbose()
  // Start capturing so can find the Juggler endpoint
  webExt.util.logger.consoleStream.startCapturing()

  return () => {
    // Parse firefox logs and extract juggler endpoint.
    const captured = webExt.util.logger.consoleStream.capturedMessages
    const message = captured.find(msg => msg.includes(JUGGLER_MESSAGE))
    if (!message) {
      throw new Error(`Can not find Juggler endpoint:\n ${captured.join('\n')}`)
    }
    webExt.util.logger.consoleStream.stopCapturing()
    return message.split(JUGGLER_MESSAGE)[1].trim()
  }
}

export async function initBrowser({
  loadExtension = true,
  browser = env.BROWSER_TYPE
}: InitBrowserOptions = {}): Promise<BrowserContext> {
  process.env.PUPPETEER_PRODUCT = browser

  const args = []
  const headless1 = env.IS_CI ? false : env.HEADLESS

  const viewOptions = {
    defaultViewport: {
      width: 750,
      height: 1334,
      hasTouch: true,
      isMobile: true
    }
  }

  if (browser === 'chrome') {
    if (loadExtension) {
      args.push(`--disable-extensions-except=${env.EXTENSION_PATH}`)
    }

    if (env.IS_CI) {
      args.push('--disable-gpu')
      args.push('--disable-setuid-sandbox')
      args.push('--no-sandbox')
    }

    const launched = await puppeteer.launch({
      headless: headless1,
      // chromiumSandbox: false,
      // Logout tests may fail unless using this viewport size
      devtools: env.DEVTOOLS,
      slowMo: 0,
      executablePath: env.BROWSER_PATH,
      args,
      defaultViewport: viewOptions.viewport
    })
    return launched.defaultBrowserContext()
  } else {
    const port = await getPort()
    const getJugglerEndpoint = jugglerEndpointWatcher()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const puppeteerAny = puppeteer as any
    const root: string = puppeteerAny._launcher._projectRoot
    const localFF = root + '/.local-firefox'
    const [revision] = fs.readdirSync(localFF)

    const exec =
      os.platform() === 'linux'
        ? `${localFF}/${revision}/firefox/firefox`
        : puppeteerAny.executablePath()

    const options: RunOptions = {
      firefox: exec,
      sourceDir: env.EXTENSION_PATH,
      args: [`-juggler=${port}`]
    }

    debug('launching firefox, with options: ', options)
    await webExt.cmd.run(options, {
      shouldExitProgram: false
    })

    const ff = await puppeteer.connect({
      browserWSEndpoint: getJugglerEndpoint()
    })

    return ff.defaultBrowserContext()
  }
}
