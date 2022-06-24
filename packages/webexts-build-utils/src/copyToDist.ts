import { transformManifest } from './transformManifest'
import { BROWSER } from './env'
import { transformStatic } from './transformStatic'

export const prettyJSON = (obj: unknown) => JSON.stringify(obj, null, 2)

// Patterns for webpack-copy-plugin
export const copyToDist = [
  {
    from: 'manifest.json',
    to: 'manifest.json',
    transform: (content: Buffer) => {
      const manifest = JSON.parse(content.toString())
      transformManifest(manifest, BROWSER)
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
