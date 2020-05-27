import '@abraham/reflection'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import './Server'
import { configureMiddleware } from '../utils/middleware'
import { dbg } from '../utils/logging'

async function main() {
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton'
  })
  const verifierPort = Number(process.env.VERIFIER_PORT || 4001)

  const server = new InversifyExpressServer(container)
  server.setConfig(app => {
    configureMiddleware(app)
  })
  const app = server.build()
  app.listen(verifierPort, () => {
    dbg(`listening on ${verifierPort}`)
  })
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  main().catch(console.error)
}
