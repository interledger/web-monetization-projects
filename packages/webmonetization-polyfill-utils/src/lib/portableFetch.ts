// node-fetch will use window.fetch if in the browser
export const portableFetch: typeof window.fetch =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('node-fetch')
    // we must bind to window if we set fetch as a class property
    .bind(window)
