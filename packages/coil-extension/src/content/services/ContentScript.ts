import { inject, injectable } from 'inversify'
import * as uuid from 'uuid'
import {
  MonetizationTagObserver,
  PaymentDetails,
  whenDocumentReady
} from '@web-monetization/polyfill-utils'
import {
  DocumentMonetization,
  IdleDetection
} from '@web-monetization/wext/content'
import { MonetizationProgressEvent } from '@web-monetization/types'

import * as tokens from '../../types/tokens'
import {
  ContentScriptInit,
  PauseWebMonetization,
  ResumeWebMonetization,
  StartIFrameWebMonetization,
  StopWebMonetization,
  ToContentMessage
} from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { debug } from '../util/logging'
import { addCoilExtensionInstalledMarker } from '../util/addCoilExtensionMarker'

import { Frames } from './Frames'
import { AdaptedContentService } from './AdaptedContentService'
import { ContentAuthService } from './ContentAuthService'
import { MonetizationEventsLogger } from './MonetizationEventsLogger'

@injectable()
export class ContentScript {
  uuid = uuid.v4()

  constructor(
    private storage: Storage,
    private window: Window,
    private document: Document,
    @inject(tokens.ContentRuntime) private runtime: ContentRuntime,
    private adaptedContent: AdaptedContentService,
    private frames: Frames,
    private idle: IdleDetection,
    private monetization: DocumentMonetization,
    private auth: ContentAuthService,
    private eventsLogger: MonetizationEventsLogger
  ) {}

  handleMonetizationTag() {
    const { frames, runtime, monetization, uuid: frameUuid } = this

    function startMonetization(details: PaymentDetails) {
      monetization.setMonetizationRequest({
        paymentPointer: details.paymentPointer,
        requestId: details.requestId,
        initiatingUrl: details.initiatingUrl
      })
      if (frames.isTopFrame) {
        runtime.sendMessage(monetization.startWebMonetizationMessage(frameUuid))
      } else {
        const request: StartIFrameWebMonetization = {
          command: 'startIFrameWebMonetization',
          data: { frameUuid }
        }
        runtime.sendMessage(request)
      }
    }

    function stopMonetization(details: PaymentDetails) {
      const request: StopWebMonetization = {
        command: 'stopWebMonetization',
        data: details
      }
      monetization.setState({ state: 'stopped', finalized: true })
      monetization.setMonetizationRequest(undefined)
      runtime.sendMessage(request)
    }

    const monitor = new MonetizationTagObserver(
      this.window,
      this.document,
      ({ started, stopped }) => {
        if (stopped) {
          stopMonetization(stopped)
        }
        if (started) {
          startMonetization(started)
        }
      }
    )

    // // Scan for WM meta tags when page is interactive
    monitor.startWhenDocumentReady()
  }

  setRuntimeMessageListener() {
    this.runtime.onMessage.addListener((request: ToContentMessage) => {
      if (request.command === 'checkAdaptedContent') {
        if (this.window.location.href === request.data.url) {
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
          this.adaptedContent.checkAdaptedContent()
        } else {
          debug(
            'ignoring checkAdaptedContent with different url',
            this.window.location.href,
            request.data.url
          )
        }
      } else if (request.command === 'setMonetizationState') {
        this.monetization.setState(request.data)
      } else if (request.command === 'monetizationProgress') {
        const detail: MonetizationProgressEvent['detail'] = {
          amount: request.data.amount,
          assetCode: request.data.assetCode,
          assetScale: request.data.assetScale,
          paymentPointer: request.data.paymentPointer,
          requestId: request.data.requestId
        }
        this.monetization.postMonetizationProgressWindowMessage(detail)
      } else if (request.command === 'monetizationStart') {
        debug('monetizationStart event')
        this.monetization.postMonetizationStartWindowMessageAndSetMonetizationState(
          request.data
        )
      } else if (request.command === 'checkAllowedIFrames') {
        this.frames.sendAllowMessages(request.data.frameUuid)
      }
      // Don't need to return true here, not using sendResponse
      // https://developer.chrome.com/apps/runtime#event-onMessage
    })
  }

  watchPageEvents() {
    const { setWatch } = this.idle.watchPageEvents()
    const runtime = this.runtime
    setWatch({
      pause: () => {
        const pause: PauseWebMonetization = {
          command: 'pauseWebMonetization'
        }
        runtime.sendMessage(pause)
      },
      resume: () => {
        const resume: ResumeWebMonetization = {
          command: 'resumeWebMonetization'
        }
        runtime.sendMessage(resume)
      }
    })
  }

  init() {
    if (this.frames.isMonetizableFrame) {
      this.frames.monitor()
    }

    // TODO: we could allow arbitrary frames
    if (this.frames.isDirectChildFrame) {
      this.window.addEventListener('message', event => {
        const data = event.data
        if (typeof data.wmIframe === 'object') {
          const {
            forId,
            allowed
          }: { forId: string; allowed: boolean } = data.wmIframe
          if (forId === this.uuid) {
            if (allowed && this.monetization.hasRequest()) {
              this.runtime.sendMessage(
                this.monetization.startWebMonetizationMessage(forId)
              )
            } else {
              console.error(
                '<iframe href="%s"> is not authorized to allow web monetization',
                window.location.href
              )
            }
          }
        }
      })
    }

    if (this.frames.isMonetizableFrame) {
      const message: ContentScriptInit = { command: 'contentScriptInit' }
      this.runtime.sendMessage(message)
      whenDocumentReady(this.document, () => {
        this.handleMonetizationTag()
        this.watchPageEventsToPauseOrResume()
      })
      this.setRuntimeMessageListener()
      this.monetization.injectDocumentMonetization()
      if (this.storage.getItem('WM_DEBUG')) {
        this.eventsLogger.bindLoggersToEvents()
      }
    }

    if (this.frames.isAnyCoilFrame) {
      if (this.frames.isIFrame) {
        this.auth.handleCoilTokenMessage()
      } else {
        this.auth.syncViaInjectToken()
      }

      if (this.frames.isCoilTopFrame) {
        this.auth.handleCoilWriteTokenWindowEvent()
        addCoilExtensionInstalledMarker(this.document)
      }
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
      pause: () => {
        const pause: PauseWebMonetization = {
          command: 'pauseWebMonetization'
        }
        runtime.sendMessage(pause)
      },
      resume: () => {
        const resume: ResumeWebMonetization = {
          command: 'resumeWebMonetization'
        }
        runtime.sendMessage(resume)
      }
    })
  }
}
