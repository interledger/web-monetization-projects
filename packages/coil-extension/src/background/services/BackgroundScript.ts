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
  ClosePopup,
  ContentScriptInit,
  MonetizationProgress,
  MonetizationStart,
  PauseWebMonetization,
  ResumeWebMonetization,
  SetMonetizationState,
  SetStreamControls,
  StartWebMonetization,
  ToBackgroundMessage
} from '../../types/commands'
import { LocalStorageProxy } from '../../types/storage'
import { TabState } from '../../types/TabState'
import { getTab } from '../../util/tabs'

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
  tabsToFrameToStreams: {
    [tab: number]: Record<
      // frameId
      number,
      // requestId
      string
    >
  } = {}

  streamsToTabAndFrame: {
    [stream: string]: [
      // tabId
      number,
      // frameId
      number
    ]
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
    this.setTabsOnUpdatedListener()
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

  private setTabsOnUpdatedListener() {
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
          data: { from, url }
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
      const [tab, frameId] = this.streamsToTabAndFrame[details.requestId]
      if (details.packetNumber === 0) {
        const message: MonetizationStart = {
          command: 'monetizationStart',
          data: {
            paymentPointer: details.paymentPointer,
            requestId: details.requestId
          }
        }
        this.api.tabs.sendMessage(tab, message, { frameId })
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
      this.handleMonetizedSite(tab, frameId, details.initiatingUrl, details)
      this.api.tabs.sendMessage(tab, message, { frameId })
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
        const hasStream = Object.values(tabState.frameStates).find(
          f => f.monetized
        )
        const hasBeenPaid =
          hasStream &&
          Object.values(tabState.frameStates).find(f => f.total > 0)

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

  setTabMonetized(
    tab: number,
    frameId: number,
    senderUrl: string,
    total?: number
  ) {
    const tabState = this.tabStates.get(tab)

    this.tabStates.setFrame(tab, frameId, {
      monetized: true,
      total: total || (tabState.frameStates[frameId]?.total ?? 0)
    })

    if (this.activeTab === tab) {
      this.reloadTabState()
    }

    // Channel image is provided if site is adapted
    if (this.storage.getBoolean('adapted')) {
      // Load favicon from this.runTime

      const { host } = new URL(senderUrl)
      this.favIcons
        .getFavicon(host)
        .then(favicon => {
          this.tabStates.set(tab, { favicon })
        })
        .catch(e => {
          console.error('failed to fetch favicon. e=' + e.stack)
        })
    }
  }

  mayMonetizeSite(sender: MessageSender) {
    if (!sender.tab) return
    this.setTabMonetized(
      notNullOrUndef(sender.tab.id),
      notNullOrUndef(sender.frameId),
      notNullOrUndef(sender.tab.url)
    )
    return true
  }

  handleMonetizedSite(
    tab: number,
    frameId: number,
    url: string,
    packet: { sentAmount: string }
  ) {
    const tabState = this.tabStates.get(tab)
    const tabTotal = tabState?.frameStates[frameId]?.total ?? 0
    const newTabTotal = tabTotal + Number(packet?.sentAmount ?? 0)
    this.setTabMonetized(tab, frameId, url, newTabTotal)
  }

  adaptedSite(data: AdaptedSite['data'], sender: MessageSender) {
    const tabId = getTab(sender)
    const frameId = notNullOrUndef(sender.frameId)
    if (frameId === 0 && data.channelImage) {
      this.tabStates.set(this.activeTab, {
        favicon: data.channelImage
      })
    }
    this.tabStates.setFrame(tabId, frameId, {
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
    state && state.coilSite
      ? this.storage.set('coilSite', state.coilSite)
      : this.storage.remove('coilSite')
    // TODO: Another valid case might be a singular adapted iframe inside a non
    // monetized top page.
    this.storage.set('adapted', Boolean(state?.frameStates[0]?.adapted))
    state && Object.values(state.frameStates).find(f => f.monetized)
      ? this.storage.set('monetized', true)
      : this.storage.remove('monetized')

    if (state && state.playState && state.stickyState) {
      this.store.playState = state.playState
      this.store.stickyState = state.stickyState
    } else if (state) {
      delete this.store.playState
      delete this.store.stickyState
    }

    const total = Object.values(state.frameStates).reduce(
      (acc, val) => acc + val.total,
      0
    )
    this.storage.set('monetizedTotal', (state && total) || 0)
    this.storage.set(
      'monetizedFavicon',
      (state && state.favicon) || '/res/icon-page.svg'
    )
  }

  async startWebMonetization(
    request: StartWebMonetization,
    sender: MessageSender
  ) {
    const tab = getTab(sender)
    const frameId = notNullOrUndef(sender.frameId)
    this.tabStates.logLastMonetizationCommand(tab, frameId, 'start')
    // This used to be sent from content script as a separate message
    this.mayMonetizeSite(sender)

    // This may throw so do after mayMonetizeSite has had a chance to set
    // the page as being monetized (or attempted to be)
    const spspEndpoint = resolvePaymentEndpoint(request.data.paymentPointer)

    const userBeforeReAuth = this.store.user
    let emittedPending = false
    const emitPending = () =>
      this.sendSetMonetizationStateMessage(tab, frameId, 'pending')

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
      this.sendSetMonetizationStateMessage(tab, frameId, 'stopped')
      return false
    }
    if (!this.store.user?.subscription?.active) {
      this.sendSetMonetizationStateMessage(tab, frameId, 'stopped')
      this.log('startWebMonetization cancelled; no active subscription')
      return false
    }

    if (!emittedPending) {
      emitPending()
    }

    const lastCommand = this.tabStates.get(tab).frameStates[frameId]
      .lastMonetization.command
    if (lastCommand !== 'start') {
      this.log('startWebMonetization cancelled via', lastCommand)
      return false
    }

    this.log('starting stream', requestId)
    this.setRequestId(tab, frameId, requestId)
    this.streamsToTabAndFrame[requestId] = [tab, frameId]
    this.streams.beginStream(requestId, {
      token,
      spspEndpoint,
      ...request.data,
      initiatingUrl: request.data.initiatingUrl
    })

    return true
  }

  private doPauseWebMonetization(tab: number, frameId: number) {
    this.tabStates.logLastMonetizationCommand(tab, frameId, 'pause')
    const id = this.getRequestId(tab, frameId)
    if (id) {
      this.log('pausing stream', id)
      this.streams.pauseStream(id)
      this.sendSetMonetizationStateMessage(tab, frameId, 'stopped')
    }
    return true
  }

  private getRequestId(tab: number, frameId: number) {
    return this.tabsToFrameToStreams[tab]
      ? this.tabsToFrameToStreams[tab][frameId]
      : undefined
  }

  private setRequestId(tab: number, frameId: number, requestId: string) {
    const ensured = (this.tabsToFrameToStreams[tab] =
      this.tabsToFrameToStreams[tab] ?? {})
    ensured[frameId] = requestId
  }

  private doResumeWebMonetization(tab: number, frameId: number) {
    this.tabStates.logLastMonetizationCommand(tab, frameId, 'resume')

    const id = this.getRequestId(tab, frameId)
    if (id) {
      this.log('resuming stream', id)
      this.sendSetMonetizationStateMessage(tab, frameId, 'pending')
      this.streams.resumeStream(id)
    }
    return true
  }

  // TODO: this won't handle iframes
  pauseWebMonetization(request: PauseWebMonetization, sender: MessageSender) {
    if (this.tabStates.get(getTab(sender)).stickyState === 'sticky') {
      return
    }
    return this.doPauseWebMonetization(
      getTab(sender),
      notNullOrUndef(sender.frameId)
    )
  }

  resumeWebMonetization(request: ResumeWebMonetization, sender: MessageSender) {
    if (this.tabStates.get(getTab(sender)).playState === 'paused') {
      return
    }
    return this.doResumeWebMonetization(
      getTab(sender),
      notNullOrUndef(sender.frameId)
    )
  }

  private handleStreamsAbortEvent() {
    this.streams.on('abort', requestId => {
      this.log('aborting monetization request', requestId)
      const tabAndFrame = this.streamsToTabAndFrame[requestId]
      if (tabAndFrame) {
        this.doStopWebMonetization(...tabAndFrame)
      }
    })
  }

  stopWebMonetization(sender: MessageSender) {
    const tab = getTab(sender)
    return this.doStopWebMonetization(tab, notNullOrUndef(sender.frameId))
  }

  private doStopWebMonetization(tab: number, frameId: number) {
    this.tabStates.logLastMonetizationCommand(tab, frameId, 'stop')
    const closed = this._closeStreams(tab, frameId)
    // May be noop other side if stop monetization was initiated from
    // ContentScript
    const requestId = this.getRequestId(tab, frameId)
    this.sendSetMonetizationStateMessage(tab, frameId, 'stopped', requestId)
    // clear the tab state, and set things to default
    // no need to send checkAdaptedContent message to check for adapted sites as
    // that will happen automatically on url change (html5 push state also)
    // via the tabs.onUpdated
    if (closed) {
      this.tabStates.clear(tab)
    }
    this.reloadTabState({
      from: 'stopWebMonetization'
    })
    return true
  }

  sendSetMonetizationStateMessage(
    tabId: number,
    frameId: number,
    state: MonetizationState,
    requestId?: string
  ) {
    const message: SetMonetizationState = {
      command: 'setMonetizationState',
      data: {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        requestId: (this.getRequestId(tabId, frameId) ?? requestId)!,
        state
      }
    }
    this.api.tabs.sendMessage(tabId, message, { frameId })
  }

  _closeStreams(tabId: number, frameId?: number) {
    const streamIds = this.tabsToFrameToStreams[tabId]
    let streams = 0
    if (streamIds) {
      Object.entries(streamIds).forEach(([innerFrameId, streamId]) => {
        if (frameId && Number(innerFrameId) !== frameId) {
          return
        }

        this.log('closing stream with id', streamId)
        this.streams.closeStream(streamId)
        delete this.streamsToTabAndFrame[streamId]
        streams++
      })
      if (frameId) {
        delete this.tabsToFrameToStreams[tabId][frameId]
      } else {
        delete this.tabsToFrameToStreams[tabId]
      }
    }
    return !!streams
  }

  async isRateLimited() {
    const token = this.auth.getStoredToken()

    interface ResponseData {
      whoami: {
        usage: {
          resetDate: string
          exceededLimit: boolean
        }
      }
    }

    const response = await this.client.query<ResponseData>({
      query: `query isRateLimited {
      whoami {
        usage {
          resetDate
          exceededLimit
        }
      }
    }`,
      token
    })

    const usage = response.data.whoami.usage
    return {
      limitExceeded: usage.exceededLimit,
      limitRefreshDate: usage.resetDate
    }
  }

  private logout(_: MessageSender) {
    for (const tabId of this.tabStates.tabKeys()) {
      // Make a copy as _closeStreams mutates and we want to actually close
      // the streams before we set the state to stopped.
      const requestIds = { ...this.tabsToFrameToStreams[tabId] }
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
    const tab = this.activeTab
    const frameId = notNullOrUndef(_.frameId)

    this.tabStates.set(tab, {
      stickyState: request.data.sticky,
      playState: request.data.play
    })
    if (request.data.action === 'togglePlayOrPause') {
      if (request.data.play === 'paused') {
        // TODO: pause ALL tab streams
        this.doPauseWebMonetization(tab, frameId)
      } else if (request.data.play === 'playing') {
        // TODO: resume ALL tab streams
        this.doResumeWebMonetization(tab, frameId)
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
    if (frameId === 0) {
      // TODO: clear only the FrameState for the given tabId/frameId
      this.tabStates.clear(tabId)
      this.reloadTabState({
        from: 'onTabsUpdated status === contentScriptInit'
      })
    }
    return true
  }
}
