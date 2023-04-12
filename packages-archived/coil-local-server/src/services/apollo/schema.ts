import { addResolversToSchema } from '@graphql-tools/schema'
import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'

import { resolversRoot } from '../../graphql/resolvers/resolversRoot'
import { fromRoot } from '../../utils/fromRoot'

export const schema = loadSchemaSync(fromRoot('src/graphql/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})
export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: resolversRoot
})
