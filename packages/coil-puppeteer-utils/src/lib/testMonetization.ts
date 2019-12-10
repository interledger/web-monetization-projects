/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MonetizationEvent,
  MonetizationEventType,
  MonetizationExtendedDocument,
  MonetizationPendingEvent,
  MonetizationStartEvent,
  MonetizationState
} from '@web-monetization/types'
import { Browser, Page } from 'puppeteer'

import { debug } from './debug'
import {
  hasCommonRequestIdAndPaymentPointer,
  isValidPendingEvent,
  isValidProgressEvent,
  isValidStartEvent
} from './validators'
import { AWAIT_MONETIZATION_TIMEOUT_MS } from './env'

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

  let nthEvent = 0
  const statesSeen = new Set<MonetizationState>()
  const eventsSeen = new Set<MonetizationEventType>()
  let pendingEvent: MonetizationPendingEvent

  const monetizePromise = new Promise<boolean>(resolve => {
    void page.exposeFunction(
      'onCustomEvent',
      (e: MonetizationEvent, monetizationState: MonetizationState) => {
        if (nthEvent === 3) {
          return
        }
        eventsSeen.add(e.type)
        statesSeen.add(monetizationState)

        debug(`${e.type} fired`, e.detail)
        if (
          nthEvent === 0 &&
          e.type === 'monetizationpending' &&
          isValidPendingEvent(e.detail) &&
          monetizationState === 'pending'
        ) {
          pendingEvent = e
          nthEvent++
        }
        if (
          nthEvent === 1 &&
          e.type === 'monetizationstart' &&
          isValidStartEvent(e.detail) &&
          hasCommonRequestIdAndPaymentPointer(pendingEvent.detail, e.detail) &&
          monetizationState === 'started'
        ) {
          nthEvent++
        } else if (
          nthEvent === 2 &&
          e.type === 'monetizationprogress' &&
          isValidProgressEvent(e.detail) &&
          hasCommonRequestIdAndPaymentPointer(pendingEvent.detail, e.detail) &&
          monetizationState === 'started'
        ) {
          if (Number(e.detail.amount) === 0) {
            // We should only get non zero packets (logging above ea event)
            resolve(false)
          } else {
            nthEvent++
          }
        }
        if (nthEvent === 3) {
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

  await listenFor('monetizationpending')
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

  debug('seen states: %s, events: %s', statesSeen, eventsSeen)
  debug('document.monetization.state', state)
  return { page, success: success && state === 'started', url }
}
