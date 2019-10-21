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
  container.bind<number>(tokens.BtpPort).toConstantValue(3000)

  const server = new InversifyExpressServer(container)
  server.setConfig(app => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    )
    app.use(bodyParser.json())
  })

  const app = server.build()
  const port = 4000
  await container.get(StreamServer).start()
  app.listen(port, () => {
    dbg(`listening on ${port}`)
  })
}

if (require.main === module) {
  main().catch(console.error)
}
