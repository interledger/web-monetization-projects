import { inject, injectable } from 'inversify'
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
  StartWebMonetization,
  StopWebMonetization,
  ToContentMessage
} from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { debug } from '../util/logging'
import { addCoilExtensionInstalledMarker } from '../util/addCoilExtensionMarker'

import { Frames } from './Frames'
import { RunContentHandler } from './RunContentHandler'
import { ContentAuthService } from './ContentAuthService'
import { MonetizationEventsLogger } from './MonetizationEventsLogger'

@injectable()
export class ContentScript {
  constructor(
    private storage: Storage,
    private window: Window,
    private document: Document,
    @inject(tokens.ContentRuntime) private runtime: ContentRuntime,
    private runContentHandler: RunContentHandler,
    private frames: Frames,
    private idle: IdleDetection,
    private monetization: DocumentMonetization,
    private auth: ContentAuthService,
    private monetizationEventsLogger: MonetizationEventsLogger
  ) {}

  handleMonetizationTag() {
    const runtime = this.runtime
    const monetization = this.monetization
    const window = this.window

    function startMonetization(details: PaymentDetails) {
      const request: StartWebMonetization = {
        command: 'startWebMonetization',
        data: { ...details, initiatingUrl: window.location.href }
      }

      monetization.setMonetizationRequest({
        paymentPointer: details.paymentPointer,
        requestId: details.requestId
      })
      runtime.sendMessage(request)
    }

    function stopMonetization(details: PaymentDetails) {
      const request: StopWebMonetization = {
        command: 'stopWebMonetization',
        data: details
      }
      monetization.setState('stopped')
      runtime.sendMessage(request)
    }

    const monitor = new MonetizationTagObserver(
      this.document,
      ({ started, stopped }) => {
        if (this.frames.isIFrame) {
          console.error(
            'This <iframe> is not authorized to use Web Monetization:',
            this.window.location.href
          )
        } else {
          if (stopped) {
            stopMonetization(stopped)
          }
          if (started) {
            startMonetization(started)
          }
        }
      }
    )

    // // Scan for WM meta tags when page is interactive
    monitor.startWhenDocumentReady()
  }

  setRuntimeMessageListener() {
    this.runtime.onMessage.addListener((request: ToContentMessage) => {
      if (request.command === 'runContent') {
        if (request.data && request.data.from) {
          debug('runContent with from', JSON.stringify(request.data))
        } else {
          debug('runContent without from')
        }
        this.runContentHandler.runContent().catch(e => {
          debug(e, 'origin=', window.origin, 'iframe=', this.frames.isIFrame)
        })
      } else if (request.command === 'setMonetizationState') {
        this.monetization.setState(request.data.state)
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
    if (this.frames.isTopFrame) {
      const message: ContentScriptInit = { command: 'contentScriptInit' }
      this.runtime.sendMessage(message)
      whenDocumentReady(this.document, () => {
        this.handleMonetizationTag()
        this.watchPageEventsToPauseOrResume()
      })
      this.setRuntimeMessageListener()
      this.monetization.injectDocumentMonetization()
      this.monetizationEventsLogger.bindLoggersToEvents()
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
