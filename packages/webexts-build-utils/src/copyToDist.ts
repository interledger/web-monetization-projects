import { transformManifest } from './transformManifest'
import { BROWSER, LIVE_RELOAD } from './env'
import { transformStatic } from './transformStatic'

export const prettyJSON = (obj: unknown) => JSON.stringify(obj, null, 2)

export function makeCopyToDistPattern(polyfillHash?: string) {
  // Patterns for webpack-copy-plugin
  return [
    {
      from: 'manifest.json',
      to: 'manifest.json',
      transform: (content: Buffer) => {
        let manifest = JSON.parse(content.toString())
        manifest = transformManifest(manifest, BROWSER, polyfillHash)
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

  if (LIVE_RELOAD) {
    copyToDist.push({
      from: require.resolve('crx-hotreload'),
      to: 'hot-reload.js'
    })
  }
}
