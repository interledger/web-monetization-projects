import '@abraham/reflection'

import { Container } from 'inversify'
import { GraphQlClientOptions } from '@coil/client'
import { inversifyModule } from '@dier-makr/inversify'
import { GlobalModule } from '@dier-makr/annotations'

import * as tokens from '../types/tokens'
import { API, COIL_DOMAIN } from '../webpackDefines'
import { ClientOptions } from '../services/ClientOptions'

import { ContentScript } from './services/ContentScript'

function configureContainer(container: Container) {
  container.bind(tokens.ContentRuntime).toConstantValue(API.runtime)
  container.bind(tokens.CoilDomain).toConstantValue(COIL_DOMAIN)
  container.bind(tokens.WextApi).toConstantValue(API)
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

function main() {
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })
  inversifyModule(GlobalModule)
  configureContainer(container)
  container.get(ContentScript).init()
}
main()
