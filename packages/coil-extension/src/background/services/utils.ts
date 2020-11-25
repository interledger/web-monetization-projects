import { inject, interfaces, named } from 'inversify'

import * as tokens from '../../types/tokens'

import Context = interfaces.Context

import { BUILD_CONFIG } from '../../webpackDefines'

export function logger(name?: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function decorator(
    target: any,
    targetKey: string,
    index?: number | undefined
  ) {
    inject(tokens.Logger)(target, targetKey, index)
    if (name) {
      named(name)(target, targetKey, index)
    }
  }
}

export type Logger = typeof console.log

const getColor = (() => {
  let ix = 0
  const colors = [
    'cyan',
    'yellow',
    'green',
    'magenta',
    'orange',
    'purple',
    'blue'
  ]
  return () => {
    return colors[ix++ % colors.length]
  }
})()

export function createLogger(context: Context) {
  const tag = context.currentRequest.target.getNamedTag()
  let name = tag?.value
  const identifier = context.currentRequest.parentRequest?.serviceIdentifier
  if (!name && typeof identifier === 'function') {
    name = identifier.name
  }
  if (!name) {
    name = context.container.get(tokens.NoContextLoggerName)
  }
  const namespace = `background${name ? `:${name}` : ''}`
  // eslint-disable-next-line no-console
  if (localStorage.debug || BUILD_CONFIG['DEBUG']) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('debug')(`coil-extension:${namespace}`)
  }

  return console.log.bind(
    // eslint-disable-next-line no-console
    console,
    `%c coil-extension:${namespace} %c`,
    `color: ${getColor()};`,
    `color: white;`
  )
}

export function logLastError(from: string): () => void {
  return () => {
    if (
      chrome.runtime.lastError &&
      chrome.runtime.lastError.message &&
      !chrome.runtime.lastError.message.startsWith(
        'The message port closed before a response was received.'
      )
    ) {
      console.log(
        `runtime.lastError, from: ${from}, msg: ${chrome.runtime.lastError.message}`
      )
    }
  }
}
