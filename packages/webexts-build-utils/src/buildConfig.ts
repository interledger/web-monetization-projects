const buildConfigKey = 'WEXT_BUILD_CONFIG_'
const title = (w: string) => w[0].toUpperCase() + w.slice(1).toLowerCase()

export const WEXT_BUILD_CONFIG: Record<string, unknown> = process.env
  .WEXT_BUILD_CONFIG
  ? JSON.parse(process.env.WEXT_BUILD_CONFIG)
  : {}

Object.keys(process.env).forEach(key => {
  if (key.startsWith(buildConfigKey)) {
    const prefixRemoved = key.slice(buildConfigKey.length)
    const split = prefixRemoved.split('_')
    const first = split.shift()?.toLowerCase()
    const rest = split.map(title).join('')
    const camelCase = `${first}${rest}`
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    WEXT_BUILD_CONFIG[camelCase] = JSON.parse(process.env[key]!)
  }
})

WEXT_BUILD_CONFIG.isCI = Boolean(process.env.CI)
