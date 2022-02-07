export interface User {
  newUi?: boolean // todo: remove this when testing the new ui is done
  id: string
  fullName: string
  shortName?: string
  email: string
  profilePicture?: string
  customerId?: string
  canTip?: boolean
  subscription?: {
    active: boolean
    endDate?: string
    trialEndDate?: string
  }
  invitation?: {
    usedAt: string
  }
  currencyPreferences?: {
    code: string
    scale: number
  }
  tipSettings?: {
    totalTipCreditAmountUsd: number
    minTipLimitAmountUsd: number
    limitRemainingAmountUsd: number
    lastTippedAmountUsd: number
    hotkeyTipAmountsUsd: Array<number>
  }
  paymentMethods?: Array<IUserPaymentMethod>
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
