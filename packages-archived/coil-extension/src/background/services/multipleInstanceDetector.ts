import { inject, injectable } from 'inversify'

import {
  BrowserType,
  ExtensionInstance,
  EXTENSIONS
} from '../consts/extensionInstances'
import * as tokens from '../../types/tokens'

export type WextApiSubset = {
  permissions: {
    contains: typeof chrome.permissions.contains
  }
  notifications: {
    create: typeof chrome.notifications.create
  }
  tabs: {
    create: typeof chrome.tabs.create
  }
  runtime: {
    onMessageExternal: {
      addListener: typeof chrome.runtime.onMessageExternal.addListener
    }
    lastError: typeof chrome.runtime.lastError
    sendMessage: typeof chrome.runtime.sendMessage
  }
  extension: {
    getURL: typeof chrome.extension.getURL
  }
}

export interface CheckActiveResponse {
  active: boolean
}

export interface ExtensionMessage {
  command: string
}

@injectable()
export class MultipleInstanceDetector {
  constructor(
    @inject(tokens.Navigator)
    private navigator: Pick<Navigator, 'userAgent'>,
    @inject(tokens.WextApi) private wextApi: WextApiSubset
  ) {}

  static getBrowserType(userAgent: string): BrowserType | null {
    if (userAgent.includes('Firefox/')) {
      return 'firefox'
    } else if (userAgent.includes('Edg/')) {
      return 'edge'
    } else if (userAgent.includes('Chrome/')) {
      return 'chrome'
    } else {
      return null
    }
  }

  async detectOtherInstances() {
    const browserType = MultipleInstanceDetector.getBrowserType(
      this.navigator.userAgent
    )
    if (!browserType) {
      return
    }

    const extensions = EXTENSIONS[browserType]
    for (const extension of extensions) {
      const active = await this.checkExtensionIsActive(extension)
      if (active) {
        this.showNotificationIfHavePerms(extension)
        this.openTabForUserToManageExtensions(browserType)
        break
      }
    }
  }

  private openTabForUserToManageExtensions(browserType: BrowserType) {
    const mapping: Record<BrowserType, string> = {
      chrome: 'chrome://extensions',
      edge: 'edge://extensions',
      firefox: 'about:debugging'
    }
    const url = mapping[browserType]
    this.wextApi.tabs.create({ url })
  }

  showNotificationIfHavePerms(extensionData: ExtensionInstance) {
    this.wextApi.permissions.contains(
      {
        permissions: ['notifications']
      },
      havePerm => {
        if (havePerm) {
          const notificationId = Date.now().toString()
          const notification = {
            contextMessage: 'There is already an active coil extension',
            isClickable: false,
            type: 'basic' as const,
            iconUrl: this.wextApi.extension.getURL('res/icn-coil-ext@4x.png'),
            title: 'Extension detected',
            message: `${extensionData.name} is active`
          }
          this.wextApi.notifications.create(notificationId, notification)
        }
      }
    )
  }

  addExternalMessageListener() {
    this.wextApi.runtime.onMessageExternal.addListener(
      (message: ExtensionMessage, sender, sendResponse) => {
        // sends a response back to state it's active
        if (message.command === 'checkActive') {
          sendResponse({ active: true })
        }
      }
    )
  }

  private async checkExtensionIsActive(extensionData: ExtensionInstance) {
    return await new Promise(resolve => {
      this.wextApi.runtime.sendMessage(
        extensionData.id,
        { command: 'checkActive' },
        (response: CheckActiveResponse) => {
          resolve(!this.wextApi.runtime.lastError ? response.active : false)
        }
      )
    })
  }
}
