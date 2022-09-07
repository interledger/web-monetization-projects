/*
These can be configured by setting WEXT_BUILD_CONFIG_$UPPER_CASED env vars.
e.g.
$ WEXT_BUILD_CONFIG_WM2_ALWAYS=true yarn dev-chrome-prod
 */
export interface BuildConfig extends Record<string, unknown> {
  logTabsApiEvents?: boolean

  isCI: boolean
  isMV3: boolean

  dev?: true
  loggingEnabled?: boolean
  useLocalMockServer?: boolean
}
