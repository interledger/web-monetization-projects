import { EventEmitter } from 'events'

import { inject, injectable } from 'inversify'
import {
  MonetizationTagManager,
  PaymentDetails,
  whenDocumentReady,
  mozClone,
  PaymentDetailsChangeArguments
} from '@webmonetization/polyfill-utils'
import {
  DocumentMonetization,
  IdleDetection
} from '@webmonetization/wext/content'
import { MonetizationProgressEvent, TipEvent } from '@webmonetization/types'

import * as tokens from '../../types/tokens'
import {
  CheckIFrameIsAllowedFromIFrameContentScript,
  ContentScriptInit,
  OnFrameAllowedChanged,
  PauseWebMonetization,
  ReportCorrelationIdFromIFrameContentScript,
  ResumeWebMonetization,
  StartWebMonetization,
  StopWebMonetization,
  ToContentMessage
} from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { debug } from '../util/logging'
import { addCoilExtensionInstalledMarker } from '../util/addCoilExtensionMarker'
import { BuildConfig } from '../../types/BuildConfig'

import { Frames } from './Frames'
import { AdaptedContentService } from './AdaptedContentService'
import { ContentAuthService } from './ContentAuthService'
import { DebugService } from './DebugService'

function startWebMonetizationMessage(request?: PaymentDetails) {
  if (!request) {
    throw new Error(`Expecting request to be set`)
  }
  const message: StartWebMonetization = {
    command: 'startWebMonetization',
    data: { ...request }
  }
  return message
}

@injectable()
export class ContentScript {
  private paused = false
  private readonly tagManager: MonetizationTagManager

  constructor(
    private storage: Storage,
    private window: Window,
    private document: Document,
    @inject(tokens.ContentRuntime) private runtime: ContentRuntime,
    @inject(tokens.BuildConfig) private buildConfig: BuildConfig,
    private adaptedContent: AdaptedContentService,
    private frames: Frames,
    private idle: IdleDetection,
    private wmDebug: DebugService,
    private monetization: DocumentMonetization,
    private auth: ContentAuthService
  ) {
    this.tagManager = new MonetizationTagManager(
      this.window,
      this.document,
      details => {
        this.onPaymentDetailsChange(details)
      },
      false
    )
    // Do this before we scan the document for tags in startWhenDocumentReady,
    // so we can capture the events
    this.wmDebug.init(this.tagManager)
  }

  async startMonetization(details: PaymentDetails) {
    // TODO:WM2
    if (this.tagManager.atMostOneTagAndNoneInBody()) {
      this.monetization.setMonetizationRequest({ ...details })
    }
    await this.doStartMonetization(details)
  }

  stopMonetization(details: PaymentDetails) {
    const request: StopWebMonetization = {
      command: 'stopWebMonetization',
      data: details
    }
    // TODO:WM2
    if (this.tagManager.atMostOneTagAndNoneInBody()) {
      this.monetization.setState({
        requestId: details.requestId,
        state: 'stopped',
        finalized: true
      })
      this.monetization.setMonetizationRequest(undefined)
    }
    void this.runtime.sendMessage(request)
  }

  startTagManager() {
    // // Scan for WM tags when page is interactive
    this.tagManager.startWhenDocumentReady()
  }

  private onPaymentDetailsChange(details: PaymentDetailsChangeArguments) {
    const { started, stopped } = details
    if (stopped) {
      debug('sending stopped request', JSON.stringify(stopped, null, 2))
      this.stopMonetization(stopped)
    }
    if (started) {
      debug('sending start request', JSON.stringify(started, null, 2))
      void this.startMonetization(started)
    }
  }

