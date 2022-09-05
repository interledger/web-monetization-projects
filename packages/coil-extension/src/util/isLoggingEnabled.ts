import { BuildConfig } from '../types/BuildConfig'

export async function isLoggingEnabled(buildConfig: BuildConfig) {
  // localStorage isn't available in MV3 service workers
  // We will need to work out some other method for this
  const mv2Enabling = self.localStorage?.COIL_LOGGING_ENABLED
  return Boolean(buildConfig.loggingEnabled || mv2Enabling)
}
