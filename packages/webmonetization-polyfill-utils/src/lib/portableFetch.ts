// node-fetch will use window.fetch if in the browser
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetchFn: typeof fetch = require('node-fetch')

/**
 * Works in browser (including firefox/chrome extensions) and node
 * Don't use @types/node-fetch as we want to set credentials/cache
 * settings.
 */
export async function portableFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetchFn(input, init)
}
