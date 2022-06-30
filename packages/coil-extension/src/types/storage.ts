import { User } from './user'

export const STORAGE_KEY = {
  // BACKGROUND/POPUP
  token: 'token',
  user: 'user',
  validToken: 'validToken',
  adapted: 'adapted',
  monetized: 'monetized',
  coilSite: 'coilSite',
  monetizedTotal: 'monetizedTotal'
}

export interface StorageProxy {
  // Auth State
  /**
   * The refresh token for authenticating to the coil site
   */
  token?: string | null

  /**
   */
  user?: User | null
  /**
   * Boolean
   */
  validToken?: boolean | null

  // Active Tab Monetization state
  adapted?: boolean | null
  monetized?: boolean | null
  coilSite?: string | null
  monetizedTotal?: number | null

  // State for popup builds
  extensionBuildString?: string | null
  extensionPopupFooterString?: string | null

  // Popup state
  'popup-route:last'?: string | null
  'popup-route:tipping-shown'?: boolean | null

  // Config
  WM2_ALLOWED?: boolean | null
}
