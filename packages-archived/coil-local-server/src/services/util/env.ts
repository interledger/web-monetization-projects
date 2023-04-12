import { injectable } from 'inversify'

import { envNumber, envString } from './envGetters'

@injectable()
export class Env {
  SERVER_PORT = envNumber('SERVER_PORT', 4000)
  // We are using this for cookies as well as jwts just for the sake of simplicity
  APP_SECRET = envString('APP_SECRET', 'shhhhhhh!')
}
