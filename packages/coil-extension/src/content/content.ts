// This is done first thing at `document_start` so that the token will be
// unavailable to coil.com, which will then allow login with cookies to proceed.
import './util/clearCoilAuthToken'

import '@abraham/reflection'

import { Container } from 'inversify'
import { GraphQlClientOptions } from '@coil/client'
import { inversifyModule } from '@dier-makr/inversify'
import { GlobalModule } from '@dier-makr/annotations'
import { wmPolyfill } from '@webmonetization/wext/content'

import * as tokens from '../types/tokens'
import { API, BUILD_CONFIG, COIL_DOMAIN } from '../webpackDefines'
import { ClientOptions } from '../services/ClientOptions'
import { isLoggingEnabled } from '../util/isLoggingEnabled'

import { ContentScript } from './services/ContentScript'

async function configureContainer(container: Container) {
  container.bind(tokens.LoggingEnabled).toDynamicValue(async () => {
    return isLoggingEnabled(BUILD_CONFIG)
  })
  container.bind(tokens.BuildConfig).toConstantValue(BUILD_CONFIG)
  container.bind(tokens.ContentRuntime).toConstantValue(API.runtime)
  container.bind(tokens.CoilDomain).toConstantValue(COIL_DOMAIN)
  container.bind(tokens.PolyfillCode).toConstantValue(wmPolyfill)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const noop = (..._: unknown[]) => undefined
  container
    .bind(tokens.Logger)
    .toConstantValue(noop)
    .whenTargetNamed('CoilClient')
  container.bind(GraphQlClientOptions).to(ClientOptions)
  container.bind(Storage).toConstantValue(localStorage)
  container.bind(Window).toConstantValue(window)
  container.bind(Document).toConstantValue(document)
}

async function main() {
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })
  inversifyModule(GlobalModule)
  await configureContainer(container)
  const contentScript = await container.getAsync(ContentScript)
  contentScript.init()
}

// eslint-disable-next-line no-console
main().catch(console.error)
