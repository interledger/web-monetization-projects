export type Func<T extends any[], R> = (...args: T) => R

export function bind<T extends any[], R, P extends Record<string, any>>(
  func: (arg: T[0], params: P) => R,
  defaults: P
): (arg0: T[0], overrides?: Partial<P>) => R {
  return (arg0, overrides = {}) => {
    const params = { ...defaults, ...overrides } as P
    return func(arg0, params)
  }
}
