export const calculateMaxAllowableTip = (
  monetized: boolean,
  inTippingBeta: boolean,
  hasCreditCard: boolean,
  tipCredits: number,
  remainingDailyAmount: number
) => {
  let newMax = 0
  if (!monetized) {
    // if the site is not monetized, the user is not allowed to tip, therefore
    // the max is zero
    return newMax
  }
  if (inTippingBeta && hasCreditCard) {
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
