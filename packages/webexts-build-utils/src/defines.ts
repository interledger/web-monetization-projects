import * as webpack from 'webpack'
import { PackageVersion } from '@coil/webpack-utils'

import { API, BROWSER, WEXT_BUILD_CONFIG } from './env'

export const makeDefinePlugin = (version: PackageVersion) => {
  return new webpack.DefinePlugin({
    WEBPACK_DEFINE_API: API,
    WEBPACK_DEFINE_VERSION: JSON.stringify(version),
    WEBPACK_DEFINE_BROWSER: JSON.stringify(BROWSER),
    WEBPACK_DEFINE_BUILD_CONFIG: JSON.stringify(WEXT_BUILD_CONFIG)
  })
}
