export interface Manifest {
  permissions: string[]
}

export function applyManifestPermissions(manifest: Manifest) {
  const rules = process.env.WEXT_MANIFEST_PERMISSIONS
  const parsedRules: string[] = rules ? JSON.parse(rules) : []
}
