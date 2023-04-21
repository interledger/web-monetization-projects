import * as cp from 'child_process'
import * as pathMod from 'path'
import process from 'process'

import getPort from 'get-port'
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
    return new Promise((resolve, reject) => {
      this.serverHandle?.stdout?.once('data', resolve)
      this.serverHandle?.stderr?.once('data', err => reject(err.toString()))
    })
  }

  get pid() {
    return this.serverHandle?.pid
  }

  stop() {
    // Kill it real dead with -9
    this.serverHandle?.kill(9)
  }
}

async function run() {
  const { context } = await initBrowserAndLoginFromEnv()
  debug('logged in')
  const fixturesDir = pathMod.resolve(__dirname, '../fixtures')
  const port = await getPort()
  debug('Starting server on port: ', port)
  const server = new Server('pnpm', [
    'http-server',
    fixturesDir,
    '-p',
    port.toString()
  ])

  const usingStaging = process.env.COIL_DOMAIN?.includes('staging')
  const paymentPointer = usingStaging
    ? 'ilp-sandbox.uphold.com/2mk2AXqH2aRq'
    : 'ilp.uphold.com/gRa4mXFEMYrL'
  const suffix = usingStaging ? '-staging' : ''

  process.addListener('exit', async () => {
    debug('Force killing http-server with pid=', server.pid)
    await server.stop()
  })

  await server.start()

  debug('server.started')
  let success = true
  const testUrls = [
    `http://localhost:${port}/multiple-tags-meta-first${suffix}.html`,
    `http://localhost:${port}/multiple-tags-link-first${suffix}.html`
  ]
  for (const url of testUrls) {
    debug(`testing url ${url}`)
    const results = await testMonetization({ context, url })
    debug(
      'results.details.statesSeen instanceof Set',
      results.details.statesSeen instanceof Set
    )
    debug(
      `results = ${JSON.stringify(
        results.details,
        (key, value) =>
          value instanceof Set ? Array.from(value.values()) : value,
        2
      )}`
    )
    const initialEvents = results.details.events
      .slice(0, 3)
      .map(o => o.event.type)
      .join(', ')

    const trailingEventsSet = Array.from(
      new Set(results.details.events.slice(3).map(o => o.event.type))
    ).join(', ')

    debug('initialEvents', initialEvents)
    debug('trailingEventsSet', trailingEventsSet)

    const paymentPointerCorrect =
      results.details.events[0].event.detail.paymentPointer.endsWith(
        paymentPointer
      )

    debug({ paymentPointerCorrect })

    success =
      success &&
      paymentPointerCorrect &&
      initialEvents ===
        'monetizationpending, monetizationstart, monetizationprogress' &&
      (trailingEventsSet === 'monetizationprogress' ||
        trailingEventsSet === '') &&
      results.details.statesSeen.size === 2 &&
      results.details.statesSeen.has('pending') &&
      results.details.statesSeen.has('started')
    if (!success) {
      break
    }
  }

  await server.stop()
  debug({ success })
  process.exit(success ? 0 : 1)
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
