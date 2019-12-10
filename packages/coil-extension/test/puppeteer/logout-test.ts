/*
  Test to ensure that streams on adapted pages are
  closed after logout.
*/

import { Page } from 'puppeteer'
import {
  debug,
  initBrowserAndLoginFromEnv,
  logoutCoil,
  testMonetization,
  TestPageResults,
  timeout
} from '@coil/puppeteer-utils'
import { MonetizationExtendedDocument } from '@web-monetization/types'

import { testUrls } from './testUrls'

async function checkMonetizationState(
  page: Page
): Promise<{ state: string; hasMonetizationMeta: boolean }> {
  await page.bringToFront()
  // TODO: monetizationstop event ;)
  await timeout(500)

  return page.evaluate(() => {
    const meta = document.head.querySelector('meta[name="monetization"]')
    return {
      state: ((document as unknown) as MonetizationExtendedDocument)
        .monetization.state,
      hasMonetizationMeta: Boolean(meta)
    }
  })
}

interface CheckConditionParameters {
  success: boolean
  failMessage?: string
  successMessage?: string
  exitOnSuccess?: boolean | true
  exit?: boolean | true
}

function checkCondition({
  success,
  failMessage = '',
  successMessage = '',
  exitOnSuccess = true,
  exit = true
}: CheckConditionParameters) {
  if (success) {
    debug(successMessage)
    if (exit && exitOnSuccess) {
      process.exit(0)
    }
  } else {
    debug(failMessage)
    if (exit) {
      process.exit(1)
    }
  }
}

async function run() {
  const { browser, page: coilPage } = await initBrowserAndLoginFromEnv()

  const pages: { [url: string]: TestPageResults } = {}
  let initSuccess = true
  for (const url of Object.keys(testUrls)) {
    debug('opening url to start monetization', url)
    const page = await testMonetization({ browser, url: testUrls[url] })
    if (!page.success) {
      debug('test page failed to open stream. page=', url)
      initSuccess = false
    } else {
      debug('test page successfully opened stream. page=', url)
    }
    pages[url] = page
  }

  checkCondition({
    success: initSuccess,
    failMessage: 'One or more test pages failed to open a payment stream.',
    exitOnSuccess: false
  })
  await logoutCoil(coilPage)

  let logoutSuccess = true
  debug('testing pages for logout')
  for (const page in pages) {
    debug('testing logout status for page=', page)
    const currentPage = pages[page].page
    const monetizationState = await checkMonetizationState(currentPage)
    debug('monetization state', monetizationState)
    if (
      monetizationState.state !== 'stopped' ||
      !monetizationState.hasMonetizationMeta
    ) {
      debug('test page failed to close stream. page=' + currentPage.url())
      logoutSuccess = false
    } else {
      debug('test page successfully closed stream. page=' + currentPage.url())
    }
  }

  checkCondition({
    success: logoutSuccess,
    failMessage: 'One or more test pages failed to close its payment stream!',
    successMessage: 'All test pages closed payment stream!'
  })
}

run().catch(console.error)
