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
          // display a notification if necessary
          // chrome.notifications.create(
          //   Date.now().toString(),
          //   {
          //     contextMessage: "There is already an active coil extension",
          //     isClickable: false,
          //     type: "basic",
          //     iconUrl: "https://tinypng.com/images/example-shrunk.png",
          //     title: "Extension detected",
          //     message: "Active coil extension detected"
          //   },
          //   function(){},
          // )
          chrome.tabs.create({ url: 'chrome://extensions' })
        }
      }
    )
  })
}
