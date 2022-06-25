import assert from 'assert'

import { applyManifestPermissions } from './manifestPermissions'
import {
  MV3,
  WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID,
  WEXT_MANIFEST_KEY,
  WEXT_MANIFEST_PERMISSIONS,
  WEXT_MANIFEST_SUFFIX,
  WEXT_MANIFEST_SUFFIX_NO_DATE,
  WEXT_MANIFEST_VERSION,
  WEXT_MANIFEST_VERSION_NAME
} from './env'
import { ManifestV2, ManifestV3 } from './types/manifest'

const ALL_URLS = '<all_urls>'

function makeDateSuffix() {
  const date = new Date().toLocaleString().replace(/(\/|,|\s)+/g, '-')
  return `-${date}`
}

function convertToMV3(v2: ManifestV2) {
  assert.ok(v2.manifest_version === 2)

  const v3: Partial<Omit<ManifestV2, 'manifest_version'>> & ManifestV3 = {
    ...v2,
    manifest_version: 3,
    browser_action: undefined,
    action: v2.browser_action,

    content_security_policy: undefined,
    host_permissions: [],

    background: {
      service_worker: 'backgroundMV3.js'
    }
  }

  if (v2.permissions.find(p => p === ALL_URLS)) {
    v3.permissions = v2.permissions.filter(perm => perm !== ALL_URLS)
    const host_permissions = (v3.host_permissions ??= [])
    host_permissions.push('*://*/*')
  }

  return v3
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformManifest(manifest: ManifestV2, browser: string) {
  const targets = manifest['$targets']
  delete manifest['$targets']
  if (targets?.[browser]?.permissions) {
    applyManifestPermissions(manifest, targets[browser].permissions)
  }

  if (WEXT_MANIFEST_SUFFIX) {
    manifest.name += WEXT_MANIFEST_SUFFIX
    if (!WEXT_MANIFEST_SUFFIX_NO_DATE) {
      manifest.name += makeDateSuffix()
    }
  }
  if (WEXT_MANIFEST_VERSION) {
    manifest.version = WEXT_MANIFEST_VERSION
  }
  if (WEXT_MANIFEST_VERSION_NAME) {
    manifest.version_name = WEXT_MANIFEST_VERSION_NAME
  }

  if (WEXT_MANIFEST_KEY) {
    manifest.key = WEXT_MANIFEST_KEY
  }

  if (browser === 'firefox') {
    if (WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID) {
      assert.ok(manifest.browser_specific_settings?.gecko)
      manifest.browser_specific_settings.gecko.id =
        WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID
    }
    manifest.applications = manifest.browser_specific_settings
  } else {
    delete manifest['browser_specific_settings']
  }
  const rules = WEXT_MANIFEST_PERMISSIONS
  const parsedRules: string[] = rules ? JSON.parse(rules) : []
  applyManifestPermissions(manifest, parsedRules)

  if (MV3) {
    return convertToMV3(manifest)
  }
  return manifest
}
