import { CoilUser } from '../types'

import { GraphQlClient } from '..'

export interface QueryTokenData {
  refreshToken: { token: string }
  whoami: CoilUser
}

export const queryTokenQuery = `{
  refreshToken {
    token
  }

  whoami {
    id
    fullName
    customerId
    subscription {
      active
    }

    currencyPreferences {
      code
      scale
    }
  }
}`

export async function queryToken(this: GraphQlClient, token: string) {
  return this.query<QueryTokenData>({ query: queryTokenQuery, token })
}
