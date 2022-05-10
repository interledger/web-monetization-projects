import { Resolvers } from '../generated/graphql'

import { whoami } from './whoami'

export const resolversRoot: Resolvers = {
  Query: {
    whoami
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
