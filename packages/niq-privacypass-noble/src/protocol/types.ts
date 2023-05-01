export type ReqType = 'Issue' | 'Redeem'

export const ISSUE: ReqType = 'Issue'
export const REDEEM: ReqType = 'Redeem'

export interface BlindTokenRequestWrapper {
  bl_sig_req: string
  host?: string
  path?: string
}

export interface BlindTokenRequest {
  type: ReqType
  // Base64 encoded data
  contents: string[]
}

export interface IssueTokenRequest extends BlindTokenRequest {
  type: 'Issue'
}

export interface RedeemTokenRequest extends BlindTokenRequest {
  type: 'Redeem'
}

export interface IssueTokenResponse {
  /**
   * Array of base64 encoded signatures ( P*s )
   */
  sigs: string[]

  /**
   B64('batch-proof=' + B64(JSON({
      P: B64(JSON({
        C: B64(C_bigint),
        R: B64(R_bigint),
      })),
    })),
   )
   */
  proof: string
  version: string
}
