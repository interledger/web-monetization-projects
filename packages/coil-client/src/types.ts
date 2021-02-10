export interface GraphQlError {
  message: string
}

export interface GraphQlResponse<T> {
  data: T
  errors: GraphQlError[]
}

export interface CoilUser {
  id: string
  fullName: string
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
}
