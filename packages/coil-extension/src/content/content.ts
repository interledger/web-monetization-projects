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
  container.bind(tokens.Logger).toConstantValue(console.log)
  container.bind(GraphQlClientOptions).to(ClientOptions)
  container.bind(Storage).toConstantValue(localStorage)
  container.bind(Window).toConstantValue(window)
  container.bind(Document).toConstantValue(document)
}

function main() {
  console.log(
    '%c coil-extension content.ts',
    'color: red;',
    window.location.href
  )
  inversifyModule(GlobalModule)

  const container = new Container({
    defaultScope: 'Singleton',
    autoBindInjectable: true
  })

  configureContainer(container)
  container.get(ContentScript).init()
}

main()
