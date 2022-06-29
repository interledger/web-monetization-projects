import { StorableBlindToken } from '@coil/privacypass-sjcl'

import { TokenStore } from '../../src'

interface StringMap {
  [key: string]: string
}

export class MockStore implements TokenStore {
  private store: StringMap = {}

  async clear() {
    this.store = {}
  }

  public async setItem(key: string, value: string) {
    return (this.store[key] = value)
  }

  public async removeItem(key: string) {
    delete this.store[key]
  }

  public async iterate(
    fn: (key: string, value: string) => StorableBlindToken | undefined
  ) {
    for (const key in this.store) {
      const result = fn(key, this.store[key])
      if (result) {
        return result
      }
    }
  }
}
