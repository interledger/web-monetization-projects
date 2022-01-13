export async function formatTipSettings(
  limitRemainingCents: number,
  lastTippedAmountCents: number,
  inTippingBeta: boolean,
  minimumTipLimitCents: number,
  tipCreditBalanceCents: number
) {
  // convert all tip settings from cents to dollars
  // set default hotkey tip amounts since we don't yet get them from the user
  // add feature flag and minTipLimit
  console.log('--- inside formatter')
  return {
    inTippingBeta: inTippingBeta,
    minimumTipLimit: minimumTipLimitCents
      ? Number(minimumTipLimitCents) / 100
      : 1, // convert from cents to dollars
    remainingDailyAmount: limitRemainingCents
      ? Number(limitRemainingCents) / 100
      : 0, // convert from cents to dollars
    lastTippedAmount: lastTippedAmountCents
      ? Number(lastTippedAmountCents) / 100
      : 1, // convert from cents to dollars
    tipCredits: tipCreditBalanceCents ? Number(tipCreditBalanceCents) / 100 : 1, // convert from cents to dollars
    hotkeyTipAmounts: [1, 2, 5] // dollar amounts - not yet set by user
  }
}
