import { Container } from 'inversify'
import { makeLoggerMiddleware } from 'inversify-logger-middleware'
import { GraphQlClient } from '@coil/client'
import { StorageService } from '@webmonetization/wext/services'

import * as tokens from '../../types/tokens'
import { ClientOptions } from '../../services/ClientOptions'
import { BackgroundStorageService } from '../services/BackgroundStorageService'
import { Stream } from '../services/Stream'
import { createLogger } from '../services/utils'
import { IDBTokenStore } from '../services/AnonymousTokens'

interface ConfigureContainerParams {
  container: Container
  loggingEnabled: boolean
  coilDomain: string
  btpEndpoint?: string
  wextApi: any
  buildConfig: Record<string, unknown>
  storage: Storage
  getActiveTab: () => Promise<any>
}

export function configureContainer({
  container,
  loggingEnabled,
  coilDomain,
  wextApi,
  buildConfig,
  btpEndpoint,
  storage,
  getActiveTab
}: ConfigureContainerParams) {
  if (loggingEnabled) {
    const logger = makeLoggerMiddleware()
    container.applyMiddleware(logger)
  }

  container.bind(tokens.CoilDomain).toConstantValue(coilDomain)
  container.bind(tokens.UserAgent).toConstantValue(navigator.userAgent)
  container.bind(tokens.WextApi).toConstantValue(wextApi)
  container.bind(tokens.BuildConfig).toConstantValue(buildConfig)
  container.bind(tokens.LoggingEnabled).toConstantValue(loggingEnabled)
  container.bind(GraphQlClient.Options).to(ClientOptions)
  if (btpEndpoint) {
    container.bind(tokens.BtpEndpoint).toConstantValue(btpEndpoint)
  }
  container.bind(Storage).toConstantValue(storage)
  container.bind(StorageService).to(BackgroundStorageService)
  container.bind(Container).toConstantValue(container)
  container.bind(tokens.ActiveTab).toDynamicValue(getActiveTab)
  container.bind(Navigator).toConstantValue(navigator)

  container.bind(Stream).toSelf().inTransientScope()

  container.bind(tokens.TokenStore).to(IDBTokenStore)

  container
    .bind(tokens.NoContextLoggerName)
    .toConstantValue('tokens.NoContextLoggerName')

  container.bind(tokens.Logger).toDynamicValue(createLogger).inTransientScope()

  container.bind(tokens.LocalStorageProxy).toDynamicValue(context => {
    return context.container.get(StorageService).makeProxy(['token'])
  })
}
