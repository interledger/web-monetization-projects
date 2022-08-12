import { API } from '../webpackDefines'
import { ChromeScripting } from '../types/chrome/chromeScripting'

import { Reloader } from './mv3/reloader'

export const dbg = console.log.bind('ServiceWorker')
dbg('backgroundMV3.ts')
dbg('typeof self.localStorage', self.localStorage)

const reloader = new Reloader(chrome, console.log.bind(console, 'Reloader: '))
reloader.connect()

const scripting = API.scripting as unknown as ChromeScripting

scripting
  .registerContentScripts([
    {
      matches: ['https://*/*', 'http://*/*'],
      id: 'wm-polyfill.js',
      world: 'MAIN',
      js: ['wm-polyfill.js'],
      runAt: 'document_start'
    }
  ])
  // eslint-disable-next-line no-console
  .catch(console.error)

const backupTabsSendMessage = chrome.tabs.sendMessage.bind(chrome.tabs)
const backupRuntimeSendMessage = chrome.runtime.sendMessage.bind(chrome.runtime)

// chrome.tabs.sendMessage =

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tabsSendMessage = (
  tabId: any,
  message: any,
  options: any,
  responseCallback: any
) => {
  const error = new Error().stack
  if (typeof options === 'function') {
    const backup = options
    options = (...args: any[]) => {
      if (chrome.runtime.lastError) {
        console.log('NIQ got error', chrome.runtime.lastError, error)
      }
      backup(...args)
    }
  } else if (typeof responseCallback === 'function') {
    const backup = responseCallback
    responseCallback = (...args: any[]) => {
      if (chrome.runtime.lastError) {
        console.log('NIQ got error', chrome.runtime.lastError, error)
      }
      backup(...args)
    }
  } else {
    const callback = () => {
      if (chrome.runtime.lastError) {
        console.log('NIQ got error', chrome.runtime.lastError, error)
      }
    }
    if (options) {
      responseCallback = callback
    } else {
      options = callback
    }
  }
  backupTabsSendMessage(tabId, message, options, responseCallback)
}

const sendMessage = (message: any, options: any, responseCallback: any) => {
  const error = new Error().stack
  if (typeof options === 'function') {
    const backup = options
    options = (...args: any[]) => {
      if (chrome.runtime.lastError) {
        console.log('NIQ2 got error', chrome.runtime.lastError, error)
      }
      backup(...args)
    }
  } else if (typeof responseCallback === 'function') {
    const backup = responseCallback
    responseCallback = (...args: any[]) => {
      if (chrome.runtime.lastError) {
        console.log('NIQ2  got error', chrome.runtime.lastError, error)
      }
      backup(...args)
    }
  } else {
    const callback = () => {
      if (chrome.runtime.lastError) {
        console.log('NIQ2 got error', chrome.runtime.lastError, error)
      }
    }
    if (options) {
      responseCallback = callback
    } else {
      options = callback
    }
  }
  console.log({ message, options, responseCallback })
  const args = [message, options, responseCallback].filter(Boolean) as any[]
  ;(backupRuntimeSendMessage as any)(...args)
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
chrome.tabs.sendMessage = tabsSendMessage

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
chrome.runtime.sendMessage = sendMessage

import './background'

self.addEventListener('unhandledrejection', event => {
  console.log('unhandledrejection', event)
})
