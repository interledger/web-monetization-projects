import { TEventListenerOrListenerObject } from './genericEventListeners'

export interface EventDetail {
  // The meta[@name="monetization"] @content value
  paymentPointer: string
}

export interface MonetizationEventDetail extends EventDetail {
  // Web Monetization session Id
  requestId: string
}

export type MonetizationEventBase = CustomEvent<MonetizationEventDetail>

export interface MonetizationStartEvent extends MonetizationEventBase {
  type: 'monetizationstart'
}

export interface MonetizationPendingEvent extends MonetizationEventBase {
  type: 'monetizationpending'
}

export interface MonetizationStopEventDetail extends MonetizationEventDetail {
  /**
   * Will be true when the meta[@content] has changed
   * Will be true if a meta has been removed
   * Will be false if streaming has been stopped for some other reason where
   * it's possible that streaming could commence with the same requestId.
   */
  finalized: boolean
}

export interface MonetizationStopEvent
  extends CustomEvent<MonetizationStopEventDetail> {
  type: 'monetizationstop'
}

export interface MonetizationProgressEventDetail
  extends MonetizationEventDetail {
  // The amount * received * at the destination specified in the SPSP endpoint
  amount: string
  assetCode: string
  assetScale: number
  receipt?: string
}

export interface MonetizationProgressEvent
  extends CustomEvent<MonetizationProgressEventDetail> {
  type: 'monetizationprogress'
}

/**
 * Streaming has been initiated, yet first non zero packet is "pending"
 * It will normally transition from this `state` to `started`, yet not
 * always.
 */
export type PendingState = 'pending'

/**
 * Streaming has received a non zero packet and is still active
 */
export type StartedState = 'started'

/**
 * Streaming is inactive.
 * In the interest of keeping the amount of states necessary to handle down
 * this could mean a variety of things:
 *  - monetization may not be supported (no provider enabled)
 *  - may not have started yet
 *  - paused (potentially resumed)
 *  - finished completely (awaiting another request)
 *    - {@see MonetizationStopEventDetail.finalized}
 *  - payment request denied by user intervention
 */
export type StoppedState = 'stopped'

export type MonetizationState = PendingState | StartedState | StoppedState

export interface MonetizationEventMap {
  monetizationpending: MonetizationPendingEvent
  monetizationstart: MonetizationStartEvent
  monetizationstop: MonetizationStopEvent
  monetizationprogress: MonetizationProgressEvent
}

export type MonetizationEventType = keyof MonetizationEventMap

export interface MonetizationObject extends EventTarget {
  state: MonetizationState
  addEventListener<T extends MonetizationEventType>(
    type: T,
    listener: TEventListenerOrListenerObject<MonetizationEventMap[T]> | null,
    options?: boolean | AddEventListenerOptions
  ): void

  removeEventListener<T extends MonetizationEventType>(
    type: T,
    listener: TEventListenerOrListenerObject<MonetizationEventMap[T]> | null,
    options?: EventListenerOptions | boolean
  ): void
}

export interface MonetizationExtendedDocument extends Document {
  monetization: MonetizationObject
}

export type MonetizationEvent =
  | MonetizationProgressEvent
  | MonetizationStartEvent
  | MonetizationPendingEvent
  | MonetizationStopEvent

export interface SPSPResponse {
  destination_account: string
  shared_secret: string
  receipts_enabled?: boolean
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
    }
)

export type StreamEventCallback<T> = (
  val: T,
  stream: MonetizationStream
) => void

export interface StreamEventsEmitter extends NodeJS.EventEmitter {
  on<T extends MonetizationEventType>(
    event: T,
    val: StreamEventCallback<MonetizationEventMap[T]>
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

export interface MonetizationStream<
  Request extends MinimumRequest = MonetizationRequest
> extends StreamControl,
    StreamEventsEmitter {
  request: Request
  state: MonetizationState
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
