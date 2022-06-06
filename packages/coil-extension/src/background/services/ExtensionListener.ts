export function externalMessageListener(runtime: typeof chrome.runtime) {
  runtime.onMessageExternal.addListener(function (
    message,
    sender,
    sendResponse
  ) {
    // sends a response back to state its active
    if (message.command === 'checkActive') {
      sendResponse({ active: true })
    }
  })
}
