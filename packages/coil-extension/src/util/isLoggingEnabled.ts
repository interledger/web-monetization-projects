import { BuildConfig } from '../types/BuildConfig'

export async function isLoggingEnabled(buildConfig: BuildConfig) {
  return Boolean(buildConfig.loggingEnabled)
}
