import { CoilUser } from '../types'

import { GraphQlClient } from '..'

export interface WhoAmIData {
  whoami: CoilUser
}

// TODO: when in staging amend this with canTip
export const whoamiQuery = `{
  whoami {
    id
    fullName
    customerId
    canTip

    subscription {
      active
    }

    currencyPreferences {
      code
      scale
    }
  }
}`

export async function whoAmI(this: GraphQlClient, token: string) {
  return this.query<WhoAmIData>({ query: whoamiQuery, token })
}
