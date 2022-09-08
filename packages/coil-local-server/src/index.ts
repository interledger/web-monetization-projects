import '@abraham/reflection'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;

(BigInt as any).prototype.toJSON = function () {
  return this.toString()
}

import { makeDefaultContainer } from './di/container'
import { Server } from './services/server/Server'

export async function startApolloServer() {
  const container = makeDefaultContainer()
  const server = await container.getAsync(Server)
  await server.start()
}

if (!module.parent) {
  startApolloServer().catch(console.error)
}
