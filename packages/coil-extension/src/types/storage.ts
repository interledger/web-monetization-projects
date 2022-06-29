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

/**
 * All values are JSON encoded unless as stored
 * unless stated otherwise
 */
export interface LocalStorageProxy {
  // Auth State
  /**
   * The refresh token for authenticating to the coil site
   * NOT JSON encoded
   */
  token?: string | null

  /**
   * JSON serialized {@link User}
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
}
