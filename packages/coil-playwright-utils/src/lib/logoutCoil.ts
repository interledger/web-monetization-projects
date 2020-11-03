import { Page } from 'playwright'

import { COIL_DOMAIN } from './env'

export async function logoutCoil(coilPage: Page): Promise<Page> {
  await coilPage.bringToFront()
  await coilPage.goto(`${COIL_DOMAIN}/settings`)
  await coilPage.click('"Sign out"')
  return coilPage
}
