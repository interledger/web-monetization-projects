export interface GraphQlResponse<T> {
  data: T
}

export interface CoilUser {
  id: string
  fullName: string
  shortName?: string
  email: string
  profilePicture?: string
  customerId?: string
  subscription?: {
    active: boolean
    endDate?: string
    trialEndDate?: string
  }
  currencyPreferences?: {
    code: string
    scale: number
  }
  tipping?: {
    lastTippedAmount: string
    limitRemaining: string
  }
  paymentMethods?: Array<ICoilUserPaymentMethod>
}

interface ICoilUserPaymentMethod {
  id: string
  type: string
  details: {
    last4: string
    brandCode: string
  } | null
}
