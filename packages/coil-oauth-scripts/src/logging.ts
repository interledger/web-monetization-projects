import { getDoc } from './documentExtensions'

export const debug: typeof console.log = localStorage.WM_DEBUG
  ? // eslint-disable-next-line no-console
    console.log.bind(console, 'oauth-scripts:')
  : // eslint-disable-next-line @typescript-eslint/no-empty-function
    () => {}

export function logEvents() {
  const events = [
    'monetizationstart',
    'monetizationstop',
    'monetizationpending'
  ] as const

  events.forEach(e => {
    getDoc(document).monetization.addEventListener(e, ev => {
      debug('WM EVENT: ', e, ev.detail)
    })
  })
}

logEvents()
