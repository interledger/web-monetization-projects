export interface Manifest {
  manifest_version: number
  browser_specific_settings?: {
    gecko?: {
      id: string
    }
  }
  applications?: ManifestV2['browser_specific_settings']
  key: string
  version_name: string
  // TODO: move this non-standard extension elsewhere
  $targets?: Record<string, ManifestV2>
  permissions: string[]
  name: string
  version: string
}

export interface ManifestV2 extends Manifest {
  web_accessible_resources?: string[]

  manifest_version: 2
  content_security_policy?: string
  background?: {
    page?: string
  }
  content_scripts?: [
    {
      matches: string[]
      js: string[]
      match_about_blank: boolean
      all_frames: boolean
      run_at: 'document_start' | string
    }
  ]
  browser_action: {
    default_icon: string
    default_popup: string
  }
}

export interface ManifestV3 extends Manifest {
  web_accessible_resources?: { resources: string[]; matches: string[] }[]
  host_permissions: string[]
  content_security_policy?: {
    extension_pages: string
    sandbox: string
  }
  action: ManifestV2['browser_action']
  background?: {
    service_worker?: string
  }
}
