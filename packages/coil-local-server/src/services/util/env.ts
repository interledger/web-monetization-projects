import { injectable } from 'inversify'

import { envNumber, envString } from './envGetters'

@injectable()
export class Env {
  SERVER_PORT = envNumber('SERVER_PORT', 4000)
  APP_SECRET = envString('APP_SECRET', 'shhhhhhh!')
}
