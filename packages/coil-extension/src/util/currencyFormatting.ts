import { Amount } from '@webmonetization/types'

export interface FormatOptions {
  precision?: number
}

const symbols: Record<string, string> = {
  USD: '$'
}

const reverseLookupSymbols: Record<string, string> = {}

Object.entries(symbols).forEach(([k, v]) => {
  reverseLookupSymbols[v] = k
})

export function formatAmount(
  amount: Amount,
  { precision = 2 }: FormatOptions = {}
) {
  const amountNumber = parseInt(amount.amount)
  const scale = Math.pow(10, amount.assetScale)
  return symbols[amount.assetCode] + (amountNumber / scale).toFixed(precision)
}

export function parseAmount(amount: string): Amount {
  const symbol = amount.charAt(0)
  const code = reverseLookupSymbols[symbol]
  const value = parseFloat(amount.slice(1))
  const scale = 9
  const amountInt = Math.floor(value * Math.pow(10, scale))
  return {
    assetScale: scale,
    assetCode: code,
    amount: amountInt.toString()
  }
}
