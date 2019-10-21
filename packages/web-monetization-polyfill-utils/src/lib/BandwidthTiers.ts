import { portableFetch } from './portableFetch'

export interface TierData {
  [key: string]: number
}

const TIER_CACHE_TIMEOUT: number = 30 * 60 * 1000
const BASE_TIER = 1
const BANDWIDTH_MAP: number[] = [0, 100000, 150000, 250000]

export class BandwidthTiers {
  private tierDataDate?: Date
  private tierData?: TierData

  tierDataExpired() {
    if (!this.tierDataDate) {
      return true
    }

    const dataAge = new Date().getTime() - this.tierDataDate.getTime()
    return dataAge > TIER_CACHE_TIMEOUT
  }

  async getTier(url: string) {
    const tierData = await this.fetchTierData()

    // Attempt the full url
    const data = tierData[url]
    if (data) {
      return data
    }

    const parsedUrl = new URL(url)
    const origin = parsedUrl.origin
    const urlSegments = parsedUrl.pathname.split('/')

    // Work backwards from most specific to least
    for (let i = urlSegments.length; i > 0; i--) {
      const path = urlSegments.slice(0, i).join()
      const data = tierData[origin + path]
      if (data) {
        return data
      }
    }

    return BASE_TIER
  }

  async getBandwidth(url: string) {
    const tier = await this.getTier(url)
    return BANDWIDTH_MAP[tier] || BANDWIDTH_MAP[BASE_TIER]
  }

  async fetchTierData() {
    if (this.tierData && !this.tierDataExpired()) {
      return this.tierData
    }

    const response = await portableFetch('https://cdn.coil.com/tierdata.json')

    if (!response.ok) {
      throw new Error('failed to fetch tier data')
    }

    const tierData = await response.json()
    this.tierData = tierData
    this.tierDataDate = new Date()
    return tierData
  }
}
