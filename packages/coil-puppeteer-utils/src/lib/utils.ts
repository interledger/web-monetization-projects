/* eslint-disable @typescript-eslint/no-explicit-any */
import { Browser, Page } from 'puppeteer'
import webExt, { RunOptions } from 'web-ext'
import puppeteerFirefox from 'puppeteer-firefox'
import getPort from 'get-port'
import debugFactory from 'debug'
import {
  MonetizationEvent,
  MonetizationExtendedDocument,
  MonetizationProgressEvent,
  MonetizationStartEvent
} from '@web-monetization/types'

import {
  AWAIT_MONETIZATION_TIMEOUT_MS,
  BROWSER_PATH,
  BROWSER_TYPE,
  COIL_DOMAIN,
  COIL_PASSWORD,
  COIL_TOKEN,
  COIL_USER,
  DEVTOOLS,
  EXTENSION_PATH,
  HEADLESS,
  IS_CI
} from './env'

export const debug = debugFactory('coil-puppeteer-utils:test')

interface InitBrowserOptions {
  loadExtension?: boolean
  browser?: 'chrome' | 'firefox'
}

export async function initBrowser({
  loadExtension = true,
  browser = BROWSER_TYPE
}: InitBrowserOptions = {}) {
  const args = []

  if (browser === 'chrome') {
    if (loadExtension) {
      args.push(`--disable-extensions-except=${EXTENSION_PATH}`)
    }

    if (IS_CI) {
      args.push('--disable-gpu')
      args.push('--disable-setuid-sandbox')
      args.push('--no-sandbox')
    }

    // TODO: not sure need to directly require(...) this
    return require('puppeteer').launch({
      headless: IS_CI ? false : HEADLESS,
      defaultViewport: {
        width: 750,
        height: 1334,
        hasTouch: true,
        isMobile: true
      },
      devtools: DEVTOOLS,
      slowMo: 0,
      dumpio: true,
      executablePath: BROWSER_PATH,
      args
    })
  } else {
    // Enable logging
    // webExt.util.logger.consoleStream.makeVerbose()
    const port = await getPort()
    const options: RunOptions = {
      firefox: puppeteerFirefox.executablePath(),
      sourceDir: EXTENSION_PATH,
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

export async function initBrowserAndLoginFromEnv(): Promise<InitCoilReturn> {
  const browser = await initBrowser()
  return initCoil({ browser, user: COIL_USER, password: COIL_PASSWORD })
}

export interface InitCoilParameters {
  browser: Browser
  user: string
  password: string
}

interface InitCoilReturn {
  browser: Browser
  page: Page
}

async function injectCoilTokenFromEnv(page: Page) {
  await page.goto(`${COIL_DOMAIN}`)
  await page.evaluate(
    (token: string) => {
      localStorage.setItem('token', token)
      window.dispatchEvent(new Event('coil_writeToken'))
    },
    [COIL_TOKEN]
  )
  await timeout(100)
}

export async function initCoil({
  browser,
  user,
  password
}: InitCoilParameters): Promise<InitCoilReturn> {
  const page = await browser.newPage()
  if (COIL_TOKEN) {
    await injectCoilTokenFromEnv(page)
    await timeout(100)
  } else {
    await page.goto(`${COIL_DOMAIN}/login`)

    const loginSelector = '[data-cy="login-email"]'
    const passwordSelector = '[data-cy="login-password"]'
    const submitSelector = '[data-cy="login-submit"]'

    await page.click(loginSelector)
    await page.keyboard.type(user)
    await page.click(passwordSelector)
    await page.keyboard.type(password)

    await page.click(submitSelector)
    await page.waitForNavigation()
  }

  return { browser, page }
}

export const timeout = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export async function logoutCoil(coilPage: Page) {
  await coilPage.bringToFront()

  const menuSelector = `img[data-cy='hamburger-toggle']`
  const logoutSelector = `[data-cy='logout']`

  try {
    await coilPage.click(menuSelector)
  } catch (err) {
    debug(
      'Failed to open hamburger menu. ' +
        'Page is likely wide enough to not render it. err=',
      err
    )
  }

  await coilPage.click(logoutSelector)

  return coilPage
}

export interface TestPageResults {
  success: boolean
  page: Page
  url: string
}

export interface TestPageParameters {
  browser: Browser
  url: string
  newPage?: boolean
}

function validateObject(obj: any, types: Record<string, string>) {
  return !Object.entries(types).some(([name, type]) => {
    return typeof obj[name] !== type
  })
}

function isValidStartEvent(details: MonetizationStartEvent['detail']) {
  return validateObject(details, {
    requestId: 'string',
    paymentPointer: 'string'
  })
}

function isValidProgressEvent(details: MonetizationProgressEvent['detail']) {
  return validateObject(details, {
    amount: 'string',
    assetCode: 'string',
    assetScale: 'number',
    requestId: 'string',
    paymentPointer: 'string'
  })
}

export async function testMonetization({
  browser,
  url,
  newPage = true
}: TestPageParameters): Promise<TestPageResults> {
  const page = newPage ? await browser.newPage() : (await browser.pages())[0]

  // Show the extension debugging
  await page.evaluateOnNewDocument(() => {
    localStorage['debug'] = 'coil-extension:*'
  })

  const monetizePromise = new Promise<boolean>(resolve => {
    let started = false
    let gotProgress = false

    void page.exposeFunction(
      'onCustomEvent',
      (e: MonetizationEvent, monetizationState: string) => {
        debug(`${e.type} fired`, e.detail || '')
        if (
          e.type === 'monetizationstart' &&
          isValidStartEvent(e.detail) &&
          monetizationState === 'started'
        ) {
          {
            started = true
          }
        } else if (
          e.type === 'monetizationprogress' &&
          isValidProgressEvent(e.detail) &&
          monetizationState === 'started'
        ) {
          if (Number(e.detail.amount) === 0) {
            // We should only get non zero packets (logging above ea event)
            resolve(false)
          } else {
            gotProgress = true
          }
        }
        if (started && gotProgress) {
          resolve(true)
        }
      }
    )
  })

  async function listenFor(type: string) {
    return page.evaluateOnNewDocument(type => {
      const setListener = () => {
        const winAny = window as any
        const docAny: MonetizationExtendedDocument = document as any
        const monetization = docAny.monetization
        if (monetization) {
          monetization.addEventListener(type, (event: any) => {
            winAny.onCustomEvent(
              { type, detail: event.detail },
              monetization.state
            )
          })
        } else {
          // Poll for document.monetization presence
          setTimeout(setListener, 16)
        }
      }
      setListener()
    }, type)
  }

  await listenFor('monetizationstart')
  await listenFor('monetizationprogress')

  await Promise.all([page.waitForNavigation(), page.goto(url)])

  // noinspection ES6MissingAwait
  const timeoutPromise = new Promise<boolean>(resolve => {
    setTimeout(resolve, AWAIT_MONETIZATION_TIMEOUT_MS, false)
  })

  const success = await Promise.race([monetizePromise, timeoutPromise])
  let state: string | null = null

  if (success) {
    state = await page.evaluate(() => (document as any).monetization.state)
  }

  debug('document.monetization.state', state)
  return { page, success: success && state === 'started', url }
}
