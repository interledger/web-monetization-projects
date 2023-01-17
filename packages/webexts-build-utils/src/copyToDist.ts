import { transformManifest } from './transformManifest'
import { BROWSER, LIVE_RELOAD, MV3 } from './env'
import { transformStatic } from './transformStatic'
import { Polyfill } from './types'
import { ManifestV2 } from './types/manifest'

export const prettyJSON = (obj: unknown) => JSON.stringify(obj, null, 2)

export function makeCopyToDistPattern(
  polyfill?: Polyfill,
  addToManifest?: (manifest: ManifestV2) => ManifestV2
) {
  // Patterns for webpack-copy-plugin
  const copyToDist = [
    {
      from: 'manifest.json',
      to: 'manifest.json',
      transform: (content: Buffer) => {
        let manifest = JSON.parse(content.toString())
        manifest = transformManifest(manifest, polyfill, addToManifest)
        return prettyJSON(manifest)
      }
    },
    {
      from: 'static',
      to: 'static',
      transform: transformStatic
    },
    { from: 'res', to: 'res' }
  ]

  if (LIVE_RELOAD && !MV3) {
    copyToDist.push({
      from: require.resolve('crx-hotreload'),
      to: 'hot-reload.js'
    })
  }

  return copyToDist
}
