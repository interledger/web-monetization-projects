import { StorableBlindToken } from '@coil/privacypass-sjcl'

import { TokenStore } from '../../src'

export class MockStore implements TokenStore {
  private store: Record<string, string> = {}

  async clear() {
    this.store = {}
  }

  async setItem(key: string, value: string) {
    return (this.store[key] = value)
  }

  async removeItem(key: string) {
    delete this.store[key]
  }

  async iterate(
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
