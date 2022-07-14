import assert from 'assert'

import { applyManifestPermissions } from './manifestPermissions'
import {
  MV3,
  MV3_BACKGROUND_TYPE,
  WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID,
  WEXT_MANIFEST_KEY,
  WEXT_MANIFEST_PERMISSIONS,
  WEXT_MANIFEST_SUFFIX,
  WEXT_MANIFEST_SUFFIX_NO_DATE,
  WEXT_MANIFEST_VERSION,
  WEXT_MANIFEST_VERSION_NAME
} from './env'
import { ManifestV2, ManifestV3 } from './types/manifest'
import { Polyfill } from './types'

const ALL_URLS = '<all_urls>'

function makeDateSuffix() {
  const date = new Date().toLocaleString().replace(/(\/|,|\s)+/g, '-')
  return `-${date}`
}

function convertToMV3(v2: ManifestV2) {
  assert.ok(v2.manifest_version === 2)

  const background = {
    serviceworker: {
      service_worker: 'backgroundMV3.js'
    },
    eventspage: {
      page: 'static/background.html',
      persistent: false
    }
  }[MV3_BACKGROUND_TYPE]

  const v3: Partial<
    Omit<ManifestV2, 'manifest_version' | 'web_accessible_resources'>
  > &
    ManifestV3 = {
    ...v2,
    manifest_version: 3,
    browser_action: undefined,
    web_accessible_resources: undefined,
    action: v2.browser_action,

    content_security_policy: undefined,
    host_permissions: [],

    background
  }

  if (v2.permissions.find(p => p === ALL_URLS)) {
    v3.permissions = v2.permissions.filter(perm => perm !== ALL_URLS)
    const host_permissions = (v3.host_permissions ??= [])
    host_permissions.push('*://*/*')
  }

  if (v2.web_accessible_resources) {
    v3.web_accessible_resources = v2.web_accessible_resources.map(fn => ({
      matches: ['*://*/*'],
      resources: [fn]
    }))
  }

  // Add storage permission
  if (!v3.permissions.includes('storage')) {
    v3.permissions.push('storage')
  }
  // Add scripting permission
  if (!v3.permissions.includes('scripting')) {
    v3.permissions.push('scripting')
  }

  // Replace content.js with contentMV3.js
  assert.ok(v3.content_scripts)
  const cs = v3.content_scripts.find(cs => cs.js.includes('content.js'))
  assert.ok(cs)
  cs.js = cs.js.map(fn => (fn === 'content.js' ? 'contentMV3.js' : fn))

  return v3
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function transformManifest(
  v2: ManifestV2,
  browser: string,
  polyfill?: Polyfill
) {
  const targets = v2['$targets']
  delete v2['$targets']
  if (targets?.[browser]?.permissions) {
    applyManifestPermissions(v2, targets[browser].permissions)
  }

  if (polyfill?.hash) {
    assert.ok(v2.content_security_policy)
    assert.ok(v2.web_accessible_resources)
    v2.content_security_policy = v2.content_security_policy.replace(
      'sha256-POLYFILL-HASH=',
      polyfill.hash
    )
    v2.web_accessible_resources.push(`${polyfill.name}.js`)
  }

  if (WEXT_MANIFEST_SUFFIX) {
    v2.name += WEXT_MANIFEST_SUFFIX
    if (!WEXT_MANIFEST_SUFFIX_NO_DATE) {
      v2.name += makeDateSuffix()
    }
  }
  if (WEXT_MANIFEST_VERSION) {
    v2.version = WEXT_MANIFEST_VERSION
  }
  if (WEXT_MANIFEST_VERSION_NAME) {
    v2.version_name = WEXT_MANIFEST_VERSION_NAME
  }

  if (WEXT_MANIFEST_KEY) {
    v2.key = WEXT_MANIFEST_KEY
  }

  if (browser === 'firefox') {
    if (WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID) {
      assert.ok(v2.browser_specific_settings?.gecko)
      v2.browser_specific_settings.gecko.id =
        WEXT_MANIFEST_BROWSER_SPECIFIC_SETTINGS_GECKO_ID
    }
    v2.applications = v2.browser_specific_settings
  } else {
    delete v2['browser_specific_settings']
  }
  const rules = WEXT_MANIFEST_PERMISSIONS
  const parsedRules: string[] = rules ? JSON.parse(rules) : []
  applyManifestPermissions(v2, parsedRules)

  if (MV3) {
    return convertToMV3(v2)
  }
  return v2
}
