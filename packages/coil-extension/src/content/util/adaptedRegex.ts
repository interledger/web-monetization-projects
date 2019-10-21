export const ADAPTED_REGEX = [
  /https?:\/\/(www\.)?twitch\.tv(\/.*)?/i,
  /https?:\/\/(www\.)?youtube\.com(\/.*)?/i
]

export function isAdaptedSite(url: string) {
  for (const item of ADAPTED_REGEX) {
    if (item.test(url)) {
      return true
    }
  }

  return false
}
