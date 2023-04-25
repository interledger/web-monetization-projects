import type { ManifestV3Export } from '@crxjs/vite-plugin'

type Unwrap<T> = T extends Promise<infer U>
  ? U
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends (_: any) => infer U | Promise<infer U>
  ? U
  : T

export type ManifestV3 = Unwrap<ManifestV3Export>
