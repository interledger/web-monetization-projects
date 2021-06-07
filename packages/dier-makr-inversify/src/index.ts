import {
  decorate,
  inject,
  injectable as injectableInversify,
  unmanaged
} from 'inversify'
import {
  injectable,
  Injections,
  InjectionsSymbol,
  UnmanagedSymbol
} from '@dier-makr/annotations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inversifyAnnotated(target: any) {
  const injections: Injections | undefined = target[InjectionsSymbol]
  if (injections) {
    decorate(injectableInversify(), target)
    if (injections.params) {
      injections.params.forEach(p => {
        if (p.token === UnmanagedSymbol) {
          decorate(
            unmanaged() as unknown as ParameterDecorator,
            target,
            p.index
          )
        } else {
          decorate(
            inject(p.token) as unknown as ParameterDecorator,
            target,
            p.index
          )
        }
      })
    }
  }
}

export function inversifyModule(module: symbol) {
  injectable.forModule(module).forEach(inversifyAnnotated)
}
