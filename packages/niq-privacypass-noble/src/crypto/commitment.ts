import { Point } from './types'

export interface Commitment {
  g: Point
  // g * sK
  h: Point
}
