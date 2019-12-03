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
  MonetizationProgress,
  PauseWebMonetization,
  ResumeWebMonetization,
  SetCoilDomain,
  StartWebMonetization,
  StopWebMonetization,
  ToContentMessage
} from '../../types/commands'
import { ContentRuntime } from '../types/ContentRunTime'
import { debug } from '../util/logging'
import { addCoilExtensionInstalledMarker } from '../util/addCoilExtensionMarker'
import { Config } from '../../services/Config'

import { Frames } from './Frames'
import { RunContentHandler } from './RunContentHandler'
import { ContentAuthService } from './ContentAuthService'
import { MonetizationEventsLogger } from './MonetizationEventsLogger'
import { ContentConfig } from './ContentConfig'

@injectable()
export class ContentScript {
  private monitor!: MonetizationTagObserver

  constructor(
    @inject(tokens.Storage) private storage: Storage,
    @inject(tokens.Window) private window: Window,
    @inject(tokens.Document) private document: Document,
    @inject(tokens.ContentRuntime) private runtime: ContentRuntime,
    @inject(Config)
    private config: ContentConfig,
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

    const monitor = (this.monitor = new MonetizationTagObserver(
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
    ))

    // // Scan for WM meta tags when page is interactive
    monitor.startWhenDocumentReady()
  }

  setRuntimeMessageListener() {
    this.runtime.onMessage.addListener((request: ToContentMessage) => {
      switch (request.command) {
        case 'runContent':
          if (request.data && request.data.from) {
            debug('runContent with from', JSON.stringify(request.data))
          } else {
            debug('runContent without from')
          }
          this.runContentHandler.runContent().catch(e => {
            debug(e, 'origin=', window.origin, 'iframe=', this.frames.isIFrame)
          })
          break
        case 'setMonetizationState':
          this.monetization.setState(request.data.state)
          break
        case 'setCoilDomain':
          this.handleSetCoilDomain(request)
          break
        case 'resumeWebMonetization':
          this.handleResumeWebMonetization()
          break
        case 'monetizationProgress':
          this.handleMonetizationProgress(request)
          break
        case 'monetizationStart':
          debug('monetizationStart event')
          this.monetization.postMonetizationStartWindowMessageAndSetMonetizationState(
            request.data
          )
          break
      }
      // Don't need to return true here, not using sendResponse
      // https://developer.chrome.com/apps/runtime#event-onMessage
    })
  }

  private handleSetCoilDomain(request: SetCoilDomain) {
    const newCoilDomain = request.data.value
    // this.storage.setItem(this.runtime.getURL('/coil-domain'), newCoilDomain)
    if (this.config.coilDomain !== newCoilDomain) {
      this.config.overRideCoilDomain = newCoilDomain
      if (this.monetization.state === 'stopped') {
        // this.monitor.notifyObserversOfExisting()
      }
    }
  }

  private handleMonetizationProgress(request: MonetizationProgress) {
    const detail: MonetizationProgressEvent['detail'] = {
      amount: request.data.amount,
      assetCode: request.data.assetCode,
      assetScale: request.data.assetScale,
      paymentPointer: request.data.paymentPointer,
      requestId: request.data.requestId
    }
    this.monetization.postMonetizationProgressWindowMessage(detail)
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

  private handleResumeWebMonetization() {
    if (this.monetization.state === 'stopped') {
      this.monitor.notifyObserversOfExisting()
    }
  }
}
