import {
  makeWebpackConfig,
  MakeWebpackConfigParams
} from '@webexts/build-utils'
import { wmPolyfill } from '@webmonetization/wext/content'
import merge from 'webpack-merge'
import * as webpack from 'webpack'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const COIL_DOMAIN = process.env.COIL_DOMAIN
if (!COIL_DOMAIN) {
  throw new Error('must set COIL_DOMAIN env')
}

const options: MakeWebpackConfigParams = {
  rootDir: __dirname,
  addToManifest: manifest => {
    // This will only run in the top frame of coil.com tabs
    manifest.content_scripts?.push({
      matches: [`${COIL_DOMAIN}/*`],
      all_frames: false,
      run_at: 'document_start',
      js: ['contentCoilOnly.js'],
      match_about_blank: false
    })
    return manifest
  },
  addToEntry: entry => {
    // TODO: need to do an MV3 flavoring too
    // Maybe not ? contentMV3 doesn't even seem to require anything different
    // it simply does `import ./content`.
    // will need to update safari
    entry['contentCoilOnly'] = './src/content/contentCoilOnly.ts'
    return entry
  },
  polyfill: {
    content: wmPolyfill,
    name: 'wm-polyfill',
    patch: (manifest, polyfill, packageVersion, buildConfig) => {
      // language=JavaScript
      const coilExtension = {
        manifest,
        packageVersion,
        buildConfig,
        version: manifest.version,
        name: manifest.name
      }
      polyfill.content += `
        window.coilExtension = ${JSON.stringify(coilExtension)}
`
      return polyfill
    }
  }
}

export const config = merge(makeWebpackConfig(options), {
  plugins: [
    new webpack.DefinePlugin({
      WEBPACK_DEFINE_BTP_ENDPOINT: JSON.stringify(
        process.env.BTP_ENDPOINT || null
      ),
      WEBPACK_DEFINE_COIL_DOMAIN: JSON.stringify(COIL_DOMAIN)
    })
  ]
})
