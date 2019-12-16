import {
  debug,
  initBrowserAndLoginFromEnv,
  testMonetization
} from '@coil/puppeteer-utils'

import { testUrls } from './testUrls'

async function run() {
  const { browser } = await initBrowserAndLoginFromEnv()
  const { success: youtubeRes } = await testMonetization({
    browser,
    url: testUrls.youtubeUrl
  })
  debug('Youtube Result=', youtubeRes)
  const { success: twitchRes } = await testMonetization({
    browser,
    url: testUrls.twitchUrl
  })
  debug('Twitch Result=', twitchRes)
  // noinspection ES6MissingAwait
  void browser.close()
  process.exit(youtubeRes && twitchRes ? 0 : 1)
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
