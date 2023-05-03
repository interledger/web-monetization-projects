import { Point } from '../../crypto/voprf/types'
import { DLEQProof } from '../../crypto/voprf/dleq'

import { IssueTokenResponseInnerSer } from './ser'

export interface IssueTokenRequestDes {
  contents: Point[]
  // // will be empty string, rather than undefined
  // host: string
  // // will be empty string, rather than undefined
  // path: string
}

export interface IssueTokenResponseDes {
  sigs: Point[]
  proof: DLEQProof
  version: IssueTokenResponseInnerSer['version']
}

export interface RedeemTokenRequestDes {
  token: Uint8Array
  requestBinding: Uint8Array
  host: string
  path: string
}

export type RedeemTokenResponseDes =
  | {
      success: true
      error: undefined
    }
  | {
      success: false
      error: string
    }
