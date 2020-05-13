import './abrahamReflection'
import * as bodyParser from 'body-parser'
import { InversifyExpressServer } from 'inversify-express-utils'
import { Container } from 'inversify'

import './SPSP'

const dbg = console.log

async function main() {
  const container = new Container({
    autoBindInjectable: true,
    defaultScope: 'Singleton'
  })
  const verifierPort = Number(process.env.VERIFIER_PORT || 4001)

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
  app.listen(verifierPort, () => {
    dbg(`listening on ${verifierPort}`)
  })
}

if (require.main === module) {
  main().catch(console.error)
}
