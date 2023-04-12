export interface ContentRuntime {
  sendMessage: typeof chrome.runtime.sendMessage
  onMessage: typeof chrome.runtime.onMessage
  getURL: typeof chrome.runtime.getURL
}
