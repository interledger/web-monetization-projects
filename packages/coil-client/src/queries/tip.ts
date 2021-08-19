import { GraphQlClient } from '../graphQlClient'

export const tipQuery = `mutation tip($input: TipInput!) {
  tip(input: $input) {
    code
    message
    success
  }
}`

export interface tipData {
  tip: {
    code: string
    message: string
    success: boolean
  }
}

export interface TipInput {
  tipAmountCents: string
  destination: string
  origin?: string
}

export async function tip(
  this: GraphQlClient,
  token: string,
  input: TipInput
): Promise<tipData['tip']> {
  const message = await this.query<tipData>({
    query: tipQuery,
    token,
    variables: { input }
  })

  const tip = message.data?.tip
  const success = tip?.success
  const code = tip?.code
  if (!success) {
    throw new Error(
      `graphql query failed. status=${code} query=\`${tipQuery}\``
    )
  }

  return tip
}
