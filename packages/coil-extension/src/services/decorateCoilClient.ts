import { inversifyModule } from '@dier-makr/inversify'
import { ClientModule } from '@coil/client'

export function decorateCoilClient() {
  inversifyModule(ClientModule)
}
