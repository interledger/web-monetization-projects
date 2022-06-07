import { Container } from 'inversify'
import { ExpressContext } from 'apollo-server-express'

export interface Context extends ExpressContext {
  userId: string | null
  log: typeof console.log
  container: Container
}
