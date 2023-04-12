import { GraphQlClient } from '../graphQlClient'

export const tipSettingsQuery = `
  query updateTipSettings {
    whoami {
      tipping {
        lastTippedAmountCentsUsd
        limitRemainingAmountCentsUsd
        totalTipCreditAmountCentsUsd
      }
    }
    minTipLimit {
      minTipLimitAmountCentsUsd
    }
    tippingBetaFeatureFlag: featureEnabled(key: "tipping-beta")
    extensionNewUiFeatureFlag: featureEnabled(key: "extension-new-ui")
  }
`

export interface TipSettingsData {
  whoami: {
    tipping: {
      lastTippedAmountCentsUsd: number
      limitRemainingAmountCentsUsd: number
      totalTipCreditAmountCentsUsd: number
    }
  }
  minTipLimit: {
    minTipLimitAmountCentsUsd: number
  }
  tippingBetaFeatureFlag: boolean
  extensionNewUiFeatureFlag: boolean
}

export async function tipSettings(this: GraphQlClient, token: string) {
  const message = await this.query<TipSettingsData>({
    query: tipSettingsQuery,
    token
  })
  return message
}
