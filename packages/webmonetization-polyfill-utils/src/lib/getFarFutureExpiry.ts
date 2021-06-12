// Use a fixed date in the distant future (2100-01-01T00:00:00.000Z) as the
// expiry of all outgoing packets. This ensures that payment will work even
// if the OS's clock is skewed. It will be replaced with a more reasonable
// expiry by the connector.
const FAR_FUTURE_EXPIRY = new Date(4102444800000)

export function getFarFutureExpiry(destination: string): Date {
  return FAR_FUTURE_EXPIRY
}
