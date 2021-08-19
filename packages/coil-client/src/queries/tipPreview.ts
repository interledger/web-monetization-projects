import { GraphQlClient } from '../graphQlClient'

import { TipInput } from './tip'

export const tipPreviewQuery = `query tipPreview($input: TipInput!) {
  tipPreview(input: $input) {
    code
    message
    success
    charges {
        creditCardCharge
        tipCreditCharge
    }
  }
}`

interface ChargeData {
  creditCardCharge: string
  tipCreditCharge: string
}

export interface TipPreviewData {
  tipPreview: {
    code: string
    message: string
    success: boolean
    charges: ChargeData
  }
}

export async function tipPreview(
  this: GraphQlClient,
  token: string,
  input: TipInput
): Promise<TipPreviewData['tipPreview']> {
  const message = await this.query<TipPreviewData>({
    query: tipPreviewQuery,
    token,
    variables: { input }
  })

  const tipPreview = message.data?.tipPreview
  const success = tipPreview?.success
  const code = tipPreview?.code
  if (!success) {
    throw new Error(
      `graphql query failed. status=${code} query=\`${tipPreviewQuery}\``
    )
  }

  return tipPreview
}
