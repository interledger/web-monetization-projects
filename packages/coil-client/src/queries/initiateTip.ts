import { GraphQlClient } from '../graphQlClient'

export const initiateTipQuery = `query initiateTip($input: InitiateTipInput!) {
  initiateTip(input: $input) {
    code
    message
    success
    tip {
      id
      userId
      amount
      formattedAmount
      destination
      origin
      state 
    }
  }
}`


interface TipData {
  id: string
  userId: string
  amount: string
  formattedAmount: string
  destination: string
  state: string
  origin?: string
}

export interface InitiateTipData {
  initiateTip: {
    code: string
    message: string
    success: boolean
    tip: TipData
  }
}

export interface InitiateTipInput {
  amount: string,
  destination: string,
  origin?: string
}

export async function initiateTip(
  this: GraphQlClient,
  input: InitiateTipInput
): Promise<InitiateTipData['initiateTip']> {
  const message = await this.query<InitiateTipData>({
    query: initiateTipQuery,
    variables: { input }
  })

  return message.data?.initiateTip
}
