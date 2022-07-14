import { GraphQlClient } from '../graphQlClient'

export const tipPreviewQuery = `query tipPreview($tipAmountCents: String!) {
  tipPreview(tipAmountCents: $tipAmountCents) {
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
  token?: string,
  tipAmountCents?: string
): Promise<TipPreviewData['tipPreview']> {
  if (!tipAmountCents) {
    tipAmountCents = token
    token = undefined
  }
  const message = await this.query<TipPreviewData>({
    query: tipPreviewQuery,
    token,
    variables: { tipAmountCents }
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
