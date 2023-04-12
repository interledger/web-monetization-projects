import { resolve } from 'path'

/**
 * Relative paths to files seem often to cause problems when
 * refactoring (moving around the pointing file).
 */
export function fromRoot(...segments: string[]) {
  return resolve(__dirname, '../..', ...segments)
}
