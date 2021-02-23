import { BrowserContext, Page } from 'puppeteer'

import { COIL_DOMAIN, COIL_TOKEN } from './env'
import { timeout } from './timeout'
import { addCloudFlareAccessHeaders } from './addCloudFlareAccessHeaders'

export interface InitCoilParameters {
  context: BrowserContext
  user: string
  password: string
}

export interface InitCoilReturn {
  context: BrowserContext
  page: Page
}

export async function injectCoilTokenFromEnv(page: Page): Promise<void> {
  await page.goto(`${COIL_DOMAIN}`)
  await page.evaluate(token => {
    localStorage.setItem('token', token)
    window.dispatchEvent(new Event('coil_writeToken'))
  }, COIL_TOKEN)
  await timeout(100)
}

export async function initCoil({
  context,
  user,
  password
}: InitCoilParameters): Promise<InitCoilReturn> {
  const page = (await context.pages())[0]

  const page2 = await context.newPage()
  await page2.goto(
    'chrome-extension://poahcjebhgbnlgdbigecpljijhjanafi/static/popup.html'
  )
  // await timeout(5e3)

  page.on('console', (consoleObj: { text(): string }) =>
    console.log('CONSOLE', consoleObj.text())
  )

  await page.bringToFront()

  await timeout(3e3)
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
    // TODO: chromium no longer allows injection of the iframe into the
    //  background page, so reload coil.com so the content script can get the
    // access token.
    await page.reload({ waitUntil: 'domcontentloaded' })
    await page.reload({ waitUntil: 'domcontentloaded' })
    const token = await page2.evaluate(function () {
      return localStorage.token
    })
    console.log(
      'TOKEN',
      token
        ? token
            .split('.')
            .map(s => Buffer.from(s, 'base64'))[1]
            .toString()
        : null
    )
    await timeout(1e3)
    console.log('LOGGED IN and reloaded 2x')
  }

  return { context, page }
}
