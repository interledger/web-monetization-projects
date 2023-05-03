import { Point } from '../../crypto/voprf/types'
import { DLEQProof } from '../../crypto/voprf/dleq'

export interface IssueRequestDes {
  contents: Point[]
}

export interface IssueResponseDes {
  sigs: Point[]
  proof: DLEQProof
  version: string
}

export interface RedeemRequestDes {
  token: Uint8Array
  requestBinding: Uint8Array
  host: string
  path: string
}

export type RedeemResponseDes =
  | {
      success: true
      error: undefined
    }
  | {
      success: false
      error: string
    }
