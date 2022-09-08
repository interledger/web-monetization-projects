import { User } from './user'

export const STORAGE_KEY = {
  // BACKGROUND/POPUP
  token: 'token',
  user: 'user',
  adapted: 'adapted',
  monetized: 'monetized',
  coilSite: 'coilSite',
  monetizedTotal: 'monetizedTotal'
}

export interface StoreProxy {
  // Auth State

  /**
   */
  user?: User | null

  // Active Tab Monetization state
  adapted?: boolean | null
  monetized?: boolean | null
  coilSite?: string | null
  monetizedTotal?: number | null

  superTokensCookie?: string | null

  // Popup state
  'popup-route:last'?: string | null
  'popup-route:tipping-shown'?: boolean | null

  // Sends (some) logs to the content script to be logged for ease of viewing
  ACTIVE_TAB_LOGGING?: boolean | null
}
