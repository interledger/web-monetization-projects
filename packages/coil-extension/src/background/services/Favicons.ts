import { portableFetch } from '@web-monetization/polyfill-utils'
import { injectable } from 'inversify'

@injectable()
export class Favicons {
  private favIcons: { [host: string]: string } = {}

  // TODO: we need a way to clean up favicons
  async getFavicon(host: string) {
    if (this.favIcons[host]) {
      return this.favIcons[host]
    }

    const res = await portableFetch(
      'https://favicongrabber.com/api/grab/' + host
    )
    if (!res.ok) {
      this.favIcons[host] = '/res/icon-page.svg'
      return this.favIcons[host]
    }

    const json = await res.json()
    this.favIcons[host] = json.icons[0].src
    return this.favIcons[host]
  }
}
