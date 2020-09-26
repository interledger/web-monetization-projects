import getPort from 'get-port'
import webExt, { RunOptions } from 'web-ext'
import { BrowserContext, chromium, firefox } from 'playwright'
import * as tmp from 'tmp'

import * as env from './env'
import { debug } from './debug'
import { EXTENSION_PATH } from './env'
import { RemoteFirefox } from './RemoteFirefox'

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
    const message = webExt.util.logger.consoleStream.capturedMessages.find(
      msg => msg.includes(JUGGLER_MESSAGE)
    )
    if (!message) {
      throw new Error(`Can not find Juggler endpoint`)
    }
    webExt.util.logger.consoleStream.stopCapturing()
    return message.split(JUGGLER_MESSAGE)[1].trim()
  }
}

export async function initBrowser({
  loadExtension = true,
  browser = env.BROWSER_TYPE
}: InitBrowserOptions = {}): Promise<BrowserContext> {
  const args = []
  const headless1 = env.IS_CI ? false : env.HEADLESS

  const viewOptions = {
    viewport: {
      width: 750,
      height: 1334
    },
    hasTouch: true,
    isMobile: true
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

    const dirResult = tmp.dirSync()
    process.on('beforeExit', dirResult.removeCallback)
    return chromium.launchPersistentContext(dirResult.name, {
      headless: headless1,
      chromiumSandbox: false,
      // Logout tests may fail unless using this viewport size
      devtools: env.DEVTOOLS,
      slowMo: 0,
      executablePath: env.BROWSER_PATH,
      args,
      ...viewOptions
    })
  } else {
    // firefox -no-remote -wait-for-browser -foreground -profile /var/folders/wq/0t68fgjn491cxqphq1pg7ht00000gn/T/playwright_firefoxdev_profile-IKUofH -juggler 0 -silent

    const port = await getPort()
    const ff = await firefox.launch({
      headless: false,
      args: [`--start-debugger-server=${port}`]
    })
    const context = ff.newContext({ viewport: viewOptions.viewport })

    console.log(port)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const client = await require('@cliqz-oss/node-firefox-connect')(port)
    const remote = new RemoteFirefox(client)
    console.log(client)
    debug(await remote.installTemporaryAddon(EXTENSION_PATH))
    return context

    // const port = await getPort()
    // const getJugglerEndpoint = jugglerEndpointWatcher()
    // const options: RunOptions = {
    //   firefox: firefox.executablePath(),
    //   sourceDir: env.EXTENSION_PATH,
    //   args: [`-juggler=0`, '-silent', '-no-remote', '-wait-for-browser', '-foreground']
    // }
    //
    // debug('launching firefox, with options: ', options)
    // await webExt.cmd.run(options, {
    //   shouldExitProgram: false
    // })
    //
    // const ff = await firefox.connect({
    //   wsEndpoint: getJugglerEndpoint()
    // })
    //
    // return ff.newContext({ viewport: viewOptions.viewport })
  }
}
