import { inject, injectable } from 'inversify'

import { StorageService } from '../../services/storage'
import * as tokens from '../../types/tokens'
import { StoreUpdate } from '../../types/commands'

@injectable()
export class BackgroundStorageService extends StorageService {
  constructor(
    storage: Storage,
    @inject(tokens.WextApi) private api: typeof window.chrome
  ) {
    super(storage, (key, value, encoded) => {
      const message: StoreUpdate = {
        command: 'storeUpdate',
        data: {
          key,
          value: encoded,
          valueUnencoded: value
        }
      }
      this.api.runtime.sendMessage(message, () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const ignored = this.api.runtime.lastError
      })
    })
  }
}
