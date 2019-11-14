import '@abraham/reflection'

import { Container } from 'inversify'
import { GraphQlClient } from '@coil/client'

import * as tokens from '../types/tokens'
import { decorateCoilClient } from '../services/decorateThirdPartyClasses'
import { API, COIL_DOMAIN } from '../webpackDefines'
import { ClientOptions } from '../services/ClientOptions'

import { ContentScript } from './services/ContentScript'

function configureContainer(container: Container) {
  container.bind(tokens.ContentRuntime).toConstantValue(API.runtime)
  container.bind(tokens.CoilDomain).toConstantValue(COIL_DOMAIN)
  container.bind(tokens.Window).toConstantValue(window)
  container.bind(tokens.Storage).toConstantValue(localStorage)
  container.bind(tokens.Document).toConstantValue(document)
  container.bind(GraphQlClient.Options).to(ClientOptions)
}

function main() {
  decorateCoilClient()
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })

  configureContainer(container)
  container.get(ContentScript).init()
}

main()
