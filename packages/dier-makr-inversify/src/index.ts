import { decorate, inject, injectable } from 'inversify'
import {
  Injectable,
  Injections,
  InjectionsSymbol
} from '@dier-makr/annotations'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function inversifyAnnotated(target: any) {
  const injections: Injections | undefined = target[InjectionsSymbol]
  if (injections) {
    decorate(injectable(), target)
    if (injections.params) {
      injections.params.forEach(p => {
        decorate(
          (inject(p.token) as unknown) as ParameterDecorator,
          target,
          p.index
        )
      })
    }
  }
}

export function inversifyModule(module: symbol) {
  Injectable.forModule(module).forEach(inversifyAnnotated)
}
