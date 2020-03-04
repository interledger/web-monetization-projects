export interface User {
  id: string
  fullName: string
  customerId?: string
  canTip?: boolean
  subscription?: {
    active: boolean
  }
  invitation?: {
    usedAt: string
  }
  currencyPreferences?: {
    code: string
    scale: number
  }
}
