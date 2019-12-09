import { injectable, unmanaged } from '@dier-makr/annotations'

const VERSION = 8
const NAME = 'monetization-history'
const STORE_NAME = 'sites'
const HOST = 'host'
const ASSET_CODE = 'assetCode'
const AMOUNT = 'amount'

export type AnyIDBRequest = IDBRequest | IDBOpenDBRequest | IDBTransaction
export type AllIDBRequest = IDBRequest & IDBOpenDBRequest & IDBTransaction

async function idb<Result>(anyRequest: AnyIDBRequest) {
  const request = anyRequest as AllIDBRequest
  return new Promise<Result>((resolve, reject) => {
    // Sets all handlers regardless of whether or not they will actually be
    // called, which depends upon the type of request
    // all requests
    request.onsuccess = () => resolve(request.result)
    // all transactions
    request.oncomplete = () => resolve(request.result)
    // any request/transaction
    request.onerror = () =>
      reject(new Error(`IndexedDB Error: ${request.error}`))
    // open db request
    request.onupgradeneeded = event => {
      const result: IDBDatabase = request.result
      if (event.oldVersion === VERSION - 1) {
        result.deleteObjectStore(STORE_NAME)
      }
      if (event.newVersion === VERSION) {
        const store = result.createObjectStore(STORE_NAME, {
          keyPath: [HOST, ASSET_CODE]
        })
        store.createIndex(AMOUNT, [ASSET_CODE, AMOUNT], { unique: false })
      }
    }
  })
}

export interface SitesEntry {
  amount: number
  host: string
  assetCode: string
  assetScale: 9
  packets: number
  packetsMs: number
}

interface TopSitesParams {
  entries?: number
  assetCodes?: string[]
}

interface IncrementSiteParams {
  url: string
  amount: string
  assetCode: string
  assetScale: number
  msSinceLastPacket: number
}

@injectable()
export class HistoryDb {
  static async create() {
    const request = indexedDB.open(NAME, VERSION)
    const database = await idb<IDBDatabase>(request)
    return new HistoryDb(database)
  }

  protected constructor(@unmanaged() private db: IDBDatabase) {}

  // TODO: normalize to assetScale of 9
  async incrementSite({
    url,
    amount,
    assetCode,
    assetScale,
    msSinceLastPacket
  }: IncrementSiteParams) {
    if (assetScale !== 9) {
      throw new Error(`must normalize assetScale to 9, got: ${assetScale}`)
    }
    const host = new URL(url).host
    const readTx = this.db
      .transaction(STORE_NAME)
      .objectStore(STORE_NAME)
      .get([host, assetCode])
    const entry = (await idb<SitesEntry>(readTx)) || {
      amount: 0,
      packets: 0,
      packetsMs: 0
    }
    const newAmount = Number(entry.amount) + parseInt(amount)
    const newEntry = {
      host,
      assetCode,
      amount: newAmount,
      packets: entry.packets + 1,
      packetsMs: entry.packetsMs + msSinceLastPacket
    }
    const writeTx = this.db
      .transaction([STORE_NAME], 'readwrite')
      .objectStore(STORE_NAME)
      .put(newEntry)
    return idb(writeTx)
  }

  async topSites({
    entries = 20,
    assetCodes = ['XRP', 'USD']
  }: TopSitesParams): Promise<{ sites: SitesEntry[] }> {
    const codesN = assetCodes.length
    if (entries % codesN !== 0) {
      throw new Error(`entries:${entries} is not multiple of ${codesN}`)
    }
    const each = entries / codesN
    const ret: { sites: SitesEntry[] } = {
      sites: []
    }
    for (const assetCode of assetCodes) {
      ret.sites = ret.sites.concat(await this.getSiteEntries(assetCode, each))
    }
    return ret
  }

  private async getSiteEntries(assetCode: string, entries: number) {
    const sites: SitesEntry[] = []

    await new Promise(resolve => {
      const idbRequest = this.db
        .transaction(STORE_NAME)
        .objectStore(STORE_NAME)
        .index(AMOUNT)
        .openCursor(
          IDBKeyRange.bound([assetCode, 0], [assetCode, Infinity]),
          'prev'
        )

      idbRequest.onsuccess = () => {
        const cursor = idbRequest.result
        if (entries-- && cursor) {
          sites.push(cursor.value)
          cursor.continue()
        } else {
          resolve()
        }
      }
    })
    return sites
  }
}
