/*
These can be configured by setting WEXT_BUILD_CONFIG_$UPPER_CASED env vars.
e.g.
$ WEXT_BUILD_CONFIG_WM2_ALWAYS=true yarn dev-chrome-prod
 */
export interface BuildConfig extends Record<string, unknown> {
  logTabsApiEvents?: boolean
  extensionBuildString?: string
  extensionPopupFooterString?: string
  isCI?: boolean
  // Bypass origin trial machinery and always allow wm2 requests
  wm2Always?: boolean
  loggingEnabled?: boolean
  useLocalMockServer?: boolean
}
