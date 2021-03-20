import { IRootState } from '@coil/extension-popup/redux/models'
import { HotkeySetting } from '@coil/extension-popup/types'
import store from '@coil/extension-popup/redux/store'

export const getHotkeyAmounts = (): number[] => {
  const state: IRootState = store.getState()
  switch (state.hotkeySetting) {
    case HotkeySetting.User_defined: {
      const values = state.hotkeyAmounts
      return values
    }
    case HotkeySetting.Limit_defined: {
      const getPercentageAsWhole = (num: number) => {
        const percentage = state.maximumDailyTipLimit * (num / 100)
        return Math.round(percentage)
      }
      const values = [
        getPercentageAsWhole(5),
        getPercentageAsWhole(10),
        getPercentageAsWhole(15),
        getPercentageAsWhole(20)
      ]
      return values
    }
    case HotkeySetting.History_defined: {
      if (state.tipHistory.length > 10) {
        // set based on frequency
        const history = state.tipHistory
        const frequency: { [key: string]: number } = {}

        // get history frequency
        for (let i = 0; i < history.length; i++) {
          const num = history[i]
          frequency[num] = frequency[num] ? frequency[num] + 1 : 1
        }

        // sort frequency
        const sortable = []
        for (const number in frequency) {
          sortable.push([number, frequency[number]])
        }
        sortable.sort(function (a, b) {
          return Number(b[1]) - Number(a[1])
        })

        // get top N values -> 4 in this case
        const topValues = sortable.slice(0, 4).map(numArr => {
          return Number(numArr[0])
        })

        // sort final values
        const values = topValues.sort((a, b) => Number(a) - Number(b))

        // return amounts
        return values
      } else {
        // set based on defaults
        const values = state.defaultHotkeyAmounts
        return values
      }
    }
    case HotkeySetting.Default:
    default: {
      const values = state.defaultHotkeyAmounts
      return values
    }
  }
}

export const getRemainingDailyAmountAllowed = (): number => {
  const { tipHistory, maximumDailyTipLimit } = store.getState()
  let sum = 0
  if (tipHistory.length > 0) {
    sum = tipHistory.reduce((total, currentValue) => {
      return total + currentValue
    })
  }

  const difference = maximumDailyTipLimit - sum

  return difference
}

export const getTipCreditCharge = (): number => {
  const { tipCreditBalance, currentTipAmount } = store.getState()
  if (tipCreditBalance >= currentTipAmount) {
    return currentTipAmount
  } else {
    return tipCreditBalance
  }
}

export const getCreditCardCharge = (): number => {
  const { currentTipAmount } = store.getState()
  if (currentTipAmount > getTipCreditCharge()) {
    const chargeAmount = currentTipAmount - getTipCreditCharge()
    return chargeAmount
  } else {
    return 0
  }
}
