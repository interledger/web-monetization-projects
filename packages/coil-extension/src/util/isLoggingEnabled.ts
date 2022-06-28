import { BuildConfig } from '../types/BuildConfig'

export async function isLoggingEnabled(buildConfig: BuildConfig) {
  // noinspection UnnecessaryLocalVariableJS
  const enabled = Boolean(buildConfig.loggingEnabled)
  // TODO:MV3 replace with some other method
  /*const override = Boolean(localStorage.COIL_LOGGING_ENABLED)*/
  return enabled /*|| override*/
}
