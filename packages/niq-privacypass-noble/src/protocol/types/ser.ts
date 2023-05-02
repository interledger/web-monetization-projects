export type B64Json = string
export type B64 = string
export type ReqType = 'Issue' | 'Redeem'
export type PointSer = B64
export type RequestBinderSer = string
export type TokenSer = string

export const Errors = {
  ErrInvalidMAC: "binding MAC didn't match derived MAC",
  ErrNoDoubleSpendList: 'bloom filter is not initialized',
  ErrDoubleSpend: 'token was already spent',
  ErrTooManyTokens: 'ISSUE request contained too many tokens',
  ErrTooFewRedemptionArguments:
    'REDEEM request did not contain enough arguments',
  ErrUnexpectedRequestType: 'unexpected request type',
  ErrInvalidBatchProof: 'New batch proof for signed tokens is invalid',
  ErrNotOnCurve: 'One or more points not found on curve'
} as const

export type ErrorValue = (typeof Errors)[keyof typeof Errors] | string // There would be others

export interface BlindTokenRequestWrapper {
  bl_sig_req: B64Json
  host?: string
  path?: string
}

export type RequestMeta = { host: string; path: string }

export interface BlindTokenRequestSer {
  type: ReqType
  // Base64 encoded data
  contents: string[]
}

export interface IssueTokenRequestSer extends BlindTokenRequestSer {
  type: 'Issue'
  contents: PointSer[]
}

export interface RedeemTokenRequestSer extends BlindTokenRequestSer {
  type: 'Redeem'
  contents: [TokenSer, RequestBinderSer]
}

export type RedeemTokenResponseSer = 'success' | ErrorValue

export type IssueTokenResponseOuterSer = B64Json

export interface IssueTokenResponseInnerSer {
  /**
   * Array of base64 encoded signatures ( P*s )
   */
  sigs: PointSer[]

  /**
   B64('batch-proof=' + JSON({
      P: B64(JSON({
        C: B64(C_bigint),
        R: B64(R_bigint),
      })),
    }),
   )
   */
  proof: B64

  version: string | '1.1.0'
}
