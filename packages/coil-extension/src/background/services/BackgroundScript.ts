import MessageSender = chrome.runtime.MessageSender
import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { MonetizationState } from '@web-monetization/types'
import { resolvePaymentEndpoint } from '@web-monetization/polyfill-utils'

import { notNullOrUndef } from '../../util/nullables'
import { StorageService } from '../../services/storage'
import * as tokens from '../../types/tokens'
import {
  AdaptedSite,
  CheckAdaptedContent,
  CheckIFrameIsAllowedFromBackground,
  ClosePopup,
  ContentScriptInit,
  MonetizationProgress,
  MonetizationStart,
  PauseWebMonetization,
  ReportCorrelationIdFromIFrameContentScript,
  ReportCorrelationIdToParentContentScript,
  ResumeWebMonetization,
  SetMonetizationState,
  SetStreamControls,
  StartWebMonetization,
  ToBackgroundMessage
} from '../../types/commands'
import { LocalStorageProxy } from '../../types/storage'
import { TabState } from '../../types/TabState'
import { getFrameSpec, getTab } from '../../util/tabs'
import { FrameSpec } from '../../types/FrameSpec'
import { timeout } from '../../content/util/timeout'

import { StreamMoneyEvent } from './Stream'
import { AuthService } from './AuthService'
import { TabStates } from './TabStates'
import { Streams } from './Streams'
import { Favicons } from './Favicons'
import { PopupBrowserAction } from './PopupBrowserAction'
import { Logger, logger } from './utils'
import { YoutubeService } from './YoutubeService'
import { BackgroundFramesService } from './BackgroundFramesService'

@injectable()
export class BackgroundScript {
  // TODO: extract these two variables into some kind of service
  tabsToFramesToStreams: {
    [tab: number]: Record<
      // frameId
      number,
      // streamId
      string
    >
  } = {}

  streamsToFrames: {
    [stream: string]: FrameSpec
  } = {}

  constructor(
    private popup: PopupBrowserAction,
    private favIcons: Favicons,
    private streams: Streams,
    private tabStates: TabStates,
    private storage: StorageService,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private auth: AuthService,
    private youtube: YoutubeService,
    private framesService: BackgroundFramesService,

    @logger('BackgroundScript')
    private log: Logger,

    private client: GraphQlClient,
    @inject(tokens.WextApi)
    private api: typeof window.chrome,
    @inject(tokens.CoilDomain)
    private coilDomain: string
  ) {}

