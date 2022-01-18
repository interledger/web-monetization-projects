import { calculateMaxAllowableTip } from '../../src/background/util/formatters'

describe('Calculate maximum allowable tip amount', () => {
  it('Non monetized sites should default to $0 max allowable tip', () => {
    const siteIsMonetized = false
    const tippingBetaFeatureFlag = true
    const hasCreditCard = true
    const tipCredits = 10
    const remainingDailyAmount = 20

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      tipCredits,
      remainingDailyAmount
    )

    expect(newMax).toBe(0)
  })
  it('User is part of the tipping-beta and has a credit card on file --> max = remainingDailyAmount', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = true
    const hasCreditCard = true
    const tipCredits = 10
    const remainingDailyAmount = 20

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      tipCredits,
      remainingDailyAmount
    )

    expect(newMax).toBe(remainingDailyAmount)
  })
  it('User is part of the tipping-beta, does NOT have a credit card on file, tipCredits > remainingDailyAmount --> max = remainingDailyAmount', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = true
    const hasCreditCard = false
    const tipCredits = 20
    const remainingDailyAmount = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      tipCredits,
      remainingDailyAmount
    )

    expect(newMax).toBe(remainingDailyAmount)
  })
  it('User is part of the tipping-beta, does NOT have a credit card on file, tipCredits < remainingDailyAmount --> max = tipCredits', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = true
    const hasCreditCard = false
    const tipCredits = 5
    const remainingDailyAmount = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      tipCredits,
      remainingDailyAmount
    )

    expect(newMax).toBe(tipCredits)
  })
  it('Users tipCredits < remainingDailyAmount --> max = tipCredits', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = false
    const hasCreditCard = false
    const tipCredits = 5
    const remainingDailyAmount = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      tipCredits,
      remainingDailyAmount
    )

    expect(newMax).toBe(tipCredits)
  })
  it('Users tipCredits > remainingDailyAmount --> max = remainingDailyAmount', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = false
    const hasCreditCard = false
    const tipCredits = 50
    const remainingDailyAmount = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      tipCredits,
      remainingDailyAmount
    )

    expect(newMax).toBe(remainingDailyAmount)
  })
})
