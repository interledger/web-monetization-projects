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
  SetStreamControls,
  StartWebMonetization
} from '../../types/commands'
import { LocalStorageProxy } from '../../types/storage'
import { getFrameSpec, getTab } from '../../util/tabs'
import { FrameSpec } from '../../types/FrameSpec'

import { AuthService } from './AuthService'
import { TabStates } from './TabStates'
import { Streams } from './Streams'
import { Logger, logger } from './utils'
import { ActiveTabLogger } from './ActiveTabLogger'
import { StreamAssociationsWM2 } from './StreamAssociationsWM2'
import { StreamMoneyEvent } from './Stream'
import { SPSPStateWM2 } from './SPSPStateWM2'

type MessageSender = chrome.runtime.MessageSender

type ChromeTabs = typeof chrome['tabs']

@injectable()
export class MonetizationService {
  constructor(
    private assoc: StreamAssociationsWM2,
    private streams: Streams,
    private tabStates: TabStates,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private auth: AuthService,
    private spspState: SPSPStateWM2,
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
    senderUrl: string,
    total?: number
  ) {
    const tabState = this.tabStates.get(tabId)

    this.tabStates.setFrame(
      { tabId, frameId },
      {
        monetized: true,
        total: total || (tabState.frameStates[frameId]?.total ?? 0)
      }
    )

    if (this.activeTab === tabId) {
      this.tabStates.reloadTabState()
    }
  }

  mayMonetizeSite(sender: chrome.runtime.MessageSender, initiatingUrl: string) {
    this.setFrameMonetized(getFrameSpec(sender), initiatingUrl)
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
      this.handleMonetizedSite(frame, details.initiatingUrl, details)
      // We don't want to send this progress event if the link has already
      // errored.
      if (this.spspState.sendProgressEvent(details.requestId)) {
        this.api.tabs.sendMessage(tabId, message, { frameId })
      }
    })
  }

  handleMonetizedSite(
    { tabId, frameId }: FrameSpec,
    url: string,
    packet: { sentAmount: string }
  ) {
    const tabState = this.tabStates.get(tabId)
    const frameTotal = tabState?.frameStates[frameId]?.total ?? 0
    const newFrameTotal = frameTotal + Number(packet?.sentAmount ?? 0)
    this.setFrameMonetized({ tabId, frameId }, url, newFrameTotal)
  }

  async startWebMonetization(
    request: StartWebMonetization,
    sender: MessageSender
  ) {
    const frame = getFrameSpec(sender)
    const { tabId, frameId } = frame
    const { requestId } = request.data

    this.activeTabLogger.log(`startWM called with ${requestId}`, frame)
    this.tabStates.logLastMonetizationCommand(frame, 'start', request.data)

    // This used to be sent from content script as a separate message
    this.mayMonetizeSite(sender, request.data.initiatingUrl)

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
    const token = await this.auth.getTokenMaybeRefreshAndStoreState()
    if (!token) {
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

    // Check that this startWebMonetization invocation is still valid before
    // we go ahead. Any operation that we `await`d on could have potentially
    // masked state changes. e.g. `getTokenMaybeRefreshAndStoreState`
    // (which will update `whoami`) which takes longer than it does to switch
    // out a monetization tag.
    // TODO:WM2
    const WM2 = request.data.tagType === 'link'

    const frameOrDefault = this.tabStates.getFrameOrDefault(frame)
    // TODO:WM2 this assumes the stop event from content script properly
    // propagated to background script and caused the requestId to be deleted.
    // I don't think that's the case??
    if (!WM2 && !frameOrDefault[`requestId-lastCommand-${requestId}`]) {
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

    // TODO:WM2
    // eslint-disable-next-line @typescript-eslint/no-inferrable-types
    const lastCommand =
      this.tabStates.getFrameOrDefault(frame)[
        `requestId-lastCommand-${requestId}`
      ]?.command

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
    this.assoc.addStreamId(frame, requestId)
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

  setStreamControls(request: SetStreamControls, _: MessageSender) {
    const tabId = this.activeTab
    this.log('setStreamControls', request)

    this.tabStates.set(tabId, {
      stickyState: request.data.sticky,
      playState: request.data.play
    })
    if (request.data.action === 'togglePlayOrPause') {
      const tabState = this.tabStates.get(tabId)
      const framesForTab = Object.keys(tabState.frameStates).map(Number)
      this.log({ framesForTab })
      if (request.data.play === 'paused') {
        framesForTab.forEach(frameId => {
          this.doPauseWebMonetization({ frameId, tabId })
        })
      } else if (request.data.play === 'playing') {
        framesForTab.forEach(frameId => {
          this.doResumeWebMonetization({ frameId, tabId })
        })
      }
    }
    this.tabStates.reloadTabState({ from: request.command })
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
    if (this.tabStates.get(getTab(sender)).stickyState === 'sticky') {
      return
    }
    return this.doPauseWebMonetization(
      getFrameSpec(sender),
      request.data.requestIds
    )
  }

  resumeWebMonetization(request: ResumeWebMonetization, sender: MessageSender) {
    // Note that this gets sent regardless of whether actually monetized or not
    // it's more like 'set tab interactive'
    if (this.tabStates.get(getTab(sender)).playState === 'paused') {
      return
    }
    return this.doResumeWebMonetization(
      getFrameSpec(sender),
      request.data.requestIds
    )
  }

  stopWebMonetization(sender: MessageSender) {
    return this.doStopWebMonetization(getFrameSpec(sender))
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
    this.streams.closeStream(requestId)
    const frame = this.assoc.getStreamFrame(requestId)
    this.assoc.clearStreamFrameAndFromFrameSet(requestId)
    this.tabStates.logLastMonetizationCommand(frame, 'stop', requestId)
    this.sendSetMonetizationStateMessage(frame, 'stopped', requestId)
  }

  doStopWebMonetization(frame: FrameSpec) {
    const requestIds = this.assoc.getStreams(frame)

    const closed = this._closeStreams(frame.tabId, frame.frameId)
    // May be noop other side if stop monetization was initiated from
    // ContentScript
    requestIds.forEach(requestId => {
      this.tabStates.logLastMonetizationCommand(frame, 'stop', requestId)
      this.sendSetMonetizationStateMessage(frame, 'stopped', requestId)
    })

    if (closed) {
      this.tabStates.clearFrame(frame)
    }
    this.tabStates.reloadTabState({
      from: 'stopWebMonetization'
    })
    return true
  }

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
