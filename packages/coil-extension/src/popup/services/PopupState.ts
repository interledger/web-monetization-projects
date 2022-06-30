import { StorageProxy } from '../../types/storage'

export const STORAGE_KEYS = [
  'user',
  'validToken',

  'adapted',
  'coilSite',
  'monetized',
  'monetizedTotal',

  'extensionBuildString',
  'extensionPopupFooterString',

  'popup-route:last',
  'popup-route:tipping-shown'
]

export type PopupStateType = Omit<StorageProxy, 'token'>
