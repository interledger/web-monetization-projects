import { TS_LOADER_TRANSPILE_ONLY, TSCONFIG_DEBUG } from './env'
import { Paths } from './paths'

export function makeTsLoader(paths: Paths) {
  // This is extended from the root IDE config

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const required = require(paths.TSCONFIG_DEBUG_JSON)
  const DEBUG_COMPILER_OPTIONS = required.compilerOptions

  return {
    // We must use require.resolve in the mono repo with
    // deduplicated dependencies
    loader: require.resolve('ts-loader'),
    // Do not check types in watch mode
    options: TS_LOADER_TRANSPILE_ONLY
      ? {
          configFile: paths.TSCONFIG,
          projectReferences: false,
          transpileOnly: true,
          compilerOptions: TSCONFIG_DEBUG
            ? { sourceMap: true, ...DEBUG_COMPILER_OPTIONS }
            : { sourceMap: true }
        }
      : {
          configFile: paths.TSCONFIG,
          projectReferences: true
        }
  }
}
