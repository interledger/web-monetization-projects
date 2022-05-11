import { Resolvers } from '../generated/graphql'

import { whoami } from './whoami'
import { adaptedPage } from './adaptedPage'
import { featureEnabled } from './featureEnabled'
import { login } from './login'

export const resolversRoot: Resolvers = {
  Mutation: {
    login
  },
  Query: {
    whoami,
    adaptedPage,
    featureEnabled
  },
  User: {
    currencyPreferences: (parent, args, context, info) => {
      return {
        code: 'USD',
        scale: 1
      }
    }
  }
}
