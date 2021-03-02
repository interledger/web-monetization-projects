import {
  debug,
  env,
  initBrowserAndLoginFromEnv,
  testMonetization
} from '@coil/puppeteer-utils'

import { testUrls } from './testUrls'

async function run() {
  const { context } = await initBrowserAndLoginFromEnv()

  let success = true
  for (const [name, url] of Object.entries(testUrls[env.COIL_DOMAIN])) {
    const { success: siteResult } = await testMonetization({
      context,
      url: url
    })
    if (!siteResult) {
      success = false
    }
    debug('%s Result=%s', name, siteResult)
  }

  // noinspection ES6MissingAwait
  void context.close()
  process.exit(success ? 0 : 1)
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
