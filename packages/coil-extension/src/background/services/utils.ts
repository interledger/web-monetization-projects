import { inject, interfaces, named } from 'inversify'

import * as tokens from '../../types/tokens'

import Context = interfaces.Context

import { StackTrace, StackTraceOptions } from '@stacktracejs/stacktrace-js'

import { StackFrame } from '../../../../stacktracejs-stacktrace-js/src/stackframe'

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

const opts: StackTraceOptions = {
  resultsCache: {},
  sourceCache: {},
  sourceMapConsumerCache: {}
}

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
  if (localStorage.debug) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('debug')(`coil-extension:${namespace}`)
  }

  return (async (...args: any[]) => {
    // const st = await StackTrace.get()
    const st: StackFrame[] = []
    const error = new Error()
    const stack = error.stack ?? ''
    const obj = {
      nope: '',
      get stack() {
        StackTrace.fromError(error).then(st => {
          obj.nope = st
            .map(f =>
              f.toString().replace(/(?<=webpack:\/\/.*?)\/src/, '/./src')
            )
            .join('\n')
        })
        console.log(stack)
        return ''
      }
    }
    return console.log(
      `%c coil-extension:${namespace}`,
      `color: ${getColor()}; background-color: black`,
      ...args,
      ...st.map(f =>
        f.toString().replace(/(?<=webpack:\/\/.*?)\/src/, '/./src')
      ),
      obj
    )
  }) as typeof console.log

  // return console.log.bind(
  //   // eslint-disable-next-line no-console
  //   console,
  //   `%c coil-extension:${namespace}`,
  //   `color: ${getColor()}; background-color: black`
  // )
}
