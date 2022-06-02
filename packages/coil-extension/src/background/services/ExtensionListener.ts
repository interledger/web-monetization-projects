export function externalMessageListener() {
  chrome.runtime.onMessageExternal.addListener(function (_, __, sendResponse) {
    // sends a response back to state its active
    sendResponse({ active: true })
  })
}
