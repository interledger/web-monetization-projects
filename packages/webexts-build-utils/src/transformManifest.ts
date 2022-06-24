import { applyManifestPermissions } from './manifestPermissions'
import {
  WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID,
  WEXT_MANIFEST_KEY,
  WEXT_MANIFEST_PERMISSIONS,
  WEXT_MANIFEST_SUFFIX,
  WEXT_MANIFEST_SUFFIX_NO_DATE,
  WEXT_MANIFEST_VERSION,
  WEXT_MANIFEST_VERSION_NAME
} from './env'

function makeDateSuffix() {
  const date = new Date().toLocaleString().replace(/(\/|,|\s)+/g, '-')
  return `-${date}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformManifest(manifest: any, browser: string) {
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
}
