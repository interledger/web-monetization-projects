import '../util/importReflectMetadata'

import { Container, decorate, injectable, unmanaged } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { makeLoggerMiddleware } from 'inversify-logger-middleware'
import { HistoryDb } from '@web-monetization/wext/services'

import { API, COIL_DOMAIN } from '../webpackDefines'
import { StorageService } from '../services/storage'
import * as tokens from '../types/tokens'
import { ClientOptions } from '../services/ClientOptions'
import { decorateThirdPartyClasses } from '../services/decorateThirdPartyClasses'

import { BackgroundScript } from './services/BackgroundScript'
import { BackgroundStorageService } from './services/BackgroundStorageService'

async function configureContainer(container: Container) {
  const logger = makeLoggerMiddleware()
  container.applyMiddleware(logger)

  container.bind(tokens.CoilDomain).toConstantValue(COIL_DOMAIN)
  container.bind(tokens.Storage).toConstantValue(localStorage)
  container.bind(tokens.WextApi).toConstantValue(API)
  container.bind(tokens.Null).toConstantValue(null)
  container.bind(GraphQlClient.Options).to(ClientOptions)
  container.bind(StorageService).to(BackgroundStorageService)
  container.bind(Container).toConstantValue(container)
  container.bind(BackgroundScript).toSelf()

  container.bind(tokens.LocalStorage).toDynamicValue(context => {
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
