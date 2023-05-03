import { Point } from '../../crypto/voprf/types'
import { DLEQProof } from '../../crypto/voprf/dleq'

import { IssueResponseInnerSer } from './ser'

export interface IssueRequestDes {
  contents: Point[]
  // // will be empty string, rather than undefined
  // host: string
  // // will be empty string, rather than undefined
  // path: string
}

export interface IssueResponseDes {
  sigs: Point[]
  proof: DLEQProof
  version: IssueResponseInnerSer['version']
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
