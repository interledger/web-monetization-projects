import '@abraham/reflection'

import http from 'http'

import { Container, inject, injectable } from 'inversify'
import { ApolloServer, ExpressContext } from 'apollo-server-express'
import express from 'express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

import { Context } from '../../types/context'
import { TExpressApp, THttpServer } from '../../di/tokens'

import { schemaWithResolvers } from './schema'

@injectable()
export class ApolloService {
  private server: ApolloServer
  constructor(
    @inject(TExpressApp)
    private app: express.Application,
    @inject(THttpServer)
    private httpServer: http.Server,
    private container: Container
  ) {
    this.server = new ApolloServer({
      schema: schemaWithResolvers,
      context: this.createContext.bind(this),
      csrfPrevention: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
  }

  /**
   * You must `await server.start()` before calling `server.applyMiddleware()`
   */
  async startAndApplyMiddleware() {
    await this.server.start()
    const path = '/gateway'
    this.server.applyMiddleware({ app: this.app, path: path })
  }

  get graphqlPath() {
    return this.server.graphqlPath
  }

  async createContext(expressContext: ExpressContext): Promise<Context> {
    return {
      container: this.container,
      // TODO
      userId: '2',
      log: console.log
    }
  }
}
