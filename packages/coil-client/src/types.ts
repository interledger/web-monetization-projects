export interface GraphQlResponse<T> {
  data: T
}

export interface CoilUser {
  id: string
  fullName: string
  customerId?: string
  subscription?: {
    active: boolean
  }
  currencyPreferences?: {
    code: string
    scale: number
  }
}
