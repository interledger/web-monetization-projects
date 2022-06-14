import { inject, injectable } from 'inversify'

import {
  BrowserType,
  ExtensionInstance,
  EXTENSION_IDS
} from '../consts/ExtensionIds'
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
    lastError: typeof chrome.runtime.lastError
    sendMessage: typeof chrome.runtime.sendMessage
  }
}

export interface CheckActiveResponse {
  active: boolean
}

@injectable()
export class MultipleInstanceDetector {
  constructor(
    private navigator: Navigator,
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

    const extensions = EXTENSION_IDS[browserType]
    if (extensions.length <= 0) return

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
            type: 'basic',
            iconUrl: 'https://tinypng.com/images/example-shrunk.png',
            title: 'Extension detected',
            message: `${extensionData.extensionName} is active`
          }
          this.wextApi.notifications.create(notificationId, notification)
        }
      }
    )
  }

  private async checkExtensionIsActive(extensionData: ExtensionInstance) {
    return await new Promise(resolve => {
      this.wextApi.runtime.sendMessage(
        extensionData.extensionId,
        { command: 'checkActive' },
        (response: CheckActiveResponse) => {
          if (this.wextApi.runtime.lastError) {
            resolve(false)
            return
          }
          resolve(response.active)
        }
      )
    })
  }
}
