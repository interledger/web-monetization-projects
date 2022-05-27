import { Page } from 'puppeteer'

import { debug } from './debug'
import { COIL_DOMAIN } from './env'
import { timeout } from './timeout'

export async function logoutCoil(coilPage: Page): Promise<Page> {
  await coilPage.bringToFront()
  await coilPage.goto(`${COIL_DOMAIN}/settings`)
  await timeout(2e3)

  const menuSelector = `svg[data-cy='hamburger-toggle']`
  const signOutSelector = '//*[text()="Sign out"]'

  try {
    await coilPage.click(menuSelector, { delay: 5e3, clickCount: 1 })
  } catch (err) {
    debug(
      'Failed to open hamburger menu. ' +
        'Page is likely wide enough to not render it. err=',
      err
    )
  }

  const [button] = await coilPage.$x(signOutSelector)
  if (button) {
    await button.click()
  } else {
    throw new Error(`could not find sign out element with ${signOutSelector}`)
  }
  return coilPage
}
