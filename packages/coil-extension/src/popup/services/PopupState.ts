import { LocalStorageProxy } from '../../types/storage'
import { User } from '../../types/user'
import { StorageService } from '../../services/storage'
import { PlayOrPauseState, StickyState } from '../../types/streamControls'
import { StreamError } from '../../types/errors'

const STORAGE_KEYS = [
  'adapted',
  'error',
  'coilSite',
  'monetized',
  'monetizedFavicon',
  'monetizedTotal',
  'stickyState',
  'playState',
  'user',
  'validToken'
]

export type PopupStateType = Omit<LocalStorageProxy, 'token'>

export class PopupState implements PopupStateType {
  readonly adapted!: boolean
  readonly stickyState!: StickyState
  readonly playState!: PlayOrPauseState
  readonly coilSite!: string
  readonly monetized!: boolean
  readonly monetizedFavicon!: string
  readonly monetizedTotal!: number
  readonly user!: User
  readonly validToken!: boolean
  readonly error!: StreamError

  constructor(private storage: Pick<StorageService, 'get'>) {}

  get loggedIn() {
    return Boolean(this.validToken)
  }

  sync(keys = STORAGE_KEYS) {
    const thisAny = this as any
    keys.forEach(key => {
      thisAny[key] = this.storage.get(key)
    })
  }
}
