type FormattedTipSettings = {
  minimumTipLimit: number
  remainingDailyAmount: number
  lastTippedAmount: number
  tipCredits: number
  hotkeyTipAmounts: Array<number>
}

export async function formatTipSettings(
  limitRemainingCents: number,
  lastTippedAmountCents: number,
  minimumTipLimitCents: number,
  tipCreditBalanceCents: number
): Promise<FormattedTipSettings> {
  // convert all tip settings from cents to dollars
  // set default hotkey tip amounts since we don't yet get them from the user
  return {
    minimumTipLimit: minimumTipLimitCents
      ? Number(minimumTipLimitCents) / 100
      : 1, // convert from cents to dollars
    remainingDailyAmount: limitRemainingCents
      ? Number(limitRemainingCents) / 100
      : 0, // convert from cents to dollars
    lastTippedAmount: lastTippedAmountCents
      ? Number(lastTippedAmountCents) / 100
      : 1, // convert from cents to dollars
    tipCredits: tipCreditBalanceCents ? Number(tipCreditBalanceCents) / 100 : 0, // convert from cents to dollars
    hotkeyTipAmounts: [1, 2, 5] // dollar amounts - not yet set by user
  }
}