  get activeTab() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.tabStates.activeTab!
  }

  /**
   * See {@link setTabsOnActivatedListener}
   * See {@link setWindowsOnFocusedListener}
   * See {@link initializeActiveTab}
   */
  set activeTab(value: number) {
    this.tabStates.activeTab = value
  }

  async run() {
    this.initializeActiveTab()
    this.setRuntimeMessageListener()
    this.setTabsOnActivatedListener()
    this.setWindowsOnFocusedListener()
    this.setTabsOnRemovedListener()
    this.setFramesOnChangedListener()
    this.setFramesOnRemovedListener()
    this.routeStreamsMoneyEventsToContentScript()
    this.handleStreamsAbortEvent()
    this.framesService.monitor()
    void this.auth.getTokenMaybeRefreshAndStoreState()
  }

  private setTabsOnActivatedListener() {
    // The active tab has been changed
    this.api.tabs.onActivated.addListener(activeInfo => {
      this.activeTab = activeInfo.tabId
      this.reloadTabState({ from: 'onActivated' })
    })
  }

  private setWindowsOnFocusedListener() {
    if (this.api.windows) {
      // The active window (and therefore active tab) has changed
      this.api.windows.onFocusChanged.addListener(windowId => {
        // We've focused a special window, e.g. inspector
        if (windowId < 0) return

        // Close the popup when window has changed
        const message: ClosePopup = {
          command: 'closePopup'
        }
        this.api.runtime.sendMessage(message, () => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const ignored = this.api.runtime.lastError
        })

        this.api.tabs.query({ active: true, currentWindow: true }, tabs => {
          if (tabs.length === 0 || tabs[0].id == null) return
          this.activeTab = tabs[0].id
          this.reloadTabState({ from: 'onFocusChanged' })
        })
      })
    }
  }

  private setRuntimeMessageListener() {
    // A tab wants to change its state
    this.api.runtime.onMessage.addListener((request, sender, sendResponse) => {
      const serialized = JSON.stringify(request)
      const redacted = serialized.replace(/"token":\s*".*"/, '<redacted>')
      this.log('received message. request=', redacted)

      void this.handleMessage(request, sender, sendResponse)

      // important: this tells chrome to expect an async response.
      // if `true` is not returned here then async messages don't make it back
      // see: https://developer.chrome.com/apps/runtime#event-onMessage
      return true
    })
  }

  private initializeActiveTab() {
    // initialize tab so we can set its state right away
    this.api.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs.length === 0 || tabs[0].id == null) return
      this.activeTab = tabs[0].id
      this.reloadTabState({ from: 'initial' })
    })
  }

  private setTabsOnRemovedListener() {
    // Remove tab state when the tab is closed to prevent memory leak
    this.api.tabs.onRemoved.addListener(tabId => {
      this.log('removing tab with id', tabId)
      this.tabStates.clear(tabId)

      // clean up the stream of that tab
      this._closeStreams(tabId)
    })
  }

  private setFramesOnRemovedListener() {
    this.framesService.on('frameRemoved', event => {
      this.tabStates.clearFrame(event)
      this._closeStreams(event.tabId, event.frameId)
    })
  }

  private setFramesOnChangedListener() {
    // Reset tab state and recheck adapted content when tab changes location
    this.framesService.on('frameChanged', event => {
      if (!(event.frame.top || event.frame.parentFrameId === 0)) {
        return
      }

      const { tabId } = event
      const status = event.changed.state
      const isComplete = event.frame.state === 'complete'
      const becameComplete = status === 'complete'
      const changedUrl = Boolean(event.changed.href)

      // Always get the url from the tab
      const url = event.frame.href
      if (status === 'loading') {
        this.setCoilUrlForPopupIfNeeded(tabId, url)
      }

      if (becameComplete || (isComplete && changedUrl)) {
        this.setCoilUrlForPopupIfNeeded(tabId, url)
        const from = `onFrameChanged directly, event=${JSON.stringify(event)}, `
        const message: CheckAdaptedContent = {
          command: 'checkAdaptedContent',
          data: { from }
        }
        this.log('sending checkAdaptedContent message', message)
        this.api.tabs.sendMessage(
          tabId,
          message,
          { frameId: event.frameId },
          () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const ignored = this.api.runtime.lastError
          }
        )
      }
    })
  }

  private routeStreamsMoneyEventsToContentScript() {
    // pass stream monetization events to the correct tab
    this.streams.on('money', (details: StreamMoneyEvent) => {
      const frame = this.streamsToFrames[details.requestId]
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
          sentAmount: details.sentAmount
        }
      }
      this.handleMonetizedSite(frame, details.initiatingUrl, details)
      this.api.tabs.sendMessage(tabId, message, { frameId })
      this.savePacketToHistoryDb(details)
    })
  }

  private savePacketToHistoryDb(_: StreamMoneyEvent) {
    // this.db.incrementSite(details)
  }

  private setBrowserActionStateFromAuthAndTabState() {
    const token = this.auth.getStoredToken()

    if (!token || !this.store.validToken) {
      this.popup.disable()
    }

    const tabId = this.activeTab

    if (tabId) {
      const tabState = this.tabStates.getActiveOrDefault()

      if (Object.values(tabState.frameStates).find(f => f.monetized)) {
        this.tabStates.setIcon(tabId, 'monetized')
      }

      if (token == null) {
        this.tabStates.setIcon(tabId, 'unavailable')
      } else if (token) {
        this.popup.enable()

        const tabState = this.tabStates.getActiveOrDefault()
        const frameStates = Object.values(tabState.frameStates)
        const hasStream = frameStates.find(f => f.monetized)
        const hasBeenPaid = hasStream && frameStates.find(f => f.total > 0)

        if (hasStream) {
          this.tabStates.setIcon(tabId, 'monetized')
          if (hasBeenPaid) {
            const state =
              tabState.playState === 'playing'
                ? 'streaming'
                : 'streaming-paused'
            this.tabStates.setIcon(tabId, state)
          }
        } else {
          this.tabStates.setIcon(tabId, 'inactive')
        }
      }
    }
  }

  async handleMessage(
    request: ToBackgroundMessage,
    sender: MessageSender,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sendResponse: (response: any) => any
  ) {
    switch (request.command) {
      case 'log':
        this.log('log command:', request.data)
        sendResponse(true)
        break
      case 'logout':
        sendResponse(this.logout(sender))
        break
      case 'adaptedSite':
        this.adaptedSite(request.data, sender)
        sendResponse(true)
        break
      case 'injectToken':
        sendResponse(
          await this.injectToken(request.data.token, notNullOrUndef(sender.url))
        )
        break
      case 'startWebMonetization':
        this.log('got startwebmonetization')
        sendResponse(await this.startWebMonetization(request, sender))
        break
      case 'pauseWebMonetization':
        sendResponse(this.pauseWebMonetization(request, sender))
        break
      case 'resumeWebMonetization':
        sendResponse(this.resumeWebMonetization(request, sender))
        break
      case 'stopWebMonetization':
        sendResponse(this.stopWebMonetization(sender))
        break
      case 'isRateLimited':
        sendResponse(await this.isRateLimited())
        break
      case 'setStreamControls':
        sendResponse(this.setStreamControls(request, sender))
        break
      case 'contentScriptInit':
        sendResponse(this.contentScriptInit(request, sender))
        break
      case 'fetchYoutubeChannelId':
        sendResponse(await this.youtube.fetchChannelId(request.data.youtubeUrl))
        break
      case 'sendTip':
        sendResponse(await this.sendTip())
        break
      case 'checkIFrameIsAllowedFromIFrameContentScript':
        sendResponse(
          await this.checkIFrameIsAllowedFromIFrameContentScript(sender)
        )
        break
      case 'reportCorrelationIdFromIFrameContentScript':
        sendResponse(
          await this.reportCorrelationIdFromIFrameContentScript(request, sender)
        )
        break
      default:
        sendResponse(false)
        break
    }
  }

  setCoilUrlForPopupIfNeeded(tab: number, url: string | undefined) {
    this.log('setting coil url for popup', url)
    if (url && !url.startsWith(this.coilDomain)) {
      url = undefined
    }
    this.tabStates.set(tab, {
      coilSite: url
    })
    if (url) {
      this.reloadTabState({ from: 'setCoilUrlForPopupIfNeeded' })
    }
  }

  async injectToken(siteToken: string | null, url: string) {
    const { origin } = new URL(url)
    if (origin !== this.coilDomain) {
      return null
    }
    // When logged out siteToken will be an empty string so normalize it to
    // null
    this.auth.syncSiteToken(siteToken || null)
    return this.auth.getTokenMaybeRefreshAndStoreState()
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
      this.reloadTabState()
    }

    // TODO: this doesn't actually seem to be used anywhere
    // Channel image is provided if top frame is adapted
    if (tabState.frameStates[0].adapted) {
      const { host } = new URL(senderUrl)
      this.favIcons
        .getFavicon(host)
        .then(favicon => {
          this.tabStates.set(tabId, { favicon })
        })
        .catch(e => {
          console.error(`failed to fetch favicon. e=${e.stack}`)
        })
    }
  }

  mayMonetizeSite(sender: MessageSender) {
    if (!sender.tab) return
    this.setFrameMonetized(getFrameSpec(sender), notNullOrUndef(sender.tab.url))
    return true
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

  adaptedSite(data: AdaptedSite['data'], sender: MessageSender) {
    const { frameId, spec } = getFrameSpec(sender)
    if (frameId === 0 && data.channelImage) {
      this.tabStates.set(this.activeTab, {
        favicon: data.channelImage
      })
    }
    this.tabStates.setFrame(spec, {
      adapted: data.state
    })
  }

  reloadTabState(opts: { from?: string } = {}) {
    const { from } = opts

    const tab = this.activeTab
    const state = () => this.tabStates.get(tab)
    this.setLocalStorageFromState(state())
    this.setBrowserActionStateFromAuthAndTabState()
    // Don't work off stale state, set(...) creates a copy ...
    this.popup.setBrowserAction(tab, state())
    if (from) {
      this.log(
        `reloadTabState tab=${tab}`,
        `from=${from}`,
        JSON.stringify(state(), null, 2)
      )
    }
  }

  private setLocalStorageFromState(state: TabState) {
    const frameStates = Object.values(state.frameStates)

    state && state.coilSite
      ? this.storage.set('coilSite', state.coilSite)
      : this.storage.remove('coilSite')
    // TODO: Another valid case might be a singular adapted iframe inside a non
    // monetized top page.
    this.storage.set('adapted', Boolean(state?.frameStates[0]?.adapted))
    state && frameStates.find(f => f.monetized)
      ? this.storage.set('monetized', true)
      : this.storage.remove('monetized')

    if (state && state.playState && state.stickyState) {
      this.store.playState = state.playState
      this.store.stickyState = state.stickyState
    } else if (state) {
      delete this.store.playState
      delete this.store.stickyState
    }

    if (state) {
      const total = frameStates.reduce((acc, val) => acc + val.total, 0)
      this.storage.set('monetizedTotal', total)
    }
    this.storage.set(
      'monetizedFavicon',
      (state && state.favicon) || '/res/icon-page.svg'
    )
  }

  async checkIFrameIsAllowedFromIFrameContentScript(sender: MessageSender) {
    const frame = getFrameSpec(sender)
    const { tabId, frameId } = frame

    if (frameId !== 0) {
      // Handle race between monetization tag driven frame checking and
      // framesService frame info.
      // TODO: ?
      let iterations = 5
      while (!this.framesService.getFrame(frame)) {
        await timeout(50)
        if (--iterations === 0) {
          throw new Error()
        }
      }

      const parentId = this.framesService.getFrame(frame)?.parentFrameId
      if (typeof parentId === 'undefined') {
        throw new Error(
          `expecting ${JSON.stringify(frame)} to have parentFrameId`
        )
      }
      const allowed = new Promise<boolean>((resolve, reject) => {
        const message: CheckIFrameIsAllowedFromBackground = {
          command: 'checkIFrameIsAllowedFromBackground',
          data: {
            frame
          }
        }
        this.api.tabs.sendMessage(
          tabId,
          message,
          { frameId: parentId },
          (result: boolean) => {
            if (this.api.runtime.lastError) {
              reject(this.api.runtime.lastError)
            } else {
              resolve(result)
            }
          }
        )
      })
      return await allowed
    } else {
      throw new Error(`sender must be non top frame`)
    }
  }

  async reportCorrelationIdFromIFrameContentScript(
    request: ReportCorrelationIdFromIFrameContentScript,
    sender: MessageSender
  ) {
    const frame = getFrameSpec(sender)
    const parentId = this.framesService.getFrame(frame)?.parentFrameId
    if (typeof parentId === 'undefined') {
      throw new Error(`expecting ${frame} to have parentFrameId`)
    }
    const message: ReportCorrelationIdToParentContentScript = {
      command: 'reportCorrelationIdToParentContentScript',
      data: {
        frame,
        correlationId: request.data.correlationId
      }
    }
    this.api.tabs.sendMessage(frame.tabId, message, { frameId: parentId })
  }

  async startWebMonetization(
    request: StartWebMonetization,
    sender: MessageSender
  ) {
    const frame = getFrameSpec(sender)
    const { tabId, frameId } = frame

    this.tabStates.logLastMonetizationCommand(frame, 'start')
    // This used to be sent from content script as a separate message
    this.mayMonetizeSite(sender)

    // This may throw so do after mayMonetizeSite has had a chance to set
    // the page as being monetized (or attempted to be)
    const spspEndpoint = resolvePaymentEndpoint(request.data.paymentPointer)

    const userBeforeReAuth = this.store.user
    let emittedPending = false
    const emitPending = () =>
      this.sendSetMonetizationStateMessage(frame, 'pending')

    // If we are optimistic we have an active subscription (things could have
    // changed since our last cached whoami query), emit pending immediately,
    // otherwise wait until recheck auth/whoami, potentially not even emitting.
    if (userBeforeReAuth?.subscription?.active) {
      emittedPending = true
      emitPending()
    }

    this.log('startWebMonetization, request', request)
    const { requestId } = request.data

    this.log('loading token for monetization', requestId)
    const token = await this.auth.getTokenMaybeRefreshAndStoreState()
    if (!token) {
      // not signed in.
      console.warn('startWebMonetization cancelled; no token')
      this.sendSetMonetizationStateMessage(frame, 'stopped')
      return false
    }
    if (!this.store.user?.subscription?.active) {
      this.sendSetMonetizationStateMessage(frame, 'stopped')
      this.log('startWebMonetization cancelled; no active subscription')
      return false
    }

    if (!emittedPending) {
      emitPending()
    }

    const lastCommand = this.tabStates.get(tabId).frameStates[frameId]
      .lastMonetization.command
    if (lastCommand !== 'start') {
      this.log('startWebMonetization cancelled via', lastCommand)
      return false
    }

    this.log('starting stream', requestId)
    this.setRequestId(frame, requestId)
    this.streamsToFrames[requestId] = { tabId, frameId }
    this.streams.beginStream(requestId, {
      token,
      spspEndpoint,
      ...request.data,
      initiatingUrl: request.data.initiatingUrl
    })

    return true
  }

  private async sendTip() {
    const tab = this.activeTab
    // TODO
    const stream = this.streams.getStream('')
    const token = this.auth.getStoredToken()

    // TODO: return detailed errors
    if (!stream || !token) {
      this.log(
        'sendTip: no stream | token. !!stream !!token ',
        !!stream,
        !!token
      )
      return { success: false }
    }

    const receiver = stream.getPaymentPointer()

    try {
      this.log(`sendTip: sending tip to ${receiver}`)
      const result = await this.client.query({
        query: `
          mutation sendTip($receiver: String!) {
            sendTip(receiver: $receiver) {
              success
            }
          }
        `,
        token,
        variables: {
          receiver
        }
      })
      this.log(`sendTip: sent tip to ${receiver}`, result)
      return { success: true }
    } catch (e) {
      this.log(`sendTip: error. msg=${e.message}`)
      return { success: false }
    }
  }

  private doPauseWebMonetization(frame: FrameSpec) {
    this.tabStates.logLastMonetizationCommand(frame, 'pause')
    const id = this.getRequestId(frame)
    if (id) {
      this.log('pausing stream', id)
      this.streams.pauseStream(id)
      this.sendSetMonetizationStateMessage(frame, 'stopped')
    }
    return true
  }

  private getRequestId({ tabId, frameId }: FrameSpec) {
    return this.tabsToFramesToStreams[tabId]
      ? this.tabsToFramesToStreams[tabId][frameId]
      : undefined
  }

  private setRequestId({ tabId, frameId }: FrameSpec, requestId: string) {
    const ensured = (this.tabsToFramesToStreams[tabId] =
      this.tabsToFramesToStreams[tabId] ?? {})
    ensured[frameId] = requestId
  }

  private doResumeWebMonetization(frame: FrameSpec) {
    this.tabStates.logLastMonetizationCommand(frame, 'resume')

    const id = this.getRequestId(frame)
    if (id) {
      this.log('resuming stream', id)
      this.sendSetMonetizationStateMessage(frame, 'pending')
      this.streams.resumeStream(id)
    }
    return true
  }

  pauseWebMonetization(request: PauseWebMonetization, sender: MessageSender) {
    if (this.tabStates.get(getTab(sender)).stickyState === 'sticky') {
      return
    }
    return this.doPauseWebMonetization(getFrameSpec(sender))
  }

  resumeWebMonetization(request: ResumeWebMonetization, sender: MessageSender) {
    if (this.tabStates.get(getTab(sender)).playState === 'paused') {
      return
    }
    return this.doResumeWebMonetization(getFrameSpec(sender))
  }

  private handleStreamsAbortEvent() {
    this.streams.on('abort', requestId => {
      this.log('aborting monetization request', requestId)
      const frame = this.streamsToFrames[requestId]
      if (frame) {
        this.doStopWebMonetization(frame)
      }
    })
  }

  stopWebMonetization(sender: MessageSender) {
    return this.doStopWebMonetization(getFrameSpec(sender))
  }

  private doStopWebMonetization(frame: FrameSpec) {
    this.tabStates.logLastMonetizationCommand(frame, 'stop')
    const closed = this._closeStreams(frame.tabId, frame.frameId)
    // May be noop other side if stop monetization was initiated from
    // ContentScript
    const requestId = this.getRequestId(frame)
    this.sendSetMonetizationStateMessage(frame, 'stopped', requestId)
    if (closed) {
      this.tabStates.clearFrame(frame)
    }
    this.reloadTabState({
      from: 'stopWebMonetization'
    })
    return true
  }

  sendSetMonetizationStateMessage(
    { tabId, frameId }: FrameSpec,
    state: MonetizationState,
    requestId?: string
  ) {
    const message: SetMonetizationState = {
      command: 'setMonetizationState',
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        requestId: (this.getRequestId({ tabId, frameId }) ?? requestId)!,
        state
      }
    }
    this.api.tabs.sendMessage(tabId, message, { frameId })
  }

  _closeStreams(tabId: number, frameId?: number) {
    const streamIds = this.tabsToFramesToStreams[tabId]
    const haveFrameId = typeof frameId !== 'undefined'

    let closed = 0
    if (streamIds) {
      Object.entries(streamIds).forEach(([innerFrameId, streamId]) => {
        if (haveFrameId && Number(innerFrameId) !== frameId) {
          return
        }

        this.log('closing stream with id', streamId)
        this.streams.closeStream(streamId)
        delete this.streamsToFrames[streamId]
        closed++
      })
      if (haveFrameId) {
        delete this.tabsToFramesToStreams[tabId][frameId as number]
      } else {
        delete this.tabsToFramesToStreams[tabId]
      }
    }
    return !!closed
  }

  // This feature is no longer used
  async isRateLimited() {
    return {
      limitExceeded: false
    }
  }

  private logout(_: MessageSender) {
    for (const tabId of this.tabStates.tabKeys()) {
      // Make a copy as _closeStreams mutates and we want to actually close
      // the streams before we set the state to stopped.
      const requestIds = { ...this.tabsToFramesToStreams[tabId] }
      this._closeStreams(tabId)
      this.tabStates.clear(tabId)
      Object.entries(requestIds).forEach(([frameId, requestId]) => {
        // TODO: this is hacky, but should do the trick for now
        const message: SetMonetizationState = {
          command: 'setMonetizationState',
          data: { state: 'stopped', requestId }
        }
        this.api.tabs.sendMessage(tabId, message, { frameId: Number(frameId) })
      })
    }
    // Clear the token and any other state the popup relies upon
    // reloadTabState will reset them below.
    this.storage.clear()
    this.tabStates.setIcon(this.activeTab, 'unavailable')
    this.reloadTabState()
    return true
  }

  private setStreamControls(request: SetStreamControls, _: MessageSender) {
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
    this.reloadTabState({ from: request.command })
    return true
  }

  private contentScriptInit(request: ContentScriptInit, sender: MessageSender) {
    const tabId = getTab(sender)
    const frameId = notNullOrUndef(sender.frameId)
    // Content script used to send a stopWebMonetization message every time
    // it loaded. Noop if no stream for tab.
    this._closeStreams(tabId, frameId)
    this.tabStates.clearFrame({ tabId: tabId, frameId: frameId })
    this.reloadTabState({
      from: 'onTabsUpdated status === contentScriptInit'
    })
    return true
  }
}
