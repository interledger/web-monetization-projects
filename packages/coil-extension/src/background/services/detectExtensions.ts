export async function detectExtensionsById(
  extensionIds: Array<string>,
  wextApi: typeof chrome
) {
  for (const id of extensionIds) {
    const active = await new Promise(resolve => {
      wextApi.runtime.sendMessage(
        id,
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
    // We don't want to search for ALL active extensions, just one
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
                message: 'Active coil extension detected'
              },
              function () {}
            )
          } else {
            // The extension doesn't have the permissions.
          }
        }
      )
      // We need to detect what platform we are on before we can do this
      wextApi.tabs.create({ url: 'chrome://extensions' })
      break
    }
  }
}
