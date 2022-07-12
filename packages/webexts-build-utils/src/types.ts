export interface Polyfill {
  content: string
  name: string
  hash: string
}

export interface MakeWebpackConfigParams {
  rootDir: string
  polyfill?: Polyfill
}
