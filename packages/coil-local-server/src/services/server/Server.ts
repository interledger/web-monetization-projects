import http from 'http'

import { Container, inject, injectable } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import express from 'express'
import * as bodyParser from 'body-parser'

import { ApolloService } from '../apollo/ApolloService'
import {
  TExpressApp,
  THttpServer,
  THttpServerPort,
  TLogger
} from '../../di/tokens'
import { Logger } from '../../utils/logger'
import { Env } from '../util/env'
import { StreamService } from '../stream/StreamService'

// Controllers
import '../spsp/SPSPController'
import '../anon-tokens/AnonTokenIssuerController'
import '../handler/HandlerController'

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
    private env: Env,
    private stream: StreamService,
    private container: Container,
    @inject(TExpressApp)
    private app: express.Application
  ) {}

  async start() {
    this.addMiddleWare()
    this.addControllers()
    await this.apollo.startAndApplyMiddleware()
    await this.startHttpServer()
    this.log(`🚀 Server ready at http://localhost:${this.env.SERVER_PORT}`)
    this.log(`🚀 GraphQL on ${this.apollo.graphqlPath}`)
  }

  private addControllers() {
    const controllers = new InversifyExpressServer(
      this.container,
      null,
      null,
      this.app
    )
    controllers.build()
  }

  private async startHttpServer() {
    await new Promise<void>(resolve =>
      this.httpServer.listen({ port: this.env.SERVER_PORT }, resolve)
    )
  }

  addMiddleWare() {
    const app = this.app
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    )
    app.use(bodyParser.json())
    app.use(bodyParser.text())
    app.use('*', (req, res, next) => {
      res.set('Access-Control-Allow-Origin', '*')
      res.set('Access-Control-Allow-Headers', '*')
      next()
    })
  }
}
