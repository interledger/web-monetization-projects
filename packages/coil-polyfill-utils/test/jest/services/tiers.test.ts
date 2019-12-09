import { BandwidthTiers } from '@coil/polyfill-utils'

describe('BandwidthTiers#getTier', () => {
  class TestGetTier extends BandwidthTiers {
    async fetchTierData() {
      return {
        'https://xrpcommunity.blog': 2,
        'https://davidwalsh.name': 3,
        'https://coil.com/p/Hodor': 2
      }
    }
  }
  const tiers = new TestGetTier()

  it('Gets the right tier for davidwalsh', async () => {
    const tier = await tiers.getTier('https://davidwalsh.name/')
    expect(tier).toEqual(3)
  })
  it('Gets the right tier for davidwalsh with an anchor # at the end', async () => {
    const tier = await tiers.getTier('https://davidwalsh.name#some-id')
    expect(tier).toEqual(3)
  })
  it('Gets the right tier for xrpcommunity', async () => {
    const tier = await tiers.getTier('https://xrpcommunity.blog')
    expect(tier).toEqual(2)
  })
  it('Gets the right tier for Hodor', async () => {
    const tier = await tiers.getTier('https://coil.com/p/Hodor')
    expect(tier).toEqual(2)
  })
})
