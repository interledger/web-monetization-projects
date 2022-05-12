import http from 'http'

import { Container } from 'inversify'
import express from 'express'

import { makeConsoleLogger } from '../utils/logger'

import { TExpressApp, THttpServer, THttpServerPort, TLogger } from './tokens'

export function makeDefaultContainer() {
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })
  const app = express()
  container.bind(TExpressApp).toConstantValue(app)

  const httpServer = http.createServer(app)
  container.bind(THttpServer).toConstantValue(httpServer)

  const port = 4000
  container.bind(THttpServerPort).toConstantValue(port)

  const logger = makeConsoleLogger()
  container.bind(TLogger).toConstantValue(logger)

  return container
}
