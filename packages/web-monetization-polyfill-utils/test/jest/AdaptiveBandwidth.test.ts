import { AdaptiveBandwidth } from '../../src/lib/AdaptiveBandwidth'

const URL = 'http://example.com'
const MS = 1e3

class MockAdaptiveBandwidthTiers {
  constructor(private bandwidth: number) {}
  async getBandwidth(url: string): Promise<number> {
    return this.bandwidth
  }
}

describe('AdaptiveBandwidth', () => {
  describe('_getLinearSendMax', () => {
    it('uses the bandwidth to compute the sendMax', async () => {
      const ab = new AdaptiveBandwidth(URL, new MockAdaptiveBandwidthTiers(123))
      expect(await ab._getLinearSendMax(456)).toStrictEqual(
        Math.floor((123 * 456) / MS)
      )
    })

    it('uses the sent amount to compute the sendMax', async () => {
      const ab = new AdaptiveBandwidth(URL, new MockAdaptiveBandwidthTiers(123))
      ab.addSentAmount(12)
      ab.addSentAmount(34)
      expect(await ab._getLinearSendMax(456)).toStrictEqual(
        Math.floor((123 * 456) / MS) - 12 - 34
      )
    })
  })
})
