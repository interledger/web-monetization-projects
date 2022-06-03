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
  input: TipInput
): Promise<TipData['tip']> {
  const message = await this.query<TipData>({
    query: tipQuery,
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
