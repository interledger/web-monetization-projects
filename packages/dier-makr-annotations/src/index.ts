/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Injections {
  module?: symbol
  params: { index: number; token: any }[]
}

export const InjectionsSymbol = Symbol.for('__dier_makr_injections__')
export const GlobalModule = Symbol.for('rootModule')

const defaultInjections = (module?: symbol) => {
  return {
    module,
    params: []
  }
}
export function Injectable(module: symbol = GlobalModule) {
  return function(target: any) {
    const injections: Injections = target[InjectionsSymbol]
    if (!injections) {
      target[InjectionsSymbol] = defaultInjections(module)
    } else {
      injections.module = module
    }
    if (!Injectable.modules.has(module)) {
      Injectable.modules.set(module, [])
    }
    Injectable.modules.get(module)?.push(target)
  }
}
Injectable.modules = new Map<symbol, any[]>([[GlobalModule, []]])

Injectable.forModule = (module: symbol) => {
  return Injectable.modules.get(module) ?? []
}

export function Inject(token: any) {
  return function(target: any, key?: string, index?: number): void {
    let injections: Injections = target[InjectionsSymbol]
    if (!injections) {
      injections = target[InjectionsSymbol] = defaultInjections()
    }
    if (typeof key === 'string') {
      throw new Error(
        'property injection unsupported, use constructor injection'
      )
    } else if (typeof index === 'number') {
      const param = {
        index,
        token
      }
      injections.params.push(param)
    }
  }
}
