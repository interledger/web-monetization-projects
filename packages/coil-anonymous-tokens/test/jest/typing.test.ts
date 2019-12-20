import localForage from 'localforage'
import { TokenStore } from '@coil/anonymous-tokens'

describe('TokenStore', () => {
  it('should be a subset of the LocalForage interface', async () => {
    const store: TokenStore = localForage
    expect(store).toBe(localForage)
  })
})
