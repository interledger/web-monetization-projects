export function makeDebug(ns: string) {
  const startedAt = Date.now()
  let latest = startedAt
  return (...args: unknown[]) => {
    const now = Date.now()
    // eslint-disable-next-line no-console
    console.log(`${ns} (t=${now - startedAt}ms, d=${now - latest}ms)`, ...args)
    latest = now
  }
}

export function noop(...args: unknown[]) {}
