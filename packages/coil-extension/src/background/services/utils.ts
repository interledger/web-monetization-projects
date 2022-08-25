import { inject, interfaces, named } from 'inversify'

import * as tokens from '../../types/tokens'

type Context = interfaces.Context

export function logger(name?: string) {
  return function decorator(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const enabled = context.container.get<boolean>(tokens.LoggingEnabled)
  if (!enabled) {
    return () => undefined
  }

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
  if (self.localStorage?.debug) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('debug')(`coil-extension:${namespace}`)
  }
  return console.log.bind(
    // eslint-disable-next-line no-console
    console,
    `%c coil-extension:${namespace}`,
    `color: ${getColor()}; background-color: black`
  )
}
