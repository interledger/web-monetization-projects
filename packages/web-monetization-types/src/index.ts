// For the moment, if only for coil internal convenience we are keeping the
// original field names

export interface MonetizationStartEvent {
  type: 'monetizationstart'
  detail: {
    // Web-Monetization-Id header present in the SPSP request
    requestId: string
    // The meta[@name="monetization"] @content value
    paymentPointer: string
  }
}

export interface MonetizationProgressEvent {
  type: 'monetizationprogress'
  detail: {
    // The amount * received * at the destination specified in the SPSP endpoint
    amount: string
    assetCode: string
    assetScale: number
    // "NEW" fields, while keeping the old fields
    requestId: string
    paymentPointer: string
  }
}

export type MonetizationObject = EventTarget & {
  state: 'pending' | 'started'
}

export interface MonetizationDocumentExtensions {
  monetization: MonetizationObject
}

export type MonetizationExtendedDocument = Document &
  MonetizationDocumentExtensions

export type MonetizationEvent =
  | MonetizationProgressEvent
  | MonetizationStartEvent

export interface MonetizationProvider {
  id: string
  handleMonetizationRequest(request: MonetizationRequest): void
  stopMonetization(requestId: string): void
}

export interface SPSPResponse {
  destination_account: string
  shared_secret: string
}

export type MonetizationRequest = {
  readonly type: 'paymentPointer' | 'SPSPResponse'
  // The randomly generated UUID V4
  // MonetizationRequest -> requestId ? makes sense ??
  readonly requestId: string
} & (
  | {
      // `paymentPointer` becomes an umbrella term to refer to
      // a "Payment Pointer ™" or full SPSP url
      readonly type: 'paymentPointer'
      readonly receiver: string
      // `true` when request coming from an <iframe allowed='monetization'> ?
      // `false` when request coming from window.top
      readonly iframe: boolean

      // Privacy sensitive data optionally available on the request, depending upon
      // the user settings

      // The `new URL(window.location.href)`, accounting for HTML5 push state
      // This allows the monetization provider to adjust bandwidth and filter
      // requests as per the user's settings.
      // `URL` is available as a global on node on at least node 10/12
      readonly sourceLocation?: URL
      readonly origin?: string
      // $key/$val for every `<meta name="$key" content="$val">` where
      // $key starts with 'monetization'
      // though this name would work for an imperative API also
      readonly metaData?: Record<string, string>
    }
  | {
      // In the case that only the SPSPResponse is shared generally it's because
      // of privacy concerns, with the user not wanting the provider/Agent to know
      // the details of the request beyond the ILP address.
      readonly type: 'SPSPResponse'
      readonly receiver: SPSPResponse
    })

export type StreamEventCallback<T> = (
  val: T,
  stream: MonetizationStream
) => void

export interface StreamEventsEmitter extends NodeJS.EventEmitter {
  on(
    event: 'monetizationstart',
    val: StreamEventCallback<MonetizationStartEvent>
  ): this
  on(
    event: 'monetizationprogress',
    val: StreamEventCallback<MonetizationProgressEvent>
  ): this
}

export interface StreamControl {
  pause(): void
  resume(): void
}

export interface Asset {
  assetScale: number
  assetCode: string
}

export interface Amount extends Asset {
  amount: string
}

export interface Packet {
  timeMs: number
  sent: Amount
  received: Amount
}

export interface MonetizationStream<
  Request extends MinimumRequest = MonetizationRequest
> extends StreamControl, StreamEventsEmitter {
  request: Request
  state: 'started' | 'paused' | 'stopped'
  // TODO: probably don't want these ?
  packets: Packet[]
}

/**
 * STREAM compatible "plugin"
 * Taken from ilp-protocol-stream/src/util/plugin-interface.ts
 */
export interface STREAMPlugin {
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  isConnected: () => boolean
  sendData: (data: Buffer) => Promise<Buffer>
  registerDataHandler: (handler: (data: Buffer) => Promise<Buffer>) => void
  deregisterDataHandler: () => void
}

export interface StreamConfigurator<
  Request extends MinimumRequest = MonetizationRequest
> {
  // TODO: just keep this simple/clean and only support returning a Plugin ?
  getSTREAMConfig(
    request: Request
  ): Promise<
    // A promise will provide flexibility to get a btpToken asynchronously
    // specific to the request
    | {
        type: 'btp'
        // Will connect to this btp endpoint and then create a STREAM connection
        btpEndpoint: string
        // This will allow for bandwidth adjustment
        btpToken: string
        btpAccount?: string
      }
    | {
        type: 'plugin'
        // Can be used in node environment
        plugin: STREAMPlugin
      }
  >
}

/**
 * At minimum specifies a requestID/Web-Monetization-Id (UUID V4)
 * and paymentPointer/SPSP Response
 */
export type MinimumRequest = Pick<
  MonetizationRequest,
  'requestId' | 'type' | 'receiver'
>

/**
 * The generic `Request` is so the library can be used in environments
 * where the start requests may not have all the info as provided
 * in the browser.
 *
 * Defaults to MonetizationRequest
 */
export interface StreamManager<
  Request extends MinimumRequest = MonetizationRequest
> extends StreamEventsEmitter {
  start(
    request: Request,
    streamConfigurator: StreamConfigurator<Request>
  ): MonetizationStream<Request>
  get(requestId: string): MonetizationStream<Request>
  stop(requestId: string): void
}

export interface StreamAssociationManager<
  Request extends MinimumRequest = MonetizationRequest
> {
  readonly manager: StreamManager<Request>
  // For example to associate a browser tab id
  associate(requestId: string, anyId: string): void
  // returns first non iframe stream
  get(anyId: string): MonetizationStream<Request>
  // returns all streams
  getAll(anyId: string): MonetizationStream<Request>[]
}

export function extendedDocument(): MonetizationExtendedDocument {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return document as any
}
