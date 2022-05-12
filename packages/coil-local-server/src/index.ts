import { makeDefaultContainer } from './di/container'
import { Server } from './services/server/Server'

export async function startApolloServer() {
  const container = makeDefaultContainer()
  const server = container.get(Server)
  await server.start()
}

if (!module.parent) {
  startApolloServer().catch(console.error)
}
