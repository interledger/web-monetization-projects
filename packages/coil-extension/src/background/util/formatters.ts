export async function formatTipSettings(
  token: string,
  limitRemaining: any,
  lastTippedAmount: any,
  featureFlagResp: any,
  minTipLimitResp: any
) {
  // convert all tip settings from cents to dollars
  // set default hotkey tip amounts since we don't yet get them from the user
  // add feature flag and minTipLimit
  return {
    inTippingBeta: featureFlagResp.data.featureEnabled,
    minimumTipLimit: minTipLimitResp.data.minTipLimit.minTipLimit
      ? Number(minTipLimitResp.data.minTipLimit.minTipLimit) / 100
      : 1, // convert from cents to dollars
    remainingDailyAmount: limitRemaining ? Number(limitRemaining) / 100 : 0, // convert from cents to dollars
    lastTippedAmountUSD: limitRemaining ? Number(lastTippedAmount) / 100 : 1, // convert from cents to dollars
    hotkeyTipAmounts: [1, 2, 5] // dollar amounts - not yet set by user
  }
}
