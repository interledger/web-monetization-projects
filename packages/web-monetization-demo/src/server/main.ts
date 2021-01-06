import '@abraham/reflection'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import './Server'
import { dbg } from '../utils/logging'
import { configureMiddleware } from '../utils/middleware'

async function main() {
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton'
  })
  const serverPort = Number(process.env.SERVER_PORT || 4002)

  const server = new InversifyExpressServer(container)
  server.setConfig(app => {
    configureMiddleware(app)
  })

  const app = server.build()
  app.listen(serverPort, () => {
    dbg(`listening on ${serverPort}`)
  })
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  main().catch(console.error)
}
