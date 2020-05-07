import { Browser, Page } from 'puppeteer'

import { COIL_DOMAIN, COIL_TOKEN } from './env'
import { timeout } from './timeout'
import { addCloudFlareAccessHeaders } from './addCloudFlareAccessHeaders'

export interface InitCoilParameters {
  browser: Browser
  user: string
  password: string
}

export interface InitCoilReturn {
  browser: Browser
  page: Page
}

export async function injectCoilTokenFromEnv(page: Page) {
  await page.goto(`${COIL_DOMAIN}`)
  await page.evaluate(
    (token: string) => {
      localStorage.setItem('token', token)
      window.dispatchEvent(new Event('coil_writeToken'))
    },
    [COIL_TOKEN]
  )
  await timeout(100)
}

export async function initCoil({
  browser,
  user,
  password
}: InitCoilParameters): Promise<InitCoilReturn> {
  const page = await browser.newPage()
  // After the first request, the `CF_Authorization` cookie is set which
  // seems to work in the extension background page.
  await addCloudFlareAccessHeaders(page)

  if (COIL_TOKEN) {
    await injectCoilTokenFromEnv(page)
    await timeout(100)
  } else {
    await page.goto(`${COIL_DOMAIN}/login`)

    const loginSelector = '[data-cy="login-email"]'
    const passwordSelector = '[data-cy="login-password"]'
    const nextSelector = '[data-cy="login-next"]'

    await page.waitForSelector(loginSelector)
    await page.click(loginSelector)
    await page.keyboard.type(user)
    await page.click(nextSelector)

    await page.click(passwordSelector)
    await page.keyboard.type(password)
    await page.click(nextSelector)
    await page.waitForNavigation()
  }

  return { browser, page }
}
