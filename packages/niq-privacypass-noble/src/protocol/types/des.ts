import { Point } from '../../crypto/types'
import { DLEQProof } from '../../crypto/dleq'

import { IssueTokenResponseInnerSer } from './ser'

export interface IssueTokenRequestDes {
  contents: Point[]
  host?: string
  path?: string
}

export interface IssueTokenResponseDes {
  sigs: Point[]
  proof: DLEQProof
  version: IssueTokenResponseInnerSer['version']
}

export interface RedeemTokenRequestDes {
  token: Uint8Array
  requestBinding: Uint8Array
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
