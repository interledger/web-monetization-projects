import { GraphQlClient } from '../graphQlClient'

export const tipSettingsQuery = `
  query updateTipSettings {
    whoami {
      tipping {
        lastTippedAmount
        limitRemaining
      }
    }
    minTipLimit {
      minTipLimit
    }
    getUserTipCredit {
        balance
    }
    tippingBetaFeatureFlag: featureEnabled(key: "tipping-beta")
    extensionNewUiFeatureFlag: featureEnabled(key: "extension-new-ui")
  }
`

export interface TipSettingsData {
  whoami: {
    tipping: {
      lastTippedAmount: number
      limitRemaining: number
    }
  }
  minTipLimit: {
    minTipLimit: string
  }
  getUserTipCredit: {
    balance: number
  }
  tippingBetaFeatureFlag: boolean
  extensionNewUiFeatureFlag: boolean
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
