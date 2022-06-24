import { User } from '../../types/user'
import { ITipContext } from '../context/iTipContext'

export const characterWidth = 40
export const maxAmountWidth = 160

export function calculateInputWidth(value: string) {
  const newWidth = value.length * characterWidth
  if (newWidth < maxAmountWidth) {
    return `${newWidth}px`
  } else {
    return `${maxAmountWidth}px`
  }
}

export const normalizeAmountInput = (
  value: string,
  context: Pick<ITipContext, 'maxAllowableTipAmountUsd'>,
  user?: User | null
) => {
  const { minTipLimitAmountUsd = 1 } = user?.tipSettings || {}

  // ensure that the input is a valid number input
  // remove any alphabet, special characters, leading zero, leading decimal
  const amountRegex = new RegExp(
    /(^[0])|([a-zA-Z\s])|([`.!@#$%^&*()_+\-=[\]{};':"\\|,<>/?])|/gm
  )
  value = value.replace(amountRegex, '')

  // strip the values from the thousandths place if it exists
  // doing this first so when the input display is set while typing it limits the user
  if (value.includes('.')) {
    if (value.split('.')[1].length > 2) {
      value = value.slice(0, -1)
    }
  }

  // set the value to max limit if input is greater
  if (Number(value) > context.maxAllowableTipAmountUsd) {
    value = context.maxAllowableTipAmountUsd.toString()
  }

  const displayValue = value

  // set the value to min limit if input is less
  if (Number(value) < minTipLimitAmountUsd) {
    value = minTipLimitAmountUsd.toString()
  }

  return { displayValue, value }
}
