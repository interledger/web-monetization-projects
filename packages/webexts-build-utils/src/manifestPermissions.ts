export interface Manifest {
  permissions: string[]
}

export function applyManifestPermissions(
  manifest: Manifest,
  parsedRules: string[]
): void {
  for (const rule of parsedRules) {
    if (rule.startsWith('-')) {
      const subtract = rule.substring(1)
      manifest.permissions = manifest.permissions.filter(s => s !== subtract)
    } else {
      const add = rule.startsWith('+') ? rule.substring(1) : rule
      const already = manifest.permissions.find(p => p === add)
      if (!already) {
        manifest.permissions.push(add)
      }
    }
  }
}
