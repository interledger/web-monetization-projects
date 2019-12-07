export async function timeout(everyMs: number) {
  return new Promise(resolve => setTimeout(resolve, everyMs))
}
