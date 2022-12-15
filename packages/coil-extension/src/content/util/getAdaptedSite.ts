export const ADAPTED_REGEX: Record<string, RegExp> = {
  youtube: /https?:\/\/((www|m)\.)?youtube\.com\/(watch|channel)(.*)/i
}

const ADAPTED_SITES = Object.keys(ADAPTED_REGEX)

export function getAdaptedSite(url: string) {
  for (const site of ADAPTED_SITES) {
    if (ADAPTED_REGEX[site].test(url)) {
      return site
    }
  }
  return null
}
