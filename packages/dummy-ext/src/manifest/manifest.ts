import assert from 'assert'

import { ManifestV3 } from './types'

export const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'WM Dummy',
  version: '1.0.0',
  content_scripts: [
    {
      matches: ['https://*/*', 'http://*/*'],
      js: ['src/content/content.ts'],
      match_about_blank: false,
      all_frames: true,
      run_at: 'document_start'
    }
  ],
  background: {
    service_worker: 'src/background/background.ts',
    type: 'module'
  },
  permissions: ['tabs'],
  host_permissions: ['*://*/*'],
  action: {
    default_popup: 'index.html'
  }
}

export function applyBuildConfig(
  env: typeof process.env,
  manifestV3: ManifestV3
): ManifestV3 {
  const out = manifestV3
  assert(out.permissions)
  out.permissions.push('webRequest')
  return out
}
