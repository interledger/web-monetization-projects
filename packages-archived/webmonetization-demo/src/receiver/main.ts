import '@abraham/reflection'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import './SPSP'
import { dbg } from '../utils/logging'
import * as tokens from '../tokens'
import { configureMiddleware } from '../utils/middleware'

import { StreamServer } from './StreamServer'

async function main() {
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton'
  })
  const serverPort = Number(process.env.RECEIVER_PORT || 4000)
  const btpPort = Number(process.env.BTP_PORT || 3000)
  container.bind<number>(tokens.BtpPort).toConstantValue(btpPort)

  const server = new InversifyExpressServer(container)
  server.setConfig(app => {
    configureMiddleware(app)
  })

  const app = server.build()
  await container.get(StreamServer).start()
  app.listen(serverPort, () => {
    dbg(`listening on ${serverPort}`)
  })
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  main().catch(console.error)
}
