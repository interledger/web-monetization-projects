import { BrowserContext, Page } from 'puppeteer'

import { COIL_DOMAIN, COIL_TOKEN } from './env'
import { timeout } from './timeout'
import { debug } from './debug'
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

  page.on('console', (consoleObj: { text(): string }) =>
    debug('CONSOLE', consoleObj.text())
  )

  await timeout(3e3)

  // After the first request, the `CF_Authorization` cookie is set which
  // seems to work in the extension background page.
  await addCloudFlareAccessHeaders(page)

  if (COIL_TOKEN) {
    await injectCoilTokenFromEnv(page)
    await timeout(100)
  } else {
    await page.goto(`${COIL_DOMAIN}/login`)
    await page.bringToFront()

    await page.waitForSelector(initCoil.loginSelector)
    await page.click(initCoil.loginSelector)
    await page.keyboard.type(user)
    await page.click(initCoil.nextSelector)

    await page.click(initCoil.passwordSelector)
    await page.keyboard.type(password)
    await page.click(initCoil.nextSelector)
    await page.waitForNavigation()
  }

  return { context, page }
}

export interface initCoil {
  loginSelector: string
  passwordSelector: string
  nextSelector: string
}

initCoil.loginSelector = '[data-cy="login-email"]'
initCoil.passwordSelector = '[data-cy="login-password"]'
initCoil.nextSelector = '[data-cy="login-next"]'
