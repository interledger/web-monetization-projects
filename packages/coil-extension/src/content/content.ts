import '@abraham/reflection'

import { Container } from 'inversify'
import { GraphQlClient } from '@coil/client'

import * as tokens from '../types/tokens'
import { decorateCoilClient } from '../services/decorateThirdPartyClasses'
import { API, COIL_DOMAIN } from '../webpackDefines'
import { ClientOptions } from '../services/ClientOptions'
import { Config } from '../services/Config'

import { ContentScript } from './services/ContentScript'
import { ContentConfig } from './services/ContentConfig'

function configureContainer(container: Container) {
  container.bind(tokens.ContentRuntime).toConstantValue(API.runtime)
  container.bind(tokens.Window).toConstantValue(window)
  container.bind(tokens.Storage).toConstantValue(localStorage)
  container.bind(tokens.Document).toConstantValue(document)
  container.bind(Config).to(ContentConfig)
  container.bind(Container).toConstantValue(container)
  container.bind(GraphQlClient.Options).to(ClientOptions)
}

function main(coilDomain: string) {
  decorateCoilClient()
  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })
  container.bind(tokens.CoilDomain).toConstantValue(coilDomain)
  configureContainer(container)
  container.get(ContentScript).init()
}

main(COIL_DOMAIN)
