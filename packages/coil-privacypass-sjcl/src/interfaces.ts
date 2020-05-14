import * as sjcl from 'sjcl'

export interface IssueResponse {
  sigs: string[]
  proof: string
  prng: string
  version?: string
}

export type SjclHashable = string | sjcl.BitArray

export interface Commitment {
  G: string
  H: string
}
