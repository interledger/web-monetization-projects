import { Page } from 'puppeteer'

import { debug } from './debug'

export async function logoutCoil(coilPage: Page) {
  await coilPage.bringToFront()

  const menuSelector = `img[data-cy='hamburger-toggle']`
  const logoutSelector = `[data-cy='logout']`

  try {
    await coilPage.click(menuSelector)
  } catch (err) {
    debug(
      'Failed to open hamburger menu. ' +
        'Page is likely wide enough to not render it. err=',
      err
    )
  }

  await coilPage.click(logoutSelector)

  return coilPage
}
