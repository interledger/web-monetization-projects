import { TipSettingsData } from '@coil/client'

import { TipSettings } from '../../types/user'
import { convertCentsToDollars } from '../../util/convertUsdAmounts'

export function formatTipSettings(data: TipSettingsData): {
  tipSettings: TipSettings
  tippingBetaFeatureFlag: boolean
  extensionNewUiFeatureFlag: boolean
} {
  // destructuring response values and setting defaults
  const {
    whoami,
    minTipLimit,
    tippingBetaFeatureFlag,
    extensionNewUiFeatureFlag
  } = data

  const {
    lastTippedAmountCentsUsd = 0,
    limitRemainingAmountCentsUsd = 0,
    totalTipCreditAmountCentsUsd = 0
  } = whoami?.tipping ?? {}

  const { minTipLimitAmountCentsUsd = 100 } = minTipLimit ?? {}

  const tipSettings = {
    totalTipCreditAmountUsd: convertCentsToDollars(
      totalTipCreditAmountCentsUsd
    ),
    minTipLimitAmountUsd: convertCentsToDollars(minTipLimitAmountCentsUsd),
    limitRemainingAmountUsd: convertCentsToDollars(
      limitRemainingAmountCentsUsd
    ),
    lastTippedAmountUsd: convertCentsToDollars(lastTippedAmountCentsUsd),
    hotkeyTipAmountsUsd: [1, 2, 5] // not yet set by user
  }

  return {
    tipSettings,
    tippingBetaFeatureFlag,
    extensionNewUiFeatureFlag
  }
}
