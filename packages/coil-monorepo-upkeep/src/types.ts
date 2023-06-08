export type StringMap = Record<string, string>

export interface PackageJSON extends Record<string, string | any> {
  repository?: { type: string; url: string }
  keywords?: string[]
  homepage?: string
  private?: boolean
  dependencies?: StringMap
  devDependencies?: StringMap
  scripts?: StringMap
  version?: string
  name: string
  license?: string
  author?: string
  $schema?: string
  types?: string
  main?: string
  subpackages?: string[]
  resolutions?: StringMap
  upkeep?: {
    privatePackages?: boolean
    tsconfigPaths?: Record<string, string[]>
    rootDir?: string
  }
}

export interface LernaListItem {
  name: string
  version: string
  private: boolean
  location: string
  dependencies: LernaListItem[]
}

export interface TSConfig {
  files?: string[]
  extends?: string
  references?: { path: string }[]
  compilerOptions?: Record<string, any> & {
    incremental?: boolean
    composite?: boolean
    paths?: Record<string, string[]>
    outDir?: string
    baseUrl?: string
  }
  exclude?: string[]
  include?: string[]
}
