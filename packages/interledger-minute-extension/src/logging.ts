// eslint-disable-next-line no-console
export const debug = console.log
export const makeDebug = (name: string) => {
  return debug.bind(console, 'minute-extension:' + name)
}
