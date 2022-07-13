// noinspection ES6MissingAwait

import { inject, injectable } from 'inversify'
import { MonetizationState } from '@webmonetization/types'
import { resolvePaymentEndpoint } from '@webmonetization/polyfill-utils'

import * as tokens from '../../types/tokens'
import {
  MonetizationProgress,
  MonetizationStart,
  PauseWebMonetization,
  ResumeWebMonetization,
  SetMonetizationState,
  StartWebMonetization,
  StopWebMonetization
} from '../../types/commands'
import { StoreProxy } from '../../types/storage'
import { getFrameSpec, getTab } from '../../util/tabs'
import { FrameSpec } from '../../types/FrameSpec'

import { AuthService } from './AuthService'
import { TabStates } from './TabStates'
import { Streams } from './Streams'
import { Logger, logger } from './utils'
import { ActiveTabLogger } from './ActiveTabLogger'
import { StreamAssociations } from './StreamAssociations'
import { StreamMoneyEvent } from './Stream'
import { SPSPState } from './SPSPState'

type MessageSender = chrome.runtime.MessageSender

type ChromeTabs = typeof chrome['tabs']

@injectable()
export class MonetizationService {
  constructor(
    private assoc: StreamAssociations,
    private streams: Streams,
    private tabStates: TabStates,
    @inject(tokens.StoreProxy)
    private store: StoreProxy,
    private auth: AuthService,
    private spspState: SPSPState,
    private activeTabLogger: ActiveTabLogger,
    @inject(tokens.LoggingEnabled)
    private loggingEnabled: boolean,
    @logger('MonetizationService')
    private log: Logger,
    @inject(tokens.WextApi)
    private api: { tabs: { sendMessage: ChromeTabs['sendMessage'] } }
  ) {}

