/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  MonetizationEvent,
  MonetizationEventType,
  MonetizationExtendedDocument,
  MonetizationPendingEvent,
  MonetizationState,
  MonetizationStopEvent
} from '@webmonetization/types'
import { BrowserContext, Page } from 'puppeteer'

import { env, timeout } from '../index'

import { debug } from './debug'
import {
  hasCommonRequestIdAndPaymentPointer,
  isValidPendingEvent,
  isValidProgressEvent,
  isValidStartEvent
} from './validators'
import { AWAIT_MONETIZATION_TIMEOUT_MS } from './env'

export interface OnMonetizationEvent {
  event: MonetizationStopEvent
  state: MonetizationState
}

export interface TestPageResults {
  success: boolean
  page: Page
  url: string
  stoppedPromise: Promise<OnMonetizationEvent>
  details: {
    statesSeen: Set<string>
    eventsSeen: Set<string>
    state: string | null
    events: Array<{ event: MonetizationEvent; monetizationState: string }>
  }
}

export interface TestPageParameters {
  context: BrowserContext
  url: string
  newPage?: boolean
  listenStopped?: boolean
}

export async function testMonetization({
  context,
  url,
  newPage = true,
  listenStopped = false
}: TestPageParameters): Promise<TestPageResults> {
  const page = newPage ? await context.newPage() : (await context.pages())[0]

  // Show the extension debugging
  await page.evaluateOnNewDocument(() => {
    localStorage['debug'] = 'coil-extension:*'
  })

  page.on('console', (consoleObj: { text(): string }) =>
    debug('TEST MONETIZATION CONSOLE:', consoleObj.text())
  )

  let nthEvent = 0
  const statesSeen = new Set<MonetizationState>()
  const eventsSeen = new Set<MonetizationEventType>()

  let pendingEvent: MonetizationPendingEvent
  let resolveStopped: ((...args: any[]) => void) | null = null

  const stoppedPromise = new Promise<OnMonetizationEvent>(resolve => {
    resolveStopped = resolve
  })
  const events: { event: MonetizationEvent; monetizationState: string }[] = []
  const monetizePromise = new Promise<boolean>(resolve => {
    void page.exposeFunction(
      'onCustomEvent',
      (e: MonetizationEvent, monetizationState: MonetizationState) => {
        events.push({ event: e, monetizationState })
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
        } else if (listenStopped && e.type === 'monetizationstop') {
          if (resolveStopped) {
            resolveStopped({ nthEvent, event: e, state: monetizationState })
          }
        }
        if (nthEvent === 3) {
          resolve(true)
        }
      }
    )
  })

  async function listenFor(type: string) {
    return page.evaluateOnNewDocument((type: string) => {
      const setListener = () => {
        const winAny = window as any
        const docAny: MonetizationExtendedDocument = document as any
        const monetization = docAny.monetization
        if (monetization) {
          const typedType = type as MonetizationEventType
          monetization.addEventListener(typedType, (event: any) => {
            winAny.onCustomEvent(
              { type, detail: event.detail },
              monetization.state
            )
          })
        } else {
          // Poll for document.monetization presence
          setTimeout(setListener, 0)
        }
      }
      setListener()
    }, type)
  }

  if (env.IS_CI) {
    await timeout(2e3)
  }

  await listenFor('monetizationpending')
  await listenFor('monetizationstart')
  await listenFor('monetizationprogress')
  if (listenStopped) {
    await listenFor('monetizationstop')
  }

  await Promise.all([page.waitForNavigation(), page.goto(url)])
  await timeout(2e3)

  // noinspection ES6MissingAwait
  const timeoutPromise = new Promise<boolean>(resolve => {
    setTimeout(resolve, AWAIT_MONETIZATION_TIMEOUT_MS, false)
  })

  const success = await Promise.race([monetizePromise, timeoutPromise])
  let state: string | null = null
  try {
    state = await page.evaluate(() => (document as any).monetization.state)
  } catch (e) {
    // ignored
  }
  debug('seen states: %s, events: %s', statesSeen, eventsSeen)
  debug('document.monetization.state', state)
  return {
    stoppedPromise,
    page,
    success: success && state === 'started',
    url,
    details: {
      statesSeen: statesSeen,
      eventsSeen: eventsSeen,
      state,
      events
    }
  }
}
