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
    inTippingBeta?: boolean
    tipCredits?: number
    minimumTipLimit: number
    remainingDailyAmount: number
    lastTippedAmount: number
    hotkeyTipAmounts: Array<number>
  }
  paymentMethods?: Array<IUserPaymentMethod>
  tipCredits?: number // todo might need to update once we connect to api
}

export interface IUserPaymentMethod {
  id: string
  type: string
  details: {
    last4: string
    brandCode: string
  } | null
}
