import * as sjcl from 'sjcl'

export interface RawIssueResponse {
  sigs: string[]
  proof: string
  version: string
  prng: string
}

export function isRawIssueResponse(res: unknown): res is RawIssueResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return !(res as any)[0]
}

export interface IssueResponse {
  signatures: string[]
  proof: string
  prng: string
  version?: string
}

export type SjclHashable = string | sjcl.BitArray
