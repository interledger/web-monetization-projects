import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { Icons } from '../consts/Icons'
import { getMonthAndDay, isNewYears, isXMASPeriod } from '../../util/seasons'

@injectable()
export class PopupIconService {
  constructor(
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {}

  getActive() {
    const [month, day, date] = getMonthAndDay()
    if (isXMASPeriod(month, day)) {
      return Icons.ActiveXMAS
    } else if (isNewYears(month, day, date)) {
      return Icons.ActiveNewYears
    } else {
      return Icons.Active
    }
  }

  getInactive() {
    const [month, day, date] = getMonthAndDay()
    if (isXMASPeriod(month, day)) {
      return Icons.InactiveXMAS
    } else if (isNewYears(month, day, date)) {
      return Icons.InactiveNewYears
    } else {
      return Icons.Inactive
    }
  }
}
