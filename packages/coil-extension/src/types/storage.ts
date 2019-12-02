import { User } from './user'
import { PlayOrPauseState, StickyState } from './streamControls'

/**
 * All values are JSON encoded unless as stored
 * unless stated otherwise
 */
export interface LocalStorageProxy {
  /**
   * The refresh token for authenticating to the coil site
   * NOT JSON encoded
   */
  token: string | null

  /**
   * JSON serialized {@link User}
   */
  user: User | null
  /**
   * Boolean
   */
  validToken: boolean | null

  adapted: boolean | null
  monetized: boolean | null
  coilSite: string | null

  coilDomain: string | null

  stickyState: StickyState | null
  playState: PlayOrPauseState | null

  monetizedTotal: number | null
  monetizedFavicon: string | null
}

const keysList = {
  // BACKGROUND/POPUP
  token: 'token',
  user: 'user',
  validToken: 'validToken',
  adapted: 'adapted',
  monetized: 'monetized',
  coilSite: 'coilSite',
  coilDomain: 'coilDomain',
  monetizedTotal: 'monetizedTotal',
  monetizedFavicon: 'monetizedFavicon',
  stickyState: 'stickyState',
  playState: 'playState'
} as const

type StorageKeyType = keyof LocalStorageProxy
export const STORAGE_KEY: typeof keysList &
  Record<StorageKeyType, LocalStorageProxy[StorageKeyType]> = keysList
