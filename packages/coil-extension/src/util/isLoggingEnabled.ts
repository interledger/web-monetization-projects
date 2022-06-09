import { BuildConfig } from '../types/BuildConfig'
import { BUILD_CONFIG } from '../webpackDefines'

export function isLoggingEnabled(buildConfig: BuildConfig) {
  const enabled = Boolean(buildConfig.isLoggingEnabled)
  const override = Boolean(false /*localStorage.COIL_LOGGING_ENABLED*/)
  return enabled || override
}

export const loggingEnabled = isLoggingEnabled(BUILD_CONFIG)
