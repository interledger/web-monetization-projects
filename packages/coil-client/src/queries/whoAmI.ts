import { CoilUser } from '../types'
import { GraphQlClient } from '..'

export interface WhoAmIData {
  whoami: CoilUser
}

export const whoamiQuery = `{
  whoami {
    id
    fullName
    customerId
    canTip

    subscription {
      active
      endDate
      trialEndDate
    }

    tipCredit {
      type
      balanceCents
      lastRenewed
      renewTo
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
