import type { ManifestV3Export } from '@crxjs/vite-plugin'

// We just use this to get the type which is mv3 | Promise<mv3> | () => mv3
// Use Awaited to strip the Promise and then a branch to strip the function
// We should be left with simply mv3
function _(__: Awaited<ManifestV3Export>) {
  if (typeof __ === 'function') {
    throw new Error()
  } else {
    return __
  }
}

export type ManifestV3 = ReturnType<typeof _>
