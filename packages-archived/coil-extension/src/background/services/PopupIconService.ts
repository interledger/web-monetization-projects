import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { Icons } from '../consts/Icons'
import { TabState } from '../../types/TabState'

@injectable()
export class PopupIconService {
  constructor(
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {}

  forTabState(state: Pick<TabState, 'iconPrimary' | 'iconSecondary'>) {
    let iconKey = state.iconPrimary || 'inactive'
    if (state.iconSecondary) {
      iconKey += `-${state.iconSecondary}`
    }
    return Icons[iconKey]
  }
}
