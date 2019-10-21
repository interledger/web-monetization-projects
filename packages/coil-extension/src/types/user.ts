export interface User {
  id: string
  fullName: string
  customerId?: string
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
