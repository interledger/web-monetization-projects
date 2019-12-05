interface AdaptedRegexInterface {
  [key: string]: RegExp
}

export const ADAPTED_REGEX: AdaptedRegexInterface = {
  twitch: /https?:\/\/(www\.)?twitch\.tv(\/.*)?/i,
  youtube: /https?:\/\/(www\.)?youtube\.com(\/.*)?/i
}

export function getAdaptedSite(url: string) {
  for (const site in ADAPTED_REGEX) {
    if (ADAPTED_REGEX[site].test(url)) {
      return site
    }
  }

  return false
}
