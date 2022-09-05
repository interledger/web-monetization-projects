import '@abraham/reflection'

import { Container } from 'inversify'
import {
  PaymentDetails,
  resolvePaymentEndpoint
} from '@webmonetization/polyfill-utils'
import { StorePersistence } from '@webmonetization/wext/services'

import { configureContainer } from '../di/configureContainer'
import { decorateThirdPartyClassesForInjection } from '../../services/decorateThirdPartyClassesForInjection'
import { StartWebMonetization } from '../../types/commands'
import * as tokens from '../../types/tokens'
import { StoreProxy } from '../../types/storage'
import { User } from '../../types/user'
import { FrameSpec } from '../../types/FrameSpec'
import { timeout } from '../../content/util/timeout'
import { isFrameMonetized } from '../../types/TabState'
import { getFrameSpec } from '../../util/tabs'

import { AuthService } from './AuthService'
import { Streams } from './Streams'
import { MonetizationService } from './MonetizationService'
import { TabStates } from './TabStates'

type MessageSender = chrome.runtime.MessageSender

function mockMessageSender({ tabId, frameId }: FrameSpec) {
  return {
    tab: {
      id: tabId
    },
    frameId: frameId
  } as MessageSender
}

function mockPaymentDetails(paymentPointer: string) {
  return {
    fromBody: false,
    tagType: 'meta' as const,
    requestId: 'a',
    paymentPointer: paymentPointer,
    attrs: {},
    initiatingUrl: 'https://coil.com'
  }
}

function mockWextApi() {
  return {
    browserAction: {
      setPopup: jest.fn(),
      onClicked: {
        addListener: jest.fn(),
        removeListener: jest.fn()
      }
    },
    runtime: {
      sendMessage: jest.fn()
    },
    tabs: {
      sendMessage: jest.fn(),
      query: jest.fn()
    }
  } as unknown as typeof chrome
}

describe('MonetizationService', () => {
  it('should be instantiable in tests via container construction', async () => {
    decorateThirdPartyClassesForInjection()

    const container = new Container({
      defaultScope: 'Singleton',
      autoBindInjectable: true
    })

    const api = mockWextApi()

    configureContainer({
      container,
      buildConfig: {},
      coilDomain: 'https://coil.com',
      wextApi: api,
      getActiveTab: async () => 0,
      loggingEnabled: true
    })

    container
      .rebind<StorePersistence>(tokens.StorePersistence)
      .toConstantValue({
        cache: new Map(),
        clear(): void {
          // noop
        },
        removeItem(): void {
          // noop
        },
        setItem(): void {
          // noop
        }
      })

    const streams = container.get(Streams)

    const beginStream = jest.spyOn(streams, 'beginStream')
    const closeStream = jest.spyOn(streams, 'closeStream')
    const pauseStream = jest.spyOn(streams, 'pauseStream')

    beginStream.mockReturnValue(undefined)
    closeStream.mockReturnValue(undefined)
    pauseStream.mockReturnValue(undefined)

    const auth = await container.getAsync(AuthService)
    const refreshAndStoreState = jest.spyOn(auth, 'maybeRefreshAndStoreState')
    const token = '<JWT>'
    const store = await container.getAsync<StoreProxy>(tokens.StoreProxy)

    refreshAndStoreState.mockImplementation(async () => {
      await timeout(100)

      // Set the user to have a valid subscription
      store.user = {
        subscription: {
          active: true
        }
      } as User
      return true
    })

    const tabStates = await container.getAsync(TabStates)
    const service = await container.getAsync(MonetizationService)
    let frame: FrameSpec = { tabId: 0, frameId: 0 }
    const sender = mockMessageSender(frame)
    frame = getFrameSpec(sender)

    const paymentPointer = '$b.tags.com/ok'
    const details: PaymentDetails = mockPaymentDetails(paymentPointer)
    const startRequest: StartWebMonetization = {
      command: 'startWebMonetization',
      data: details
    }

    expect(tabStates.activeTab).toBe(0)
    const startPromise = service.startWebMonetization(startRequest, sender)

    service.pauseWebMonetization(
      {
        command: 'pauseWebMonetization',
        data: {
          requestIds: [details.requestId]
        }
      },
      sender
    )

    const startOp = await startPromise
    expect(startOp).toBe(true)

    const beginStreamArgs = {
      ...details,
      spspEndpoint: resolvePaymentEndpoint(details.paymentPointer)
    }
    expect(beginStream).toHaveBeenCalledWith(details.requestId, beginStreamArgs)
    expect(pauseStream).toHaveBeenCalledWith(details.requestId)

    expect(closeStream).not.toHaveBeenCalled()
    service.stopWebMonetization(
      {
        command: 'stopWebMonetization',
        data: details
      },
      sender
    )
    expect(closeStream).toHaveBeenCalledWith(details.requestId)
    expect(isFrameMonetized(tabStates.getFrameOrDefault(frame))).toBe(false)
  })
})
