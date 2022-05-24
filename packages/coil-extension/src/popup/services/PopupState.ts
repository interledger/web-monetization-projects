import { LocalStorageProxy } from '../../types/storage'

export const STORAGE_KEYS = [
  'adapted',
  'coilSite',
  'monetized',
  'monetizedTotal',
  'stickyState',
  'playState',
  'user',
  'validToken',
  'extensionBuildString',
  'extensionPopupFooterString',
  'popup-route:last',
  'popup-route:tipping-shown'
]

export type PopupStateType = Omit<LocalStorageProxy, 'token'>
