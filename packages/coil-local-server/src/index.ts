import http from 'http'
import { join } from 'path'

import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { addResolversToSchema } from '@graphql-tools/schema'

import { resolversRoot } from './graphql/resolvers'

const schema = loadSchemaSync(join(__dirname, './graphql/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
})

export const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers: resolversRoot
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function startApolloServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: schemaWithResolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

if (!module.parent) {
  startApolloServer().catch(console.error)
}
