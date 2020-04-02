/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Injections {
  module?: symbol
  params: { index: number; token: any }[]
}

export const InjectionsSymbol = Symbol('Dier Makr Injections')
export const GlobalModule = Symbol('Dier Makr GlobalModule')
export const UnmanagedSymbol = Symbol('Dier Makr @unmanaged() Parameter')

const defaultInjections = (module?: symbol) => {
  return {
    module,
    params: []
  }
}
export function injectable(module: symbol = GlobalModule) {
  return function (target: any) {
    const injections: Injections = target[InjectionsSymbol]
    if (!injections) {
      target[InjectionsSymbol] = defaultInjections(module)
    } else {
      injections.module = module
    }
    if (!injectable.modules.has(module)) {
      injectable.modules.set(module, [])
    }
    injectable.modules.get(module)?.push(target)
  }
}
injectable.modules = new Map<symbol, any[]>([[GlobalModule, []]])

injectable.forModule = (module: symbol) => {
  return injectable.modules.get(module) ?? []
}

export function inject(token: any) {
  return function (target: any, key?: string, index?: number): void {
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

export const unmanaged = inject.bind(null, UnmanagedSymbol)
