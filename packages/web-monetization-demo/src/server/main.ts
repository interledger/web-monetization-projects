import './abrahamReflection'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import './SPSP'
import { StreamServer } from './StreamServer'
import * as tokens from './tokens'

const dbg = console.log

async function main() {
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton'
  })
  const serverPort = Number(process.env.SERVER_PORT || 4000)
  const btpPort = Number(process.env.BTP_PORT || 3000)
  container.bind<number>(tokens.BtpPort).toConstantValue(btpPort)

  const server = new InversifyExpressServer(container)
  server.setConfig(app => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    )
    app.use(bodyParser.text())
  })

  const app = server.build()
  await container.get(StreamServer).start()
  app.listen(serverPort, () => {
    dbg(`listening on ${serverPort}`)
  })
}

if (require.main === module) {
  main().catch(console.error)
}
