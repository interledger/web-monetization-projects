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
   * The token for authenticating to the coil site
   */
  token?: string | null

  user?: User | null

  validToken?: boolean | null

  // Active Tab Monetization state
  adapted?: boolean | null
  monetized?: boolean | null
  coilSite?: string | null
  monetizedTotal?: number | null
  topFrameHref?: string | null

  // Popup state
  'popup-route:last'?: string | null
  'popup-route:tipping-shown'?: boolean | null

  // Sends (some) logs to the content script for ease of viewing
  ACTIVE_TAB_LOGGING?: boolean | null
}
