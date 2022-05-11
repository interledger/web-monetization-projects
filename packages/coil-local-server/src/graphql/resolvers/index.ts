import { Resolvers } from '../generated/graphql'

import { whoami } from './whoami'
import { adaptedPage } from './adaptedPage'
import { featureEnabled } from './featureEnabled'
import { login } from './login'
import { refreshToken } from './refreshToken'
import { refreshBtpToken } from './refreshBtpToken'

export const resolversRoot: Resolvers = {
  Mutation: {
    login
  },
  Query: {
    whoami,
    adaptedPage,
    featureEnabled,
    refreshToken,
    refreshBtpToken
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
