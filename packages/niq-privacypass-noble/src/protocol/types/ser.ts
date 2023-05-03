export type B64Json = string
export type B64 = string
export type ReqType = 'Issue' | 'Redeem'
export type PointSer = B64
export type RequestBinderSer = B64
export type TokenSer = B64

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

export interface PrivacyPassRequestWrapper {
  bl_sig_req: B64Json
  host?: string
  path?: string
}

export type RequestMeta = { host: string; path: string }

export interface PrivacyPassRequestSer {
  type: ReqType
  // Base64 encoded data
  contents: string[]
}

export interface IssueRequestSer extends PrivacyPassRequestSer {
  type: 'Issue'
  contents: PointSer[]
}

export interface RedeemRequestSer extends PrivacyPassRequestSer {
  type: 'Redeem'
  contents: [TokenSer, RequestBinderSer]
}

export type RedeemResponseSer = 'success' | ErrorValue

export type IssueResponseOuterSer = B64Json

export interface IssueResponseInnerSer {
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
