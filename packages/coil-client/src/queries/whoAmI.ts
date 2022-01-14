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
// ! --> paymentMethods selection might screwing up renovate and puppetteer jobs on CI
// paymentMethods {
//   id
//   type
//     details {
//       ... on StripeCardDetails {
//       last4
//       brandCode
//       status
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
