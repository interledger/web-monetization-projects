import { Resolvers } from '../generated/graphql'

import { whoami } from './whoami'

export const resolversRoot: Resolvers = {
  Query: {
    whoami
  }
}
