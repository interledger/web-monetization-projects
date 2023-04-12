import { CoilUser } from '@coil/client'

export interface TipSettings {
  totalTipCreditAmountUsd: number
  minTipLimitAmountUsd: number
  limitRemainingAmountUsd: number
  lastTippedAmountUsd: number
  hotkeyTipAmountsUsd: Array<number>
}

export interface User extends CoilUser {
  invitation?: {
    usedAt: string
  }
  tipSettings?: TipSettings
  tippingBetaFeatureFlag?: boolean
  extensionNewUiFeatureFlag?: boolean
}

export interface IUserPaymentMethod {
  id: string
  type: string
  details: {
    last4: string
    brandCode: string
    status: string
  } | null
}
