import { CoilUser } from '../types'
import type { GraphQlClient } from '../graphQlClient'

export interface WhoAmIData {
  whoami: CoilUser
}

export const whoamiSelection = `
    id
    fullName
    shortName
    email
    profilePicture
    customerId
    canTip

    subscription {
      active
      endDate
      trialEndDate
    }

    currencyPreferences {
      code
      scale
    }

    paymentMethods {
      id
      type
        details {
          ... on StripeCardDetails {
          last4
          brandCode
          status
        }
      }
    }
`
// ! --> paymentMethods selection might screwing up renovate and puppetteer jobs on CI

export const whoamiQuery = `{
  whoami {
    ${whoamiSelection}
  }
}`

export async function whoAmI(this: GraphQlClient) {
  return this.query<WhoAmIData>({ query: whoamiQuery })
}
