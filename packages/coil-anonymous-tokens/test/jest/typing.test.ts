import localForage from 'localforage'

import { TokenStore } from '../../src/index'

describe('TokenStore', () => {
  it('should be a subset of the LocalForage interface', async () => {
    const store: TokenStore = localForage
    expect(store).toBe(localForage)
  })
})
