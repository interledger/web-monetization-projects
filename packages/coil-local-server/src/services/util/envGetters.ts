import process from 'process'

export function envNumber(key: string, defaultValue: number): number
export function envNumber(
  key: string,
  defaultValue?: number
): number | undefined {
  const envElement = process.env[key]
  return envElement ? parseInt(envElement) : defaultValue
}

export function envString(key: string, defaultValue: string): string
export function envString(
  key: string,
  defaultValue?: string
): string | undefined {
  const envElement = process.env[key]
  return envElement ? envElement : defaultValue
}
