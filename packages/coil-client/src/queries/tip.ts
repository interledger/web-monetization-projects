import { GraphQlClient } from '../graphQlClient'

// TODO: add charges
export const tipQuery = `mutation tip($input: TipInput!) {
  tip(input: $input) {
    code
    message
    success
  }
}`

export interface TipData {
  tip: {
    code: string
    message: string
    success: boolean
  }
}

export interface TipInput {
  amountCentsUsd: string
  destination: string
  origin?: string
}

export async function tip(
  this: GraphQlClient,
  token: string | TipInput,
  input?: TipInput
): Promise<TipData['tip']> {
  let authToken: string | undefined
  if (!input && typeof token !== 'string') {
    input = token
    authToken = undefined
  } else if (typeof token === 'string') {
    authToken = token
  }
  const message = await this.query<TipData>({
    query: tipQuery,
    token: authToken,
    variables: { input }
  })

  const tip = message.data?.tip
  const success = tip?.success
  const code = tip?.code
  if (!success) {
    const errorMsg =
      tip.message && tip.message !== '' ? tip.message : 'Something went wrong'
    throw new Error(errorMsg)
  }

  return tip
}
