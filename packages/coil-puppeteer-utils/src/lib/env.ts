import * as path from 'path'

export const IS_CI = Boolean(process.env.CI)
export const DEV = Boolean(process.env.DEV)

// If this is set, will inject token and skip puppeteer of login
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const COIL_TOKEN = process.env.COIL_TOKEN!

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const COIL_USER = process.env.COIL_USER!
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const COIL_PASSWORD = process.env.COIL_PASSWORD!
export const COIL_DOMAIN = process.env.COIL_DOMAIN || 'https://coil.com'
export const AWAIT_MONETIZATION_TIMEOUT_MS = Number(
  process.env.AWAIT_MONETIZATION_TIMEOUT_MS || (IS_CI ? 60e3 : 20e3)
)

export const CF_ACCESS_CLIENT_ID = process.env.CF_ACCESS_CLIENT_ID
export const CF_ACCESS_CLIENT_SECRET = process.env.CF_ACCESS_CLIENT_SECRET

export const HEADLESS = Boolean(process.env.PUPPETEER_HEADLESS)
export const DEVTOOLS = Boolean(process.env.PUPPETEER_DEVTOOLS)

// TODO: edge ? chrome|edge -> chromium ?
export const BROWSER_TYPE = (process.env.BROWSER_TYPE || 'chrome') as
  | 'chrome'
  | 'firefox'

export const BROWSER_PATH = process.env.BROWSER_PATH || undefined
export const EXTENSION_PATH =
  process.env.EXTENSION_PATH ||
  path.resolve(__dirname, '../../../coil-extension/dist')
