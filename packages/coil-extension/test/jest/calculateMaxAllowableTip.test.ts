import { describe, expect, it } from '@jest/globals'

import { calculateMaxAllowableTip } from '../../src/util/calculateMaxAllowableTip'

describe('Calculate maximum allowable tip amount', () => {
  it('Non monetized sites should default to $0 max allowable tip', () => {
    const siteIsMonetized = false
    const tippingBetaFeatureFlag = true
    const hasCreditCard = true
    const totalTipCreditAmountUsd = 10
    const limitRemainingAmountUsd = 20

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    expect(newMax).toBe(0)
  })
  it('User is part of the tipping-beta and has a credit card on file --> max = limitRemainingAmountUsd', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = true
    const hasCreditCard = true
    const totalTipCreditAmountUsd = 10
    const limitRemainingAmountUsd = 20

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    expect(newMax).toBe(limitRemainingAmountUsd)
  })
  it('User is part of the tipping-beta, does NOT have a credit card on file, totalTipCreditAmountUsd > limitRemainingAmountUsd --> max = limitRemainingAmountUsd', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = true
    const hasCreditCard = false
    const totalTipCreditAmountUsd = 20
    const limitRemainingAmountUsd = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    expect(newMax).toBe(limitRemainingAmountUsd)
  })
  it('User is part of the tipping-beta, does NOT have a credit card on file, totalTipCreditAmountUsd < limitRemainingAmountUsd --> max = totalTipCreditAmountUsd', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = true
    const hasCreditCard = false
    const totalTipCreditAmountUsd = 5
    const limitRemainingAmountUsd = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    expect(newMax).toBe(totalTipCreditAmountUsd)
  })
  it('Users totalTipCreditAmountUsd < limitRemainingAmountUsd --> max = totalTipCreditAmountUsd', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = false
    const hasCreditCard = false
    const totalTipCreditAmountUsd = 5
    const limitRemainingAmountUsd = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    expect(newMax).toBe(totalTipCreditAmountUsd)
  })
  it('Users totalTipCreditAmountUsd > limitRemainingAmountUsd --> max = limitRemainingAmountUsd', () => {
    const siteIsMonetized = true
    const tippingBetaFeatureFlag = false
    const hasCreditCard = false
    const totalTipCreditAmountUsd = 50
    const limitRemainingAmountUsd = 10

    const newMax = calculateMaxAllowableTip(
      siteIsMonetized,
      tippingBetaFeatureFlag,
      hasCreditCard,
      totalTipCreditAmountUsd,
      limitRemainingAmountUsd
    )

    expect(newMax).toBe(limitRemainingAmountUsd)
  })
})