  get activeTab() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.tabStates.activeTab!
  }

  setFrameMonetized(
    { tabId, frameId }: FrameSpec,
    requestId: string,
    total = 0,
    from = ''
  ) {
    this.tabStates.incrementTotal({ tabId, frameId }, requestId, total)

    if (this.activeTab === tabId) {
      this.tabStates.reloadTabState({ from: 'setFrameMonetized ' + from })
    }
  }

  routeStreamsMoneyEventsToContentScript() {
    // pass stream monetization events to the correct tab
    this.streams.on('money', (details: StreamMoneyEvent) => {
      const frame = this.assoc.getStreamFrame(details.requestId)
      const { tabId, frameId } = frame
      if (details.packetNumber === 0) {
        const message: MonetizationStart = {
          command: 'monetizationStart',
          data: {
            paymentPointer: details.paymentPointer,
            requestId: details.requestId
          }
        }
        this.api.tabs.sendMessage(tabId, message, { frameId })
      }

      const message: MonetizationProgress = {
        command: 'monetizationProgress',
        data: {
          paymentPointer: details.paymentPointer,
          amount: details.amount,
          assetCode: details.assetCode,
          requestId: details.requestId,
          assetScale: details.assetScale,
          sentAmount: details.sentAmount,
          receipt: details.receipt
        }
      }
      this.handleMonetizationProgress(frame, details)
      // We don't want to send this progress event if the link has already
      // errored.
      if (this.spspState.sendProgressEvent(details.requestId)) {
        this.api.tabs.sendMessage(tabId, message, { frameId })
      }
    })
  }

  handleMonetizationProgress(
    { tabId, frameId }: FrameSpec,
    details: StreamMoneyEvent
  ) {
    this.setFrameMonetized(
      { tabId, frameId },
      details.requestId,
      Number(details?.sentAmount ?? '0'),
      'handleMonetizationProgress'
    )
  }

  async startWebMonetization(
    request: StartWebMonetization,
    sender: MessageSender
  ) {
    const frame = getFrameSpec(sender)
    const { tabId, frameId } = frame
    const { requestId } = request.data

    if (request.data.tagType === 'link') {
      // How do we know if the request is a wm2 request
      // It could be a link tag in the head that is one of many
      // Maybe we should check before emitting the start events??
    }

    this.assoc.addStreamId(frame, requestId)
    this.activeTabLogger.log(`startWM called with ${requestId}`, frame)
    this.tabStates.setFrame(frame, {
      paymentPointer: request.data.paymentPointer
    })
    this.tabStates.logLastMonetizationCommand(frame, 'start', request.data)

    // This used to be sent from content script as a separate message
    this.setFrameMonetized(frame, requestId, 0, 'startWebMonetization')

    // TODO:WM2
    setTimeout(() => {
      this.tabStates.reloadTabState({
        from: 'startWebMonetization timeout(ms=10)'
      })
    }, 10)

    // This may throw so do after mayMonetizeSite has had a chance to set
    // the page as being monetized (or attempted to be)
    const spspEndpoint = resolvePaymentEndpoint(request.data.paymentPointer)

    const userBeforeReAuth = this.store.user
    let emittedPending = false
    const emitPending = () => {
      // Set the requestId so that DocumentMonetization#setState will ignore
      // this message if tags are added and removed extremely fast.
      this.sendSetMonetizationStateMessage(
        frame,
        'pending',
        request.data.requestId
      )
      emittedPending = true
    }

    const setUnavailable = (fromNo: 'token' | 'subscription') => {
      this.tabStates.setIcon(tabId, 'unavailable')
      this.tabStates.reloadTabState({ from: `no ${fromNo}` })
    }

    // If we are optimistic we have an active subscription (things could have
    // changed since our last cached whoami query), emit pending immediately,
    // otherwise wait until recheck auth/whoami, potentially not even emitting.
    if (userBeforeReAuth?.subscription?.active) {
      emitPending()
    } else {
      setUnavailable('subscription')
    }

    this.log('startWebMonetization, request', request)

    this.log('loading token for monetization', requestId)
    let isAuthenticated: boolean
    try {
      isAuthenticated = await this.auth.maybeRefreshAndStoreState()
    } catch (e) {
      isAuthenticated = false
    }
    if (!isAuthenticated) {
      // not signed in.
      // eslint-disable-next-line no-console
      if (this.loggingEnabled) {
        console.warn('startWebMonetization cancelled; no token')
      }
      this.activeTabLogger.log('startWebMonetization cancelled; no token')
      this.sendSetMonetizationStateMessage(
        frame,
        'stopped',
        request.data.requestId
      )
      setUnavailable('token')
      return false
    }
    if (!this.store.user?.subscription?.active) {
      if (this.loggingEnabled) {
        console.warn('startWebMonetization cancelled; no active subscription')
      }
      this.activeTabLogger.log(
        'startWebMonetization cancelled; no active subscription',
        frame
      )
      this.sendSetMonetizationStateMessage(
        frame,
        'stopped',
        request.data.requestId
      )
      setUnavailable('subscription')
      return false
    }

    const lastCommand =
      this.tabStates.getFrameOrDefault(frame)[`monetization-state-${requestId}`]
        ?.command

    // Check that this startWebMonetization invocation is still valid before
    // we go ahead. Any operation that we `await`d on could have potentially
    // masked state changes. e.g. `maybeRefreshAndStoreState`
    // (which will update `whoami`) which takes longer than it does to switch
    // out a monetization tag.

    this.activeTabLogger.log(
      `lastCommand for requestId ${requestId} is ${lastCommand}`,
      frame
    )

    if (lastCommand === 'stop') {
      // The pending message (if sent) will have been ignored on the content
      // script side in this case too, so there's no need to send a stop, as
      // will already have been stopped (for that id).
      // If we sent a stopped message, it would need to be tagged with
      // requestId, and would only ever be ignored (
      // due to the new monetization request implied in the if condition)
      this.activeTabLogger.log(
        `startWebMonetization aborted; stale requestId: ${requestId}`,
        frame
      )
      return false
    }

    if (!emittedPending) {
      emitPending()
    }

    if (lastCommand !== 'start' && lastCommand !== 'pause') {
      this.log('startWebMonetization cancelled via', lastCommand)
      this.activeTabLogger.log(
        `startWebMonetization cancelled via ${lastCommand}`,
        frame
      )
      return false
    }

    this.log('starting stream', requestId)
    // We need to start this stream, even if we've already received a pause.
    // That way we can "resume" it later.
    this.streams.beginStream(requestId, {
      token,
      spspEndpoint,
      ...request.data,
      initiatingUrl: request.data.initiatingUrl
    })

    if (lastCommand === 'pause') {
      // TODO: why do we need the timeout here ?
      setTimeout(() => {
        // TODO:WM2
        this.doPauseWebMonetization(frame, [requestId])
      }, 0)
    }
    return true
  }

  private doPauseWebMonetization(frame: FrameSpec, requestIds?: string[]) {
    this.activeTabLogger.log(
      'doPause ' + JSON.stringify({ frame, requestIds }),
      frame
    )
    const ids = requestIds ?? this.assoc.getStreams(frame)
    ids.forEach(id => {
      this.tabStates.logLastMonetizationCommand(frame, 'pause', id)
      this.log('pausing stream', id)
      this.streams.pauseStream(id)
      this.sendSetMonetizationStateMessage(frame, 'stopped', id)
    })
    return true
  }

  private doResumeWebMonetization(frame: FrameSpec, requestIds?: string[]) {
    this.activeTabLogger.log(
      'doResume ' + JSON.stringify({ frame, requestIds }),
      frame
    )
    const ids = requestIds ?? this.assoc.getStreams(frame)
    ids.forEach(id => {
      this.tabStates.logLastMonetizationCommand(frame, 'resume', id)
      this.log('resuming stream', ids)
      this.sendSetMonetizationStateMessage(frame, 'pending', id)
      this.streams.resumeStream(id)
    })
    return true
  }

  pauseWebMonetization(request: PauseWebMonetization, sender: MessageSender) {
    return this.doPauseWebMonetization(
      getFrameSpec(sender),
      request.data.requestIds
    )
  }

  resumeWebMonetization(request: ResumeWebMonetization, sender: MessageSender) {
    // Note that this gets sent regardless of whether actually monetized or not
    // it's more like 'set tab interactive'
    return this.doResumeWebMonetization(
      getFrameSpec(sender),
      request.data.requestIds
    )
  }

  stopWebMonetization(request: StopWebMonetization, sender: MessageSender) {
    return this.stopWebMonetizationStream(request.data.requestId)
  }

  _closeStreams(tabId: number, frameId?: number) {
    const streamIds = this.assoc.getTabStreams(tabId)
    const haveFrameId = typeof frameId !== 'undefined'

    let closed = 0
    streamIds.forEach(([streamId, innerFrameId]) => {
      if (haveFrameId && innerFrameId.frameId !== frameId) {
        return
      }
      this.log('closing stream with id', streamId)
      this.streams.closeStream(streamId)
      closed++
    })
    if (haveFrameId) {
      this.assoc.clearStreams({ tabId, frameId: frameId as number })
    } else {
      this.assoc.clearTabStreams(tabId)
    }
    return !!closed
  }

  stopWebMonetizationStream(requestId: string) {
    const frame = this.assoc.getStreamFrame(requestId)
    this.tabStates.setFrame(frame, { paymentPointer: undefined })
    this.activeTabLogger.log(
      `stopWebMonetization called for ${requestId}`,
      frame
    )
    this.tabStates.logLastMonetizationCommand(frame, 'stop', requestId)

    this.streams.closeStream(requestId)
    this.assoc.clearStreamFrameAndFromFrameSet(requestId)
    this.sendSetMonetizationStateMessage(frame, 'stopped', requestId)
    this.tabStates.reloadTabState({ from: 'stopWebMonetization' })
    return true
  }

  // doStopWebMonetization(frame: FrameSpec) {
  //   const requestIds = this.assoc.getStreams(frame)
  //
  //   const closed = this._closeStreams(frame.tabId, frame.frameId)
  //   // May be noop other side if stop monetization was initiated from
  //   // ContentScript
  //   requestIds.forEach(requestId => {
  //     this.tabStates.logLastMonetizationCommand(frame, 'stop', requestId)
  //     this.sendSetMonetizationStateMessage(frame, 'stopped', requestId)
  //   })
  //
  //   if (closed) {
  //     this.tabStates.clearFrame(frame)
  //   }
  //   this.tabStates.reloadTabState({
  //     from: 'stopWebMonetization'
  //   })
  //   return true
  // }

  sendSetMonetizationStateMessage(
    { tabId, frameId }: FrameSpec,
    state: MonetizationState,
    requestId: string
  ) {
    const message: SetMonetizationState = {
      command: 'setMonetizationState',
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        requestId,
        state
      }
    }
    this.api.tabs.sendMessage(tabId, message, { frameId })
  }

  private handleStreamsAbortEvent() {
    this.streams.on('abort', (requestId: string) => {
      this.log('aborting monetization request', requestId)
      this.stopWebMonetizationStream(requestId)
    })
  }

  init() {
    this.handleStreamsAbortEvent()
    this.routeStreamsMoneyEventsToContentScript()
    this.spspState.bindToStreamsEvents()
  }
}
