import { main, Environment } from './backgroundMain'

// eslint-disable-next-line no-console
main({ env: self as Environment }).catch(console.error)