  // TODO: WM2
  private async doStartMonetization(request: PaymentDetails) {
    if (this.frames.isIFrame) {
      const allowed = await new Promise<boolean>(resolve => {
        const message: CheckIFrameIsAllowedFromIFrameContentScript = {
          command: 'checkIFrameIsAllowedFromIFrameContentScript'
        }
        this.runtime.sendMessage(message, resolve)
      })
      if (!allowed) {
        // Always log this regardless of loggingEnabled setting as it's
        // reporting an error, rather than logging per se
        // eslint-disable-next-line no-console
        console.error(
          '<iframe> (or one of its ancestors) ' +
            'is not authorized to allow Web Monetization, %s',
          window.location.href
        )
        return
      }
    }
    // noinspection ES6MissingAwait
    void this.runtime.sendMessage(startWebMonetizationMessage(request))
  }

  setRuntimeMessageListener() {
    this.runtime.onMessage.addListener(
      (request: ToContentMessage, sender, sendResponse) => {
        if (request.command === 'checkAdaptedContent') {
          if (request.data && request.data.from) {
            debug(
              'checkAdaptedContent with from',
              this.document.readyState,
              JSON.stringify(request.data),
              window.location.href
            )
          } else {
            debug('checkAdaptedContent without from')
          }
          void this.adaptedContent.checkAdaptedContent()
        } else if (request.command === 'monetizationProgress') {
          const detail: MonetizationProgressEvent['detail'] = {
            amount: request.data.amount,
            assetCode: request.data.assetCode,
            assetScale: request.data.assetScale,
            receipt: request.data.receipt,
            paymentPointer: request.data.paymentPointer,
            requestId: request.data.requestId
          }
          this.monetization.dispatchMonetizationProgressEvent(detail)
          const data = request.data
          const eventDetail = {
            paymentPointer: data.paymentPointer,
            receipt: data.receipt,
            assetScale: data.assetScale,
            assetCode: data.assetCode,
            amount: BigInt(data.amount)
          }
          const firefoxProof = mozClone(eventDetail, this.document)
          this.tagManager.dispatchEventByLinkId(
            data.requestId,
            new CustomEvent('monetization-v2', {
              bubbles: true,
              cancelable: false,
              detail: firefoxProof
            })
          )
        } else if (request.command === 'checkIFrameIsAllowedFromBackground') {
          this.frames
            .checkIfIframeIsAllowedFromBackground(request.data.frame)
            .then(sendResponse)
          return true
        } else if (
          request.command === 'reportCorrelationIdToParentContentScript'
        ) {
          this.frames.reportCorrelation(request.data)
        } else if (request.command === 'onFrameAllowedChanged') {
          this.onFrameAllowedChanged(request)
        } else if (request.command === 'tip') {
          debug('sendTip/tip event')
          const detail: TipEvent['detail'] = {
            amount: request.data.amount,
            assetCode: request.data.assetCode,
            assetScale: request.data.assetScale,
            paymentPointer: request.data.paymentPointer
          }
          this.monetization.dispatchTipEvent(detail)
        } else if (request.command === 'clearToken') {
          this.storage.removeItem('token')
        } else if (request.command === 'logInActiveTab') {
          debug('LOG FROM BG', request.data.log)
        } else if (request.command === 'spspRequestEvent') {
          const {
            data: { requestId, event, message }
          } = request
          this.tagManager.dispatchEventByLinkId(requestId, new Event(event))
          if (message) {
            this.wmDebug.logSPSPEvent(request)
          }
        } else if (request.command === 'setMonetizationState') {
          if (
            this.tagManager.atMostOneTagAndNoneInBody() ||
            request.data.finalized
          ) {
            this.monetization.setState(request.data)
          }
        } else if (request.command === 'monetizationStart') {
          debug('monetizationStart event')
          if (this.tagManager.atMostOneTagAndNoneInBody()) {
            this.monetization.dispatchMonetizationStartEventAndSetMonetizationState(
              request.data
            )
          }
        }

        // Don't need to return true here, not using sendResponse
        // https://developer.chrome.com/apps/runtime#event-onMessage
      }
    )
  }

