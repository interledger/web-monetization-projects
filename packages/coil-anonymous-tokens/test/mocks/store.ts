import { StorableBlindToken } from '../../src/lib/privacypass'

interface StringMap {
  [key: string]: string
}

export class MockStore {
  public store: StringMap = {}

  public async setItem(key: string, value: string) {
    return (this.store[key] = value)
  }

  public async removeItem(key: string) {
    delete this.store[key]
  }

  public async iterate(
    fn: (
      value: string,
      key: string,
      i: number
    ) => StorableBlindToken | undefined
  ) {
    let i = 0
    for (const key in this.store) {
      const result = fn(this.store[key], key, i++)
      if (result) {
        return result
      }
    }
  }
}
