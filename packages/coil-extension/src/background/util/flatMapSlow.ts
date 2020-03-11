export function flatMapSlow<T, U>(
  array: T[],
  callbackfn: (value: T, index: number, array: T[]) => U[]
): U[] {
  if (typeof array.flatMap !== 'undefined') {
    return array.flatMap(callbackfn)
  } else {
    return Array.prototype.concat(...array.map(callbackfn))
  }
}
