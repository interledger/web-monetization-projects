import { BuildConfig } from '../types/BuildConfig'
import { BUILD_CONFIG } from '../webpackDefines'

export function isLoggingEnabled(buildConfig: BuildConfig) {
  // noinspection UnnecessaryLocalVariableJS
  const enabled = Boolean(buildConfig.isLoggingEnabled)
  // TODO:MV3 replace with some other method
  /*const override = Boolean(localStorage.COIL_LOGGING_ENABLED)*/
  return enabled /*|| override*/
}

export const loggingEnabled = isLoggingEnabled(BUILD_CONFIG)
