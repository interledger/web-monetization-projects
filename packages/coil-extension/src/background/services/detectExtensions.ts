import { ExtensionData } from '../consts/ExtensionIds'

export async function detectExtensionsById(
  extensions: Array<ExtensionData>,
  wextApi: typeof chrome
) {
  if (extensions.length <= 0) return
  for (const extensionData of extensions) {
    const active = await new Promise(resolve => {
      wextApi.runtime.sendMessage(
        extensionData.extensionId,
        { command: 'checkActive' },
        function (response: { active: boolean }) {
          if (wextApi.runtime.lastError) {
            resolve(false)
            return
          }
          resolve(response.active)
        }
      )
    })
    if (active) {
      wextApi.permissions.contains(
        {
          permissions: ['notifications']
        },
        result => {
          if (result) {
            wextApi.notifications.create(
              Date.now().toString(),
              {
                contextMessage: 'There is already an active coil extension',
                isClickable: false,
                type: 'basic',
                iconUrl: 'https://tinypng.com/images/example-shrunk.png',
                title: 'Extension detected',
                message: `${extensionData.extensionName} is active`
              },
              function () {}
            )
          } else {
            // The extension doesn't have the permissions.
          }
        }
      )
      // open tab based on platform
      if (navigator.userAgent.includes('Firefox')) {
        // firefox
        wextApi.tabs.create({ url: 'about:debugging' })
      } else {
        // edge or chrome
        wextApi.tabs.create({ url: 'chrome://extensions' })
      }
      break
    }
  }
}
