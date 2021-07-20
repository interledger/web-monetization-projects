import * as cp from 'child_process'
import * as pathMod from 'path'

import {
  debug,
  initBrowserAndLoginFromEnv,
  testMonetization
} from '@coil/puppeteer-utils'

class Server {
  serverHandle?: cp.ChildProcess

  constructor(private cmd: string, private args: string[]) {}

  async start() {
    this.serverHandle = cp.spawn(this.cmd, this.args, { stdio: 'pipe' })
    return new Promise(resolve => {
      this.serverHandle?.stdout?.once('data', resolve)
    })
  }

  stop() {
    this.serverHandle?.kill()
  }
}

async function run() {
  const { context } = await initBrowserAndLoginFromEnv()
  debug('logged in')
  const fixturesDir = pathMod.resolve(__dirname, '../fixtures')
  const server = new Server('yarn', ['http-server', fixturesDir, '-p', '4000'])
  await server.start()
  debug('server.started')
  let success = true
  const testUrls = [
    'http://localhost:4000/multiple-tags-meta-first.html',
    'http://localhost:4000/multiple-tags-link-first.html'
  ]
  for (const url of testUrls) {
    debug(`testing url ${url}`)
    const results = await testMonetization({ context, url })
    debug(`results = ${JSON.stringify(results)}`)
    success =
      success &&
      results.details.events.map(o => o.event.type).join(', ') ===
        'monetizationpending, monetizationstart, monetizationprogress' &&
      results.details.statesSeen.size === 2 &&
      results.details.statesSeen.has('pending') &&
      results.details.statesSeen.has('started')
    if (!success) {
      break
    }
  }

  await server.stop()
  process.exit(success ? 0 : 1)
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
