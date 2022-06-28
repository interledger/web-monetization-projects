import { API } from '../webpackDefines'

// eslint-disable-next-line no-console
const dbg = console.log.bind(console, 'contentMV3.ts')

API.storage.local.get({ COIL_LOGGING_ENABLED: 'nothing here' }, vals => {
  dbg('vals', JSON.stringify(vals))
})

const anyApi = chrome as any

anyApi.storage.session.get(
  { COIL_LOGGING_ENABLED: 'nothing here :/' },
  (vals: unknown) => {
    dbg('vals 2', JSON.stringify(vals))
  }
)
