export async function timeout(ms: number): Promise<undefined> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
