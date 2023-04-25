import { inject, injectable } from 'inversify'
import type {
  StorePersistence,
  StoreValue
} from '@webmonetization/wext/services'
import * as idbKv from 'idb-keyval'

import { StoreService } from '../../services/storage'
import * as tokens from '../../types/tokens'
import { StoreUpdate } from '../../types/commands'

export class IDBPersistence implements StorePersistence {
  store = idbKv.createStore('backgroundStore', 'backgroundStore')
  cache = new Map()

  async primeCache() {
    return idbKv.entries(this.store).then(entries => {
      entries.forEach(e => this.cache.set(...e))
    })
  }

  clear(): void {
    void idbKv.clear(this.store)
  }

  removeItem(key: string): void {
    void idbKv.del(key, this.store)
  }

  setItem(key: string, value: StoreValue): void {
    void idbKv.set(key, value, this.store)
  }
}

@injectable()
export class BackgroundStoreService extends StoreService {
  constructor(
    @inject(tokens.StorePersistence) storage: StorePersistence,
    @inject(tokens.WextApi) private api: typeof window.chrome
  ) {
    super(storage, (key: string, value) => {
      const message: StoreUpdate = {
        command: 'storeUpdate',
        data: {
          key,
          value
        }
      }
      this.api.runtime.sendMessage(message, () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ignored = this.api.runtime.lastError
      })
    })
  }
}
