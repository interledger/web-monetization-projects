import { Container } from 'inversify'

export interface Context {
  userId: string | null
  log: typeof console.log
  container: Container
}
