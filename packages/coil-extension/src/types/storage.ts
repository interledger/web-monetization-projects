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

export interface StoreProxy {
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

  superTokensCookie?: string | null

  // Popup state
  'popup-route:last'?: string | null
  'popup-route:tipping-shown'?: boolean | null

  // Config
  // Note that the build time config takes precedence over this
  WM2_ALLOWED?: boolean | null
  // Sends (some) logs to the content script to be logged for ease of viewing
  ACTIVE_TAB_LOGGING?: boolean | null
}
