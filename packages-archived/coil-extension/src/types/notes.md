# API usage

API.tabs.query
API.tabs.highlight
API.tabs.get
API.tabs.create

API.tabs.sendMessage
Used to send a message to the content script
Listen with API.runtime.onMessage.addListener

API.tabs.onActivated.addListener
API.tabs.onRemoved.addListener
API.tabs.onUpdated.addListener

API.browserAction.setPopup
API.browserAction.setIcon
API.browserAction.setBadgeText
API.browserAction.setBadgeBackgroundColor

API.browserAction.onClicked.addListener
API.browserAction.onClicked.removeListener

API.runtime.onMessage.addListener
API.runtime.onConnect.addListener
Called in background page when other page
opens a port with API.runtime.connect

API.runtime.sendMessage

API.runtime.getURL
API.runtime.connect
