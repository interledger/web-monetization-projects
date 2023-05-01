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

export interface IssuedTokenResponse {
  // base64 encoded data
  sigs: string[]
  proof: string
  version: string
}
