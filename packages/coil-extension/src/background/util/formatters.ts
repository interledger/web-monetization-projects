type FormattedTipSettings = {
  minimumTipLimit: number
  remainingDailyAmount: number
  lastTippedAmount: number
  tipCredits: number
  hotkeyTipAmounts: Array<number>
  maxAllowableTipAmount: number
}

//* the maxAllowableTip is primarily responsible for disabling tipping inputs
//* retuns max tip amount USD according to constraints
//* a zero max tip amount will disable tip inputs
export const calculateMaxAllowableTip = (
  siteIsMonetized: boolean,
  tippingBetaFeatureFlag: boolean,
  hasCreditCard: boolean,
  tipCredits: number,
  remainingDailyAmount: number
) => {
  let newMax = 0
  if (!siteIsMonetized) {
    // if the site is not monetized the max amount should default to $0
    return newMax
  }
  if (tippingBetaFeatureFlag && hasCreditCard) {
    // if the user is in the beta they are allowed to use a cc
    // if the user has a cc the only limit that matters is the max daily
    newMax = remainingDailyAmount
  } else {
    // user is not in beta and can only tip with credits
    // if credits is less than daily limit -> limit is credits
    // if credits is greater than daily limit -> limit is daily limit
    if (tipCredits < remainingDailyAmount) {
      newMax = tipCredits
    } else {
      newMax = remainingDailyAmount
    }
  }
  return newMax
}

export async function formatTipSettings(
  siteIsMonetized: boolean,
  tippingBetaFeatureFlag: boolean,
  hasCreditCard: boolean,
  limitRemainingCents: number,
  lastTippedAmountCents: number,
  minimumTipLimitCents: number,
  tipCreditBalanceCents: number
): Promise<FormattedTipSettings> {
  // convert all tip settings from cents to dollars
  // set default hotkey tip amounts since we don't yet get them from the user
  const minimumTipLimitUSD = minimumTipLimitCents
    ? Number(minimumTipLimitCents) / 100
    : 1
  const remainingDailyAmountUSD = limitRemainingCents
    ? Number(limitRemainingCents) / 100
    : 0
  const lastTippedAmountUSD = lastTippedAmountCents
    ? Number(lastTippedAmountCents) / 100
    : 1
  const tipCreditsUSD = tipCreditBalanceCents
    ? Number(tipCreditBalanceCents) / 100
    : 0

  const maxAllowableTipAmountUSD = calculateMaxAllowableTip(
    siteIsMonetized,
    tippingBetaFeatureFlag,
    hasCreditCard,
    tipCreditsUSD,
    remainingDailyAmountUSD
  )

  return {
    minimumTipLimit: minimumTipLimitUSD,
    remainingDailyAmount: remainingDailyAmountUSD,
    lastTippedAmount: lastTippedAmountUSD,
    tipCredits: tipCreditsUSD,
    maxAllowableTipAmount: maxAllowableTipAmountUSD,
    hotkeyTipAmounts: [1, 2, 5] // dollar amounts - not yet set by user
  }
}
