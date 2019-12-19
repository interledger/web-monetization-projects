import { inject, injectable } from 'inversify'

import * as tokens from '../../types/tokens'
import { Icons } from '../consts/Icons'

function getMonthAndDay() {
  const now = new Date()
  // O based months, getDate() will return 11 for December
  return [now.getMonth() + 1, now.getDate()]
}

@injectable()
export class PopupIconService {
  constructor(
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {}

  getActive() {
    const [month, day] = getMonthAndDay()
    if (month === 12) {
      return Icons.ActiveXMAS
    } else {
      return month === 1 && day === 1 ? Icons.ActiveNewYears : Icons.Active
    }
  }

  getInactive() {
    const [month, day] = getMonthAndDay()
    if (month === 12) {
      return Icons.InactiveXMAS
    } else {
      return month === 1 && day === 1 ? Icons.InactiveNewYears : Icons.Inactive
    }
  }
}
