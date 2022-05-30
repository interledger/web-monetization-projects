import { Page } from 'puppeteer'

import { debug } from './debug'
import { COIL_DOMAIN } from './env'
import { timeout } from './timeout'

export async function logoutCoil(coilPage: Page): Promise<Page> {
  await coilPage.bringToFront()
  await coilPage.goto(`${COIL_DOMAIN}/settings`)
  await timeout(2e3)

  const signOutButton = "[data-testid='signout-nav-button']"

  await coilPage.waitForSelector(signOutButton)
  await coilPage.click(signOutButton)
  return coilPage
}
