import * as http from 'http'
import { existsSync, readFile } from 'fs'
import { exec } from 'child_process'
import { promisify } from 'util'
import * as pathMod from 'path'

import { env, initBrowser, testMonetization } from '@coil/puppeteer-utils'
import * as coilClient from '@coil/client'
import { BrowserContext } from 'puppeteer'

const fromHere = (path: string) => pathMod.resolve(__dirname, path)
const readFileAsync = promisify(readFile)

let httpServer: http.Server
let context: BrowserContext

const log = console.log
const SCRIPT_PATH = fromHere('../../build/coil-oauth-wm.js')
const PORT = 5444

// Effects all hooks and tests in the file
jest.setTimeout(120e3)

async function getBtpTokenFromEnv() {
  const user = env.COIL_USER
  const password = env.COIL_PASSWORD
  const client = new coilClient.GraphQlClient(
    new coilClient.GraphQlClientOptions()
  )
  const token = await client.login(user, password)
  return await client.refreshBtpToken(token)
}

async function buildOauthScript() {
  const command = 'yarn run build'
  const cwd = fromHere('../..')
  log('running', command, 'from', cwd)
  await promisify(exec)(command, {
    cwd: cwd
  })
  log('command finished')
}

async function setUpHttpServer(btpTokenPromise: Promise<string>) {
  const js = readFileAsync(SCRIPT_PATH).then(buf => buf.toString())
  const html = readFileAsync(fromHere('../fixtures/index.html')).then(buf =>
    buf.toString()
  )

  const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
      res.end(
        (await html).replace(
          /'\$BTP_TOKEN\$'/g,
          JSON.stringify(await btpTokenPromise)
        )
      )
    } else if (req.url === `/build/${pathMod.basename(SCRIPT_PATH)}`) {
      res.end(await js)
    }
  })
  await new Promise<void>(resolve => {
    server.listen(PORT, () => {
      log('listening on', PORT)
      resolve()
    })
  })
  return server
}

beforeAll(async () => {
  try {
    // Can run potentially for a long time if need to build the oauth script

    if (!existsSync(SCRIPT_PATH)) {
      await buildOauthScript()
    }

    const btpTokenPromise = getBtpTokenFromEnv()
    const serverPromise = setUpHttpServer(btpTokenPromise)
    const browserPromise = initBrowser({ loadExtension: false })

    context = await browserPromise
    httpServer = await serverPromise
  } catch (e) {
    log('error in beforeAll', e)
    throw e
  }
})

afterAll(async () => {
  await promisify(httpServer.close.bind(httpServer))
  httpServer.unref()
  await context.browser().close()
})

describe('OAuthScripts', () => {
  jest.retryTimes(3)

  it('should get a non zero monetizationprogress event', async () => {
    await testMonetization({
      context,
      url: `http://localhost:${PORT}`,
      newPage: false
    })
  })
})
