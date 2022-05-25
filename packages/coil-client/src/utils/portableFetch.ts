// node-fetch will use window.fetch if in the browser
// eslint-disable-next-line @typescript-eslint/no-var-requires
export const portableFetch: typeof fetch = require('node-fetch')
