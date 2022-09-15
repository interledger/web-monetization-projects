import * as webpack from 'webpack'
import { PackageVersion } from '@coil/webpack-utils'

import { API, BROWSER, MV3, WEXT_BUILD_CONFIG } from './env'
import { Polyfill } from './types'

export const makeDefinePlugin = (
  version: PackageVersion,
  polyfill?: Polyfill
) => {
  let definitions: Record<string, string> = {
    WEBPACK_DEFINE_API: API,
    WEBPACK_DEFINE_VERSION: JSON.stringify(version),
    WEBPACK_DEFINE_BROWSER: JSON.stringify(BROWSER),
    WEBPACK_DEFINE_BUILD_CONFIG: JSON.stringify(WEXT_BUILD_CONFIG),
    WEBPACK_DEFINE_MV3: JSON.stringify(MV3)
  }
  if (polyfill) {
    definitions = {
      ...definitions,
      WEBPACK_DEFINE_POLYFILL: JSON.stringify(polyfill.content)
    }
  }
  return new webpack.DefinePlugin(definitions)
}
