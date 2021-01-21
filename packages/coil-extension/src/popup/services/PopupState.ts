import { LocalStorageProxy } from '../../types/storage'

export type PopupStateType = Omit<LocalStorageProxy, 'token'>
