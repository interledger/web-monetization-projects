import { Page } from 'puppeteer'

import { CF_ACCESS_CLIENT_ID, CF_ACCESS_CLIENT_SECRET } from './env'
import { debug } from './debug'

export async function addCloudFlareAccessHeaders(page: Page) {
  if (CF_ACCESS_CLIENT_ID && CF_ACCESS_CLIENT_SECRET) {
    debug('sending CF_ACCESS_CLIENT_ID', CF_ACCESS_CLIENT_ID)
    await page.setExtraHTTPHeaders({
      'CF-Access-Client-Id': CF_ACCESS_CLIENT_ID,
      'CF-Access-Client-Secret': CF_ACCESS_CLIENT_SECRET
    })
  }
}
