import { inspect } from 'util'

import fetch from 'node-fetch'
import IlpPluginBtp from 'ilp-plugin-btp'
import * as IlpStream from 'ilp-protocol-stream'
import * as uuid from 'uuid'

import {
  COIL_DOMAIN,
  COIL_PASSWORD,
  COIL_USER,
  login,
  loginWithCookies
} from './env'

// eslint-disable-next-line no-console
const dbg = console.log

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function pretty(val: any): string {
  return inspect(val, { depth: Infinity })
}

const pointerToUrl = (url: string) => url.replace(/^\$/, 'https://')

interface SPSPResponse {
  destination_account: string
  shared_secret: string
}

async function getPaymentDetails(
  paymentPointerUrl: string,
  monetizationId: string
): Promise<SPSPResponse> {
  const response = await fetch(paymentPointerUrl, {
    headers: {
      Accept: 'application/spsp4+json',
      // DEPRECATED: this header is unnecessary with STREAM receipts
      'Web-Monetization-Id': monetizationId
    }
  })
  return response.json()
}

function startStream(
  id: number | string,
  connection: IlpStream.Connection,
  dbg: typeof console.log
): IlpStream.DataAndMoneyStream {
  const startedAt = Date.now()
  let last = startedAt

  const stream = connection.createStream()
  stream.setSendMax(2 ** 55)

  stream.on('error', (error): void => {
    dbg({ error })
  })

  let totalPackets = 0

  stream.on('outgoing_money', (sentAmount): void => {
    const msSinceLastOutgoing = Date.now() - last
    last = Date.now()

    if (connection.sourceAssetCode !== 'USD') {
      throw new Error('expecting USD')
    }

    totalPackets++

    const dollarsSent =
      parseFloat(sentAmount) / Math.pow(10, connection.sourceAssetScale)
    const totalDollarsSent =
      parseFloat(stream.totalSent) / Math.pow(10, connection.sourceAssetScale)
    const cents = totalDollarsSent * 100
    const msPassed = last - startedAt
    const minutesPerCent = msPassed / (60 * 1000) / cents
    const averageMsPerPacket = msPassed / totalPackets

    const totalTimeSeconds = msPassed / 1000
    dbg({
      streamId: id,
      dollarsSent,
      totalDollarsSent,
      raw: {
        assetCode: connection.sourceAssetCode,
        sentAmount,
        assetScale: connection.sourceAssetScale
      },
      minutesPerCent,
      totalTimeSeconds,
      msSinceLastOutgoing,
      averageMsPerPacket
    })
  })
  return stream
}

async function main(): Promise<void> {
  if (!(COIL_USER && COIL_PASSWORD)) {
    throw new Error('Must set COIL_USER and COIL_PASSWORD env vars')
  }

  const startedAt = Date.now()
  let latest = startedAt
  const dbg = (...args: any[]) => {
    const now = Date.now()
    // eslint-disable-next-line no-console
    console.log(`(t=${now - startedAt}ms, d=${now - latest}ms)`, ...args)
    latest = now
  }

  const argv = process.argv.slice(2)
  const paymentPointer = argv[0] || '$twitter.xrptipbot.com/nfcpasses'
  const { btpToken } = await loginWithCookies(dbg, true)
  dbg({ btpToken })

  const spspUrl = pointerToUrl(paymentPointer)
  dbg({ spspUrl })

  const btpBase = COIL_DOMAIN.replace(/^http/, 'btp+ws')

  const plugin = new IlpPluginBtp({
    server: `${btpBase}/btp?tier=100000`,
    btpToken
  })
  const monetizationId = uuid.v4()
  dbg('Getting payment details')
  const details = await getPaymentDetails(spspUrl, monetizationId)
  dbg({ details })

  dbg('Connecting to plugin')
  await plugin.connect()
  dbg('Connected')

  dbg('Creating connection from plugin')
  const connection = await IlpStream.createConnection({
    plugin,
    destinationAccount: details.destination_account,
    sharedSecret: Buffer.from(details.shared_secret, 'base64')
  })
  dbg('plugin connection created')

  connection.on('close', () => {
    dbg('connection close')
  })

  connection.on('error', () => {
    dbg('connection error')
  })
  dbg('calling connection.connect()')
  await connection.connect()
  dbg('finished connection.connect()')
  startStream(`main`, connection, dbg)
}

if (require.main === module) {
  // eslint-disable-next-line no-console
  main().catch(console.error)
}
