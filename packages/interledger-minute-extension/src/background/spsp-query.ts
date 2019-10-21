import { portableFetch } from '@web-monetization/polyfill-utils'

export async function query(pointer: string) {
  const endpoint = new URL(
    pointer.startsWith('$') ? 'https://' + pointer.substring(1) : pointer
  )

  endpoint.pathname =
    endpoint.pathname === '/' ? '/.well-known/pay' : endpoint.pathname

  // TODO: make sure that this fetch can never crash this node process. because
  // this could be called from autonomous code, that would pose big problems.
  const response = await portableFetch(endpoint.href, {
    headers: { accept: 'application/spsp4+json, application/spsp+json' }
  })

  if (response.status !== 200) {
    throw new Error(`got error response from spsp payment pointer: 
endpoint="${endpoint.href}"
status=${response.status}
message="${await response.text()}"`)
  }

  const json = await response.json()
  // eslint-disable-next-line @typescript-eslint/camelcase
  json.content_type = response.headers.get('content-type')

  return json
}
