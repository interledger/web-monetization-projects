import { resolve } from 'path'

export const pretty = (val: unknown) => JSON.stringify(val, null, 2)
// eslint-disable-next-line no-console
export const dbg = console.log
export const fromRoot = (...segments: string[]) =>
  resolve(__dirname, '../../../..', ...segments)
