import * as http from 'http'
import * as fs from 'fs'
import * as pathMod from 'path'
import { promisify } from 'util'

import { login } from './env'

const PORT = 4000
// eslint-disable-next-line no-console
const log = console.log

/**
 * The purpose of this script is to serve files containing oauth-scripts
 * which require a coil btp token.
 *
 * This will login to coil, using COIL_USER/COIL_PASSWORD sourced from
 * environment variables, finally getting a btp token via a graphql request.
 *
 * The first arg points to a file to be served which will have the symbol
 * $BTP_TOKEN$ replaced with an actual token JSON serialized.
 *
 * Any files referenced by the served file (e.g. <script src='oauth-scripts.js'>)
 * will be served relative to the folder containing the file.
 */
async function main() {
  const fnSpec = process.argv[2]
  const { btpToken } = await login()
  const replaceValue = JSON.stringify(btpToken)
  const fnAbsolute = pathMod.isAbsolute(fnSpec)
    ? fnSpec
    : pathMod.resolve(process.cwd(), fnSpec)
  const fnWd = pathMod.dirname(fnAbsolute)
  log({ fnSpec, fnWd, fnAbsolute, btpToken })

  const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
      const html = await promisify(fs.readFile)(fnSpec, { encoding: 'utf8' })
      res.end(html.replace('$BTP_TOKEN$', replaceValue))
    } else if (req.url) {
      const path = pathMod.resolve(fnWd, './' + req.url)
      if (await promisify(fs.exists)(path)) {
        const stream = fs.createReadStream(path)
        stream.pipe(res)
      } else {
        res.writeHead(404)
        res.end()
      }
    }
  })
  server.listen(PORT, () => {
    log('$BTP_TOKEN will be replaced in', fnSpec)
    log('listening on', PORT, 'serving', fnSpec, 'working dir', fnWd)
  })
}

if (require.main === module) {
  main().catch(console.error)
}
