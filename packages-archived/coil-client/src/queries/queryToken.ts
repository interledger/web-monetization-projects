import { CoilUser } from '../types'
import type { GraphQlClient } from '../graphQlClient'

import { whoamiSelection } from './whoAmI'

export interface QueryTokenData {
  refreshToken: { token: string }
  whoami: CoilUser
}

export const queryTokenQuery = `{
  refreshToken {
    token
  }

  whoami {
    ${whoamiSelection}
  }
}`

export async function queryToken(this: GraphQlClient, token: string) {
  return this.query<QueryTokenData>({ query: queryTokenQuery, token })
}
