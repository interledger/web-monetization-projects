import { login } from './env'

async function main() {
  const { client } = await login()
  console.log(JSON.stringify(await client.adaptedPage(process.argv[2])))
}

main().catch(console.error)
