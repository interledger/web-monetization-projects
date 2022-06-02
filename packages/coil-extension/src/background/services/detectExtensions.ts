export function detectExtensionsById(
  extensionIds: Array<string>,
  runtime: typeof chrome.runtime
) {
  extensionIds.forEach(id => {
    runtime.sendMessage(
      id,
      { extensionExists: true },
      function (response: any) {
        if (runtime.lastError) {
          return
        }
        // creates chrome tab
        if (response.active) {
          chrome.tabs.create({ url: 'chrome://extensions' })
        }
      }
    )
  })
}
