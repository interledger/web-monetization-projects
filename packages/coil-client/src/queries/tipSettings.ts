import { GraphQlClient } from '../graphQlClient'

export const tipSettingsQuery = `
  query updateTipSettings {
    whoami {
      id
      tipping {
        lastTippedAmount
        limitRemaining
      }
      tipCredit {
        balanceCents
      }
    }
    minTipLimit {
      minTipLimit
    }
  }
`

export interface TipSettingsData {
  whoami: {
    id: string
    tipping: {
      lastTippedAmount: number
      limitRemaining: number
    }
    tipCredit: {
      balanceCents: number
    }
  }
  minTipLimit: {
    minTipLimit: string
  }
}

export async function tipSettings(this: GraphQlClient, token: string) {
  const message = await this.query<TipSettingsData>({
    query: tipSettingsQuery,
    token
  })

  if (!message.data?.whoami?.tipping) {
    throw new Error(
      `graphql query failed. query=\`${tipSettingsQuery}\`. could not get tipping selection`
    )
  }
  if (!message.data?.minTipLimit) {
    throw new Error(
      `graphql query failed. query=\`${tipSettingsQuery}\`. could not get minTipLimit selection`
    )
  }

  return message
}
