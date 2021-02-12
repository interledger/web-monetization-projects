// noinspection TypeScriptPreferShortImport
import { GraphQlClient } from '../graphQlClient'

export const refreshBtpTokenQuery = `query Test123($spendMode: SpendMode) {
  refreshBtpToken(spendMode: $spendMode) {
    token
  }
}`

export interface RefreshBtpTokenData {
  refreshBtpToken: { token: string }
}

enum SpendMode {
  DEFAULT = 'DEFAULT',
  BATCH = 'BATCH'
}

export async function refreshBtpToken(this: GraphQlClient, token: string) {
  const response = await this.query<RefreshBtpTokenData>({
    query: refreshBtpTokenQuery,
    token,
    variables: { spendMode: SpendMode.BATCH }
  })
  if (response.data.refreshBtpToken && response.data.refreshBtpToken.token) {
    return response.data.refreshBtpToken.token
  } else {
    throw new Error(`error getting btpToken ${response}`)
  }
}
