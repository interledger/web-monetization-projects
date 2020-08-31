import { Page } from 'playwright'

import { debug } from './debug'
import { COIL_DOMAIN } from './env'

export async function logoutCoil(coilPage: Page): Promise<Page> {
  await coilPage.bringToFront()
  await coilPage.goto(`${COIL_DOMAIN}/settings/account`)

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
