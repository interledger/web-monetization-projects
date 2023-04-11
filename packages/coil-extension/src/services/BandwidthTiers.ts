const BASE_TIER = 1
const BANDWIDTH_MAP: number[] = [0, 100000, 150000, 250000]

export class BandwidthTiers {
  async getBandwidth(url: string) {
    return BANDWIDTH_MAP[BASE_TIER]
  }
}
