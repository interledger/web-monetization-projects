import path from 'path'

import { TS_LOADER_TRANSPILE_ONLY, TSCONFIG_DEBUG } from './env'

export function getPaths(rootDir: string) {
  const paths = {
    TEST_TSCONFIG: path.join(rootDir, '/test/tsconfig.json'),
    // This is extended from the root IDE config
    TSCONFIG_DEBUG_JSON: path.join(rootDir, 'tsconfig.debug.json'),
    TSCONFIG_BUILD_JSON: path.join(rootDir, 'tsconfig.build.json'),
    PACKAGE_JSON: path.join(rootDir, 'package.json')
  }

  // eslint-disable-next-line no-nested-ternary
  const TSCONFIG = TS_LOADER_TRANSPILE_ONLY
    ? paths.TEST_TSCONFIG
    : TSCONFIG_DEBUG
    ? paths.TSCONFIG_DEBUG_JSON
    : paths.TSCONFIG_BUILD_JSON

  return {
    TSCONFIG,
    ...paths
  }
}

export type Paths = ReturnType<typeof getPaths>
