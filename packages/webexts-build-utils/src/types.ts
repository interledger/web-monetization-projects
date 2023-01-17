import { PackageVersion } from '@coil/webpack-utils'

import { ManifestAny, ManifestV2 } from './types/manifest'
import { WebpackEntry } from './entries'

export interface PolyFillWithoutHash {
  content: string
  name: string
}

export interface PolyFillOption extends PolyFillWithoutHash {
  patch?: (
    manifest: ManifestAny,
    polyfill: PolyFillWithoutHash,
    packageVersion: PackageVersion,
    buildConfig: Record<string, unknown>
  ) => PolyFillWithoutHash
}

export interface Polyfill extends PolyFillWithoutHash {
  hash: string
}

export interface MakeWebpackConfigParams {
  rootDir: string
  polyfill?: PolyFillOption
  addToManifest?: (manifest: ManifestV2) => ManifestV2
  addToEntry?: (entry: WebpackEntry) => WebpackEntry
}
