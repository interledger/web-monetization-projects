import { injectable } from 'inversify'

@injectable()
export class WM2OriginTrial {
  allowedList = new Set(['https://quirksmode.org'])

  /**
   * Check if in the allowed list (TODO)
   */
  checkOrigin(url: string) {
    return (
      this.allowedList.has(new URL(url).origin) ||
      url.match(/https?:\/\/localhost\b/)
    )
  }
}
