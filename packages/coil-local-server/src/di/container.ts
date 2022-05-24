import http from 'http'

import { Container } from 'inversify'
import express from 'express'
import { createServer } from 'ilp-protocol-stream'

import { makeConsoleLogger } from '../utils/logger'
import { BTPService } from '../services/btp/BTPService'

import {
  TExpressApp,
  THttpServer,
  THttpServerPort,
  TLogger,
  TStreamServer
} from './tokens'

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
  container.bind(Container).toConstantValue(container)
  container.bind(BTPService).toSelf()

  container
    .bind(TStreamServer)
    .toDynamicValue(async context => {
      const plugin = context.container.get(BTPService).plugin
      return createServer({ plugin })
    })
    .inSingletonScope()

  return container
}
