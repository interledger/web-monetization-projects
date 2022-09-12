// Possible to override name/version so can publish as different extension
export const AFTER_DONE_SHELL_CMD = process.env.AFTER_DONE_SHELL_CMD

export const MV3 = Boolean(process.env.MV3 ?? false)

export const MV3_BACKGROUND_TYPE: 'serviceworker' | 'eventspage' =
  process.env.MV3 === 'eventspage' ? 'eventspage' : 'serviceworker'

export const MV2_BACKGROUND_TYPE: 'backgroundpage' | 'eventspage' =
  process.env.MV2 === 'eventspage' ? 'eventspage' : 'backgroundpage'

export const WEXT_MANIFEST_SUFFIX = process.env.WEXT_MANIFEST_SUFFIX
export const WEXT_MANIFEST_SUFFIX_NO_DATE =
  process.env.WEXT_MANIFEST_SUFFIX_NO_DATE
export const WEXT_MANIFEST_VERSION = process.env.WEXT_MANIFEST_VERSION
export const WEXT_MANIFEST_VERSION_NAME = process.env.WEXT_MANIFEST_VERSION_NAME
export const WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID =
  process.env.WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID
export const WEXT_MANIFEST_KEY = process.env.WEXT_MANIFEST_KEY
export const WEXT_MANIFEST_PERMISSIONS = process.env.WEXT_MANIFEST_PERMISSIONS

export const API = process.env.API || 'chrome'
export const BROWSER = process.env.BROWSER || 'chrome'
export const LIVE_RELOAD =
  Boolean(process.env.LIVE_RELOAD) && !process.env.NO_LIVE_RELOAD

// Can cut build times down from 30s to 10s on some machines
export const TS_LOADER_TRANSPILE_ONLY = Boolean(
  process.env.TS_LOADER_TRANSPILE_ONLY
)

export const DBG_RELOAD_SERVER = process.env.DBG_RELOAD_SERVER

export const TSCONFIG_DEBUG = process.env.TSCONFIG_DEBUG

export const RELOAD_SERVER_PORT = Number(process.env.RELOAD_SERVER_PORT ?? 4444)

export const PRODUCTION = process.env.NODE_ENV === 'production'

const WEXT_BUILD_CONFIG_KEY = 'WEXT_BUILD_CONFIG_'
const title = (w: string) => w[0].toUpperCase() + w.slice(1).toLowerCase()

export const WEXT_BUILD_CONFIG: Record<string, unknown> = process.env
  .WEXT_BUILD_CONFIG
  ? JSON.parse(process.env.WEXT_BUILD_CONFIG)
  : {}

Object.keys(process.env).forEach(key => {
  if (key.startsWith(WEXT_BUILD_CONFIG_KEY)) {
    const prefixRemoved = key.slice(WEXT_BUILD_CONFIG_KEY.length)
    const split = prefixRemoved.split('_')
    const first = split.shift()?.toLowerCase()
    const rest = split.map(title).join('')
    const camelCase = `${first}${rest}`
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    WEXT_BUILD_CONFIG[camelCase] = JSON.parse(process.env[key]!)
  }
})

WEXT_BUILD_CONFIG.isCI = Boolean(process.env.CI)
WEXT_BUILD_CONFIG.isMV3 = MV3
