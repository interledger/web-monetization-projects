import { inject, injectable } from 'inversify'
import { WextApi } from '@webmonetization/wext/tokens'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Func = (...args: any[]) => any

interface Events {
  'tabs.onRemoved': GetFieldType<typeof chrome, 'tabs.onRemoved.addListener'>
}
type PathKeys<T> = T extends string
  ? []
  : {
      [K in keyof T]: [K, ...PathKeys<T[K]>]
    }[keyof T]

type Join<T extends string[], Delimiter extends string> = T extends []
  ? never
  : T extends [infer F]
  ? F
  : T extends [infer F, ...infer Other]
  ? F extends string
    ? `${F}${Delimiter}${Join<Extract<Other, string[]>, Delimiter>}`
    : never
  : string

type Path<T> = Join<PathKeys<{ a: number }>, '.'>

@injectable()
export class BackgroundEvents {
  buffering = true

  constructor(
    @inject(WextApi)
    private api: typeof chrome
  ) {}

  wally(path: Path<typeof chrome>) {}

  class() {
    this.addListener('tabs.onRemoved', (tabId, removeInfo) => {})
  }

  addListener<T extends keyof Events>(
    key: T,
    ...params: Parameters<Events[T]>
  ) {
    const keys = key.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let api: any = this.api
    while (keys.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      api = api[keys.shift()!]
    }
    api.addListener(...params)
  }
}
