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
`

// TODO: these have changed but is screwing up renovate and aren't really
// used in any deployed version of the extension.
// paymentMethods {
//   id
//   type
//     details {
//   ... on StripeCardDetails {
//       last4
//       brandCode
//     }
//   }
// }

export const whoamiQuery = `{
  whoami {
    ${whoamiSelection}
  }
}`

export async function whoAmI(this: GraphQlClient, token: string) {
  return this.query<WhoAmIData>({ query: whoamiQuery, token })
}
