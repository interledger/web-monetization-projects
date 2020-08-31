/* eslint-disable @typescript-eslint/no-explicit-any */
import { COIL_PASSWORD, COIL_USER } from './env'
import { initBrowser } from './initBrowser'
import { initCoil, InitCoilReturn } from './initCoil'

export async function initBrowserAndLoginFromEnv(): Promise<InitCoilReturn> {
  const context = await initBrowser()
  return initCoil({ context, user: COIL_USER, password: COIL_PASSWORD })
}
