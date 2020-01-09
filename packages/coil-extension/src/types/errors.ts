export type StreamErrorType = 'spsp_request' | 'clock_skew'

export interface StreamError {
  message: string
  type: StreamErrorType
}
