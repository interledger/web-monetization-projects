// noinspection TypeScriptPreferShortImport
import type { GraphQlClient } from '../graphQlClient'

export const refreshBtpTokenQuery = `{
  refreshBtpToken {
    token
  }
}`

export interface RefreshBtpTokenData {
  refreshBtpToken: { token: string }
}

export async function refreshBtpToken(this: GraphQlClient) {
  const response = await this.query<RefreshBtpTokenData>({
    query: refreshBtpTokenQuery
  })
  if (response.data.refreshBtpToken && response.data.refreshBtpToken.token) {
    return response.data.refreshBtpToken.token
  } else {
    throw new Error(`error getting btpToken ${response}`)
  }
}
