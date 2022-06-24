import '@abraham/reflection'

import { makeDefaultContainer } from './di/container'
import { Server } from './services/server/Server'
import { SPSPService } from './services/spsp/SPSPService'

export async function startApolloServer() {
  const container = makeDefaultContainer()
  const server = await container.getAsync(Server)
  await server.start()
}

if (!module.parent) {
  startApolloServer().catch(console.error)
}
