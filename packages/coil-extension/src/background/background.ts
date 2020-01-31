import '@abraham/reflection'

import { Container } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { makeLoggerMiddleware } from 'inversify-logger-middleware'
import { HistoryDb } from '@web-monetization/wext/services'

import { API, COIL_DOMAIN, COIL_REDEEMER, COIL_SIGNER } from '../webpackDefines'
import { StorageService } from '../services/storage'
import * as tokens from '../types/tokens'
import { ClientOptions } from '../services/ClientOptions'
import { decorateThirdPartyClasses } from '../services/decorateThirdPartyClasses'

import { BackgroundScript } from './services/BackgroundScript'
import { BackgroundStorageService } from './services/BackgroundStorageService'
import { Stream } from './services/Stream'
import { createLogger } from './services/utils'

async function configureContainer(container: Container) {
  const logger = makeLoggerMiddleware()
  container.applyMiddleware(logger)

  container.bind(tokens.CoilDomain).toConstantValue(COIL_DOMAIN)
  container.bind(tokens.CoilRedeemerUrl).toConstantValue(COIL_REDEEMER)
  container.bind(tokens.CoilSignerUrl).toConstantValue(COIL_SIGNER)
  container.bind(tokens.WextApi).toConstantValue(API)
  container.bind(GraphQlClient.Options).to(ClientOptions)
  container.bind(Storage).toConstantValue(localStorage)
  container.bind(StorageService).to(BackgroundStorageService)
  container.bind(Container).toConstantValue(container)

  container
    .bind(Stream)
    .toSelf()
    .inTransientScope()

  container
    .bind(tokens.NoContextLoggerName)
    .toConstantValue('tokens.NoContextLoggerName')

  container
    .bind(tokens.Logger)
    .toDynamicValue(createLogger)
    .inTransientScope()

  container.bind(tokens.LocalStorageProxy).toDynamicValue(context => {
    return context.container.get(StorageService).makeProxy(['token'])
  })

  const db = await HistoryDb.create()
  container.bind(HistoryDb).toConstantValue(db)
}

async function main() {
  decorateThirdPartyClasses()

  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })

  await configureContainer(container)
  void container.get(BackgroundScript).run()
}

main().catch(console.error)
