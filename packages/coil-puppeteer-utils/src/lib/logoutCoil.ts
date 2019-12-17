import { Page } from 'puppeteer'

import { debug } from './debug'
import { COIL_DOMAIN } from './env'

export async function logoutCoil(coilPage: Page) {
  await coilPage.bringToFront()
  await coilPage.goto(`${COIL_DOMAIN}/explore`)

  const menuSelector = `img[data-cy='hamburger-toggle']`
  const logoutSelector = `[data-cy='logout']`

  await coilPage.waitFor(menuSelector)

  try {
    await coilPage.click(menuSelector)
  } catch (err) {
    debug(
      'Failed to open hamburger menu. ' +
        'Page is likely wide enough to not render it. err=',
      err
    )
  }
  await coilPage.waitFor(logoutSelector)
  await coilPage.click(logoutSelector)

  return coilPage
}