  init() {
    if (this.frames.isMonetizableFrame) {
      this.frames.monitor()
    }

    if (this.frames.isIFrame) {
      this.window.addEventListener('message', event => {
        const data = event.data
        if (typeof data.wmIFrameCorrelationId === 'string') {
          const message: ReportCorrelationIdFromIFrameContentScript = {
            command: 'reportCorrelationIdFromIFrameContentScript',
            data: {
              correlationId: data.wmIFrameCorrelationId
            }
          }
          void this.runtime.sendMessage(message)
        }
      })
    }

    if (this.frames.isMonetizableFrame) {
      const message: ContentScriptInit = {
        command: 'contentScriptInit',
        data: {
          origin: this.document.location.origin
        }
      }

      this.runtime.sendMessage(message)

      this.injectPolyfillsAndWatchTags()
    }
    if (this.frames.isAnyCoilFrame) {
      if (this.frames.isIFrame) {
        this.auth.handleCoilTokenMessage()
      } else {
        // TODO: this happens on every coil page, does that make sense?
        this.auth.refreshUser()
      }
      if (this.frames.isCoilTopFrame) {
        this.auth.handleCoilWriteTokenWindowEvent()
        addCoilExtensionInstalledMarker(this.document)
      }
    }
  }

  private injectPolyfillsAndWatchTags() {
    whenDocumentReady(this.document, () => {
      this.startTagManager()
      this.watchPageEventsToPauseOrResume()
    })
    this.setRuntimeMessageListener()
    if (!this.buildConfig.isMV3) {
      this.monetization.injectMonetizationPolyfill()
    }
  }

  /**
   * IMPORTANT: The pause() must be run after the startMonetization() so
   * that when the document.visibilityState is hidden a stream
   * doesn't start
   */
  watchPageEventsToPauseOrResume() {
    const { setWatch } = this.idle.watchPageEvents()
    const runtime = this.runtime
    setWatch({
      pause: (reason: string) => {
        this.paused = true
        const requestIds = this.tagManager.requestIds()
        debug(
          `pauseWebMonetization reason ${reason} requestIds=${JSON.stringify(
            requestIds
          )}`
        )
        if (requestIds.length) {
          const pause: PauseWebMonetization = {
            command: 'pauseWebMonetization',
            data: {
              requestIds
            }
          }
          void runtime.sendMessage(pause)
        }
      },
      resume: (reason: string) => {
        debug(`resumeWebMonetization reason ${reason}`)
        this.paused = false
        const requests = this.tagManager.requests()
        if (requests.length) {
          const resume: ResumeWebMonetization = {
            command: 'resumeWebMonetization',
            data: {
              requests
            }
          }
          void runtime.sendMessage(resume)
        }
      }
    })
  }

  private onFrameAllowedChanged(message: OnFrameAllowedChanged) {
    const allowed = message.data.allowed
    const monetizationRequest = this.monetization.getMonetizationRequest()
    const requests = this.tagManager.linkRequests()
    if (allowed) {
      // TODO: WM2 how to do the state check on the link requests ?
      if (monetizationRequest && this.monetization.getState() === 'stopped') {
        requests.push(monetizationRequest)
        // The pause needs to be done after the async allow checks and start
      }
      for (const request of requests) {
        this.doStartMonetization(request).then(() => {
          if (this.paused) {
            const pause: PauseWebMonetization = {
              command: 'pauseWebMonetization',
              data: {
                // TODO:WM2
                requestIds: [request.requestId]
              }
            }
            this.runtime.sendMessage(pause)
          }
        })
      }
    } else {
      const requests = this.tagManager.linkRequests()
      if (monetizationRequest) {
        requests.push(monetizationRequest)
      }
      for (const request of requests) {
        const message: StopWebMonetization = {
          command: 'stopWebMonetization',
          data: request
        }
        this.runtime.sendMessage(message)
      }
    }
  }
}
