export const convertCentsToDollars = (amountCents: number | string): number => {
  const amountUSD = Number((Number(amountCents) / 100).toFixed(2))
  return amountUSD
}

export const convertDollarsToCents = (amountUSD: number | string): number => {
  const amountCents = Number(amountUSD) * 100
  return amountCents
}
