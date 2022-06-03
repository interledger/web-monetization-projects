export function externalMessageListener(runtime: typeof chrome.runtime) {
  // In the future we may want to restrict responses to a list of senders,
  // and we may also want to respond to different kinds of messages, so this
  // should check the type of message sent.
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
