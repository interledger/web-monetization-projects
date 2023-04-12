/*
  Test to ensure that streams on adapted pages are
  closed after logout.
*/

import { Page } from 'puppeteer'
import {
  debug,
  env,
  initBrowserAndLoginFromEnv,
  isValidStopEvent,
  logoutCoil,
  testMonetization,
  TestPageResults,
  timeout
} from '@coil/puppeteer-utils'
import { MonetizationExtendedDocument } from '@webmonetization/types'

import { testUrls } from './testUrls'

async function checkMonetizationState(
  page: Page
): Promise<{ state: string; hasMonetizationMeta: boolean }> {
  // TODO: monetizationstop event ;)
  await timeout(500)

  return page.evaluate(() => {
    const meta = document.head.querySelector('meta[name="monetization"]')
    return {
      state: (document as unknown as MonetizationExtendedDocument).monetization
        .state,
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
  const { context, page: coilPage } = await initBrowserAndLoginFromEnv()
  // // TODO: need wait here for auth ?
  await timeout(3e3)

  const results: Record<string, TestPageResults> = {}
  let initSuccess = true
  const urls = testUrls[env.COIL_DOMAIN]
  for (const site of Object.keys(urls)) {
    debug('opening url to start monetization', site)
    const result = await testMonetization({
      listenStopped: true,
      context,
      url: urls[site]
    })
    debug('result.details =' + JSON.stringify(result.details))
    if (!result.success) {
      debug('test page failed to open stream. page=', site)
      initSuccess = false
    } else {
      debug('test page successfully opened stream. page=', site)
    }
    results[site] = result
  }

  checkCondition({
    success: initSuccess,
    failMessage: 'One or more test pages failed to open a payment stream.',
    exitOnSuccess: false
  })
  await timeout(2000)
  await logoutCoil(coilPage)
  let logoutSuccess = true
  debug('testing pages for logout')
  for (const page of Object.keys(results)) {
    debug('testing logout status for page=', page)
    const result = results[page]
    const currentPage = result.page
    const stopped = await result.stoppedPromise
    debug('stopped event', JSON.stringify(stopped))
    const monetizationState = await checkMonetizationState(currentPage)

    debug('monetization state', monetizationState)
    // TODO: proper assertions/error messages
    // this sucks, but at least all this is logged
    if (
      monetizationState.state !== 'stopped' ||
      !monetizationState.hasMonetizationMeta ||
      !isValidStopEvent(stopped.event.detail) ||
      // we just logged out but we still have a meta tag so finalized should
      // not be emitted
      stopped.event.detail.finalized ||
      stopped.state !== 'stopped'
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
