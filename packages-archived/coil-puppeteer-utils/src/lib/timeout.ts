export const timeout = async (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
