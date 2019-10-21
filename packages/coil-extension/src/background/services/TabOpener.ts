import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { openTab } from '../../util/openTab'
import { WextApi } from '../../types/wextApi'

@injectable()
export class TabOpener {
  constructor(@inject(tokens.WextApi) private api: WextApi) {}

  open(url: string) {
    openTab(this.api, url)
  }

  opener(url: string) {
    return openTab.bind(null, this.api, url)
  }
}
