/* eslint-disable no-console */
export const LogMethods = ['info', 'warn', 'debug', 'trace', 'error'] as const
export type LogMethod = typeof LogMethods[number]
export type Logger = typeof console.log & Pick<typeof console, LogMethod>

export const makeConsoleLogger = (...bindArgs: unknown[]): Logger => {
  const root = console.log.bind(console, ...bindArgs) as Logger
  LogMethods.forEach(method => {
    root[method] = console[method].bind(console, ...bindArgs)
  })
  return root
}
