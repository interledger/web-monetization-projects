import { StoreProxy } from '../../types/storage'

export const STORAGE_KEYS = [
  'user',

  'adapted',
  'coilSite',
  'monetized',
  'monetizedTotal',
  'topFrameHref',

  'popup-route:last',
  'popup-route:tipping-shown'
]

export type PopupStateType = StoreProxy
