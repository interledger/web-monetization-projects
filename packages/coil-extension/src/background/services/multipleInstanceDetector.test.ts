import '@abraham/reflection'

import { EXTENSION_IDS } from '../consts/ExtensionIds'

import {
  CheckActiveResponse,
  MultipleInstanceDetector,
  WextApiSubset
} from './multipleInstanceDetector'

const EDGE_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5102.0 Safari/537.36 Edg/104.0.1286.0'
const FF_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:100.0) Gecko/20100101 Firefox/100.0'
const CHROME_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36'

describe('DetectExtensions', () => {
  describe('getBrowserType', () => {
    it('should return "edge" from Edge UA string', () => {
      expect(MultipleInstanceDetector.getBrowserType(EDGE_UA)).toBe('edge')
    })
    it('should return "firefox" from Firefox UA string', () => {
      expect(MultipleInstanceDetector.getBrowserType(FF_UA)).toBe('firefox')
    })
    it('should return "chrome" from Chrome UA string', () => {
      expect(MultipleInstanceDetector.getBrowserType(CHROME_UA)).toBe('chrome')
    })
  })

  describe('detectExtensions', () => {
    const mockApi = {
      notifications: {
        create: jest.fn()
      },
      permissions: {
        contains: jest.fn()
      },
      runtime: {
        sendMessage: jest.fn(),
        lastError: undefined
      },
      tabs: {
        create: jest.fn()
      }
    }
    const navigatorCH = {
      userAgent: CHROME_UA
    } as Navigator

    it('should send a cross extension message', async () => {
      const detector = new MultipleInstanceDetector(
        navigatorCH,
        mockApi as WextApiSubset
      )
      const showNotificationSpy = jest.spyOn(
        detector,
        'showNotificationIfHavePerms'
      )

      const detect = detector.detectOtherInstances()

      expect(mockApi.runtime.sendMessage).toHaveBeenCalled()

      const sendMessageCalls = mockApi.runtime.sendMessage.mock.calls
      expect(sendMessageCalls[0]).toMatchObject([
        EXTENSION_IDS.chrome[0].extensionId,
        { command: 'checkActive' },
        expect.any(Function)
      ])
      const callback = sendMessageCalls[0][2]

      const reply: CheckActiveResponse = {
        active: true
      }
      callback(reply)

      // yield to let the async function run in response to the callback being
      // executed
      await detect

      expect(mockApi.permissions.contains).toHaveBeenCalled()
      expect(mockApi.permissions.contains.mock.calls[0]).toMatchObject([
        { permissions: ['notifications'] },
        expect.any(Function)
      ])

      expect(showNotificationSpy).toHaveBeenCalled()

      expect(mockApi.tabs.create).toHaveBeenCalledWith({
        url: 'chrome://extensions'
      })
    })
  })
})
