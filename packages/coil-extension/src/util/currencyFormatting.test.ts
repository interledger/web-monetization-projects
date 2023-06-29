import { describe, expect, it } from '@jest/globals'

import { formatAmount, parseAmount } from './currencyFormatting'

describe('Currency utils', () => {
  it('should parse an amount and reformat to same string', () => {
    const testAmount = '$1.23'
    expect(formatAmount(parseAmount(testAmount))).toBe(testAmount)
  })
  it('should format an amount', () => {
    expect(
      formatAmount({
        amount: '1' + '170' + '341' + '242',
        assetCode: 'USD',
        assetScale: 9
      })
    ).toBe('$1.17')
  })
})
