export interface BuildConfig extends Record<string, unknown> {
  logTabsApiEvents?: boolean
  extensionBuildString?: string
  extensionPopupFooterString?: string
  isCI?: boolean
  loggingEnabled?: boolean
  useLocalMockServer?: boolean
}
