console.log('This is the content in the background script for extenstion B')

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  sendResponse({ txt: 'Opening extensions tab' })
  let newTab = chrome.tabs.create({ url: 'chrome://extensions' })
  // it will be undefined if it fails to open the new tab
  if (!newTab) {
    // still doesnt work :(
    newTab = chrome.tabs.create({ url: 'about:debugging' })
  }
  console.log('New tab has been opened')
})
