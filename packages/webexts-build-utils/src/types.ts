import { ManifestAny } from './types/manifest'

export interface PolyFillWithoutHash {
  content: string
  name: string
}
export interface PolyFillOption extends PolyFillWithoutHash {
  patch?: (
    manifest: ManifestAny,
    polyfill: PolyFillWithoutHash
  ) => PolyFillWithoutHash
}

export interface Polyfill extends PolyFillWithoutHash {
  hash: string
}

export interface MakeWebpackConfigParams {
  rootDir: string
  polyfill?: PolyFillOption
}
