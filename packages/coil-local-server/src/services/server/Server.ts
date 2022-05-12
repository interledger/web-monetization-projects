import http from 'http'

import { inject, injectable } from 'inversify'

import { ApolloService } from '../apollo/ApolloService'
import { THttpServer, THttpServerPort, TLogger } from '../../di/tokens'
import { Logger } from '../../utils/logger'
import { Env } from '../util/env'

@injectable()
export class Server {
  constructor(
    private apollo: ApolloService,
    @inject(THttpServer)
    private httpServer: http.Server,
    @inject(THttpServerPort)
    private port: number,
    @inject(TLogger)
    private log: Logger,
    private env: Env
  ) {}

  async start() {
    await this.apollo.startAndApplyMiddleware()
    await this.startHttpServer()
    this.log(`🚀 Server ready at http://localhost:${this.env.SERVER_PORT}`)
    this.log(`🚀 GraphQL on ${this.apollo.graphqlPath}`)
  }

  private async startHttpServer() {
    await new Promise<void>(resolve =>
      this.httpServer.listen({ port: this.env.SERVER_PORT }, resolve)
    )
  }
}
