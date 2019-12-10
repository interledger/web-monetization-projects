import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { openTab } from '../../util/openTab'

@injectable()
export class TabOpener {
  constructor(@inject(tokens.WextApi) private api: typeof window.chrome) {}

  open(url: string) {
    openTab(this.api, url)
  }

  opener(url: string) {
    return openTab.bind(null, this.api, url)
  }
}
