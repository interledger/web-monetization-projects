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
  exports?: Record<string, string | object>
  resolutions?: StringMap
  upkeep?: {
    privatePackages?: boolean
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

export interface DependabotUpdateConfigsItem {
  package_manager: 'javascript' | string
  directory: string
  update_schedule: 'live' | string
  target_branch: 'main' | string
}

export interface DependabotConfig {
  version: 1
  update_configs: DependabotUpdateConfigsItem[]
}

export interface NcuRcJson {
  reject: string[]
}
