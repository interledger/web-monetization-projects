export type ReqType = 'Issue' | 'Redeem'
export type EncodedToken = string
export type EncodedRequestBinder = string
export type EncodedPoint = string
export type B64Json = string

export const ISSUE: ReqType = 'Issue'
export const REDEEM: ReqType = 'Redeem'

export interface BlindTokenRequestWrapper {
  bl_sig_req: B64Json
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
  contents: EncodedPoint[]
}

export interface RedeemTokenRequest extends BlindTokenRequest {
  type: 'Redeem'
  contents: [EncodedToken, EncodedRequestBinder]
}

export interface IssueTokenResponse {
  /**
   * Array of base64 encoded signatures ( P*s )
   */
  sigs: string[]

  /**
   B64('batch-proof=' + JSON({
      P: B64(JSON({
        C: B64(C_bigint),
        R: B64(R_bigint),
      })),
    }),
   )
   */
  proof: string

  version: string | '1.1.0'
}
