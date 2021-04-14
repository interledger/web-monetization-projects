import { CoilUser } from '../types'
import type { GraphQlClient } from '../graphQlClient'

export interface WhoAmIData {
  whoami: CoilUser
}

export const whoamiSelection = `
    id
    fullName
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

export const whoamiQuery = `{
  whoami {
    ${whoamiSelection}
  }
}`

//* commented out for testing
// export const whoamiQuery = `{
//   whoami {
//     id
//     fullName
//     customerId
//     canTip

//     tipSettings {
//       id
//       dailyLimit
//       formattedDailyLimit
//     }

//     subscription {
//       active
//       endDate
//       trialEndDate
//     }

//     currencyPreferences {
//       code
//       scale
//     }
//   }
// }`

export async function whoAmI(this: GraphQlClient, token: string) {
  return this.query<WhoAmIData>({ query: whoamiQuery, token })
}
