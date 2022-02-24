import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'
import { MonetizationState } from '@webmonetization/types'
import { resolvePaymentEndpoint } from '@webmonetization/polyfill-utils'

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
  OnFrameAllowedChanged,
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
import { BuildConfig } from '../../types/BuildConfig'
import { User } from '../../types/user'

import { StreamMoneyEvent } from './Stream'
import { AuthService } from './AuthService'
import { TabStates } from './TabStates'
import { Streams } from './Streams'
import { PopupBrowserAction } from './PopupBrowserAction'
import { Logger, logger } from './utils'
import { YoutubeService } from './YoutubeService'
import { BackgroundFramesService } from './BackgroundFramesService'
import { TippingService } from './TippingService'
import { StreamAssociations } from './StreamAssociations'
import { ActiveTabLogger } from './ActiveTabLogger'

import MessageSender = chrome.runtime.MessageSender

@injectable()
export class BackgroundScript {
  constructor(
    private popup: PopupBrowserAction,
    private assoc: StreamAssociations,
    private streams: Streams,
    private tabStates: TabStates,
    private storage: StorageService,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private auth: AuthService,
    private tippingService: TippingService,
    private youtube: YoutubeService,
    private activeTabLogger: ActiveTabLogger,
    private framesService: BackgroundFramesService,
    @inject(tokens.LoggingEnabled)
    private loggingEnabled: boolean,
    @logger('BackgroundScript')
    private log: Logger,
    private client: GraphQlClient,
    @inject(tokens.CoilDomain)
    private coilDomain: string,
    @inject(tokens.BuildConfig)
    private buildConfig: BuildConfig,
    @inject(tokens.WextApi)
    private api = chrome
  ) {
    if (this.loggingEnabled) {
      console.log('BuildConfig', this.buildConfig)
    }
  }

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
    this.popup.setDefaultInactive()
    this.framesService.monitor()
    this.bindOnInstalled()
    void (await this.initAuth())
  }

  private async initAuth() {
    this.auth.checkForSiteLogoutAssumeFalseOnTimeout().then(loggedOut => {
      if (loggedOut) {
        this.logout()
      } else {
        void this.auth.getTokenMaybeRefreshAndStoreState()
      }
    })
    this.auth.queueTokenRefreshCheck()
  }

  private setTabsOnActivatedListener() {
    // The active tab has been changed
    this.api.tabs.onActivated.addListener(activeInfo => {
      if (this.buildConfig.logTabsApiEvents) {
        this.log('tabs.onActivated %o', activeInfo)
      }
      this.activeTab = activeInfo.tabId
      this.reloadTabState({ from: 'onActivated' })
    })
    if (this.buildConfig.logTabsApiEvents) {
      if (this.api.tabs.onActiveChanged) {
        this.api.tabs.onActiveChanged.addListener((tabId, selectInfo) => {
          this.log('tabs.onActiveChanged %d %o', tabId, selectInfo)
        })
      }
      if (this.api.tabs.onSelectionChanged) {
        this.api.tabs.onSelectionChanged.addListener((tabId, selectInfo) => {
          this.log('tabs.onSelectionChanged %d %o', tabId, selectInfo)
        })
      }
      this.api.tabs.onCreated.addListener(activeInfo => {
        this.log('tabs.onCreated %o', activeInfo)
      })
    }
  }

  private setWindowsOnFocusedListener() {
    if (this.api.windows) {
      // The active window (and therefore active tab) has changed
      this.api.windows.onFocusChanged.addListener(windowId => {
        // We've focused a special window, e.g. inspector
        if (windowId < 0) return

        // Close the popup when window has changed
        const close: ClosePopup = {
          command: 'closePopup'
        }
        // Storage events are only fired if the value actually changes, not
        // on every localStorage `setItem` call. So we set the first 16
        // characters of the stored value to the current time.
        this.storage.setRaw(
          '$$popupCommand',
          Date.now().toString().padStart(16, '0') + JSON.stringify(close)
        )
        this.api.tabs.query({ active: true, currentWindow: true }, tabs => {
          if (this.api.runtime.lastError) {
            // In this case we clicked on a non-active tab as the focusing
            // action, and the tabs.onActivated event will fire, taking care of
            // setting the active tab and reloading the tab state.
            // See #2001
            return
          }
          if (tabs.length === 0 || tabs[0].id == null) {
            return
          }
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

    if (this.buildConfig.logTabsApiEvents) {
      this.api.tabs.onReplaced.addListener((added, removed) => {
        this.log(
          'tabs.onReplaced.: replaced tab with id' +
            JSON.stringify({ added, removed })
        )
      })
      this.api.tabs.onAttached.addListener((tabId, attachInfo) => {
        this.log(
          'tabs.onAttached: onAttached' + JSON.stringify({ tabId, attachInfo })
        )
      })
      this.api.tabs.onDetached.addListener((tabId, detachInfo) => {
        this.log(
          'tabs.onDetached: replaced tab with id' +
            JSON.stringify({ tabId, detachInfo })
        )
      })
    }
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
      if (status === 'loading' && event.frame.top) {
        this.setCoilUrlForPopupIfNeeded(tabId, url)
      }

      if (becameComplete || (isComplete && changedUrl)) {
        if (event.frame.top) {
          this.setCoilUrlForPopupIfNeeded(tabId, url)
          const from = `onFrameChanged directly, event=${JSON.stringify(
            event
          )}, `
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
      }
    })
  }

  private routeStreamsMoneyEventsToContentScript() {
    // pass stream monetization events to the correct tab
    this.streams.on('money', (details: StreamMoneyEvent) => {
      const frame = this.assoc.getFrame(details.requestId)
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
      this.api.tabs.sendMessage(tabId, message, { frameId })
      this.savePacketToHistoryDb(details)
    })
  }

  private savePacketToHistoryDb(_: StreamMoneyEvent) {
    // this.db.incrementSite(details)
  }

  async adaptedPageDetails(variables: { url: string; channelId?: string }) {
    return this.client.adaptedPage(variables.url, variables.channelId)
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
          } else {
            // Need to check if the user is able to tip with the new ui.
            // This assumes that the site is monetized and
            // that the user meets certain criteria
            if (this.tippingService.userCanTip()) {
              this.tabStates.setIcon(tabId, 'tipping')
            }
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
        sendResponse(this.logout())
        break
      case 'adaptedSite':
        this.adaptedSite(request.data, sender)
        sendResponse(true)
        break
      case 'injectToken':
        sendResponse(
          await this.injectToken(
            request.data.token,
            notNullOrUndef(sender.url),
            notNullOrUndef(sender.tab)
          )
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
      case 'tipPreview':
        sendResponse(await this.tipPreview(request.data.amount))
        break
      case 'tip':
        sendResponse(await this.tip(request.data.amount))
        break
      case 'updateTippingSettings':
        sendResponse(await this.updateTippingSettings())
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
      case 'onFrameAllowedChanged':
        sendResponse(await this.onFrameAllowedChanged(request, sender))
        break
      case 'adaptedPageDetails':
        sendResponse(await this.adaptedPageDetails(request.data))
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

  async injectToken(
    siteToken: string | null,
    url: string,
    tab: chrome.tabs.Tab
  ) {
    const { origin } = new URL(url)
    if (origin !== this.coilDomain) {
      return null
    }

    // When logged out siteToken will be an empty string so normalize it to
    // null
    const newest = this.auth.syncSiteToken(siteToken || null)
    this.activeTabLogger.log(`injectToken: ${Date.now()}`)
    void this.auth.getTokenMaybeRefreshAndStoreState()
    return newest
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
  }

  mayMonetizeSite(sender: chrome.runtime.MessageSender, initiatingUrl: string) {
    this.setFrameMonetized(getFrameSpec(sender), initiatingUrl)
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
    const { spec } = getFrameSpec(sender)
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

    if (this.buildConfig.extensionBuildString) {
      this.store.extensionBuildString = this.buildConfig.extensionBuildString
    }
    if (this.buildConfig.extensionPopupFooterString) {
      this.store.extensionPopupFooterString =
        this.buildConfig.extensionPopupFooterString
    }

    if (state) {
      const total = frameStates.reduce((acc, val) => acc + val.total, 0)
      this.storage.set('monetizedTotal', total)
    }
  }

  async checkIFrameIsAllowedFromIFrameContentScript(sender: MessageSender) {
    let frame = getFrameSpec(sender) as FrameSpec
    const { tabId, frameId } = frame

    if (frameId !== 0) {
      let allowed = true
      while (allowed) {
        const frameDetails = await this.framesService.getFrameAsync(frame)
        const parentId = frameDetails?.parentFrameId
        if (typeof parentId === 'undefined') {
          throw new Error(
            `expecting ${JSON.stringify(frame)} to have parentFrameId
            frameDetails=${JSON.stringify(frameDetails)}
            tabFrames=${JSON.stringify(
              this.framesService.getFrames(frame.tabId)
            )}
            `
          )
        }
        allowed = await this.framesService.sendCommand<
          CheckIFrameIsAllowedFromBackground,
          boolean
        >(
          { tabId, frameId: parentId },
          {
            command: 'checkIFrameIsAllowedFromBackground',
            data: {
              frame
            }
          }
        )
        if (parentId === 0) {
          break
        } else {
          frame = { tabId: frame.tabId, frameId: parentId }
        }
      }
      return allowed
    } else {
      throw new Error(`sender must be non top frame`)
    }
  }

  async reportCorrelationIdFromIFrameContentScript(
    request: ReportCorrelationIdFromIFrameContentScript,
    sender: MessageSender
  ) {
    const frame = getFrameSpec(sender)
    const parentId = (await this.framesService.getFrameAsync(frame))
      ?.parentFrameId
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
    const { requestId } = request.data

    this.activeTabLogger.log(`startWM called with ${requestId}`, frame)
    this.tabStates.setFrame(frame, {
      paymentPointer: request.data.paymentPointer
    })
    this.tabStates.logLastMonetizationCommand(frame, 'start', requestId)

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
      this.reloadTabState({ from: `no ${fromNo}` })
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
    if (
      this.tabStates.getFrameOrDefault(frame).lastMonetization.requestId !==
      requestId
    ) {
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

    const lastCommand =
      this.tabStates.getFrameOrDefault(frame).lastMonetization.command
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
    this.assoc.setStreamId(frame, requestId)
    this.assoc.setFrame(requestId, { tabId, frameId })
    this.streams.beginStream(requestId, {
      token,
      spspEndpoint,
      ...request.data,
      initiatingUrl: request.data.initiatingUrl
    })

    if (lastCommand === 'pause') {
      // TODO: why do we need the timeout here ?
      setTimeout(() => {
        this.doPauseWebMonetization(frame, requestId)
      }, 0)
    }
    return true
  }

  /**
   * We can't allow these tip without an active stream because of the way
   * the tip events are using the destination currency.
   */
  async sendTip() {
    const tabId = this.activeTab
    const streamId = this.assoc.getStreamId({ tabId, frameId: 0 })

    if (!streamId) return { success: false }

    try {
      const token = this.auth.getStoredToken()
      if (!token) {
        return { success: false }
      }
      const message = await this.tippingService.sendTip(
        tabId,
        streamId,
        this.streams.getStream(streamId),
        token
      )
      await this.tippingService.updateTipSettings(token)
      this.api.tabs.sendMessage(tabId, message, { frameId: 0 })
      return { success: true }
    } catch (e) {
      this.log(`sendTip: error. msg=${e.message}`)
      return { success: false }
    }
  }

  private async tipPreview(amount: number): Promise<{
    success: boolean
    message?: string
    creditCardCharge?: string
    tipCreditCharge?: string
  }> {
    try {
      const token = this.auth.getStoredToken()
      if (!token) return { success: false, message: 'No token found' }
      return await this.tippingService.tipPreview(amount, token)
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  public async tip(
    tip: number
  ): Promise<{ success: boolean; message: string }> {
    const tabId = this.activeTab
    const frame = { tabId, frameId: 0 }
    const receiver = this.tabStates.getFrameOrDefault(frame).paymentPointer

    if (!receiver)
      return { success: false, message: 'No payment pointer found' }

    try {
      const token = this.auth.getStoredToken()
      if (!token) return { success: false, message: 'No token found' }
      const tipResult = await this.tippingService.tip(
        tip,
        tabId,
        receiver,
        token
      )
      if (tipResult.success) {
        // if succeeded, refresh tip settings
        await this.tippingService.updateTipSettings(token)
      } else {
        return { success: false, message: 'Failed tip' }
      }
      return tipResult
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  public async updateTippingSettings(): Promise<{
    success: boolean
    message: string
  }> {
    const tabId = this.activeTab
    const paymentPointer = this.tabStates.getFrameOrDefault({
      tabId,
      frameId: 0
    }).paymentPointer

    if (!paymentPointer)
      return { success: false, message: 'No paymentPointer found' }

    try {
      const token = this.auth.getStoredToken()
      if (!token) return { success: false, message: 'No token found' }
      return await this.tippingService.updateTipSettings(token)
    } catch (e) {
      return { success: false, message: e.message }
    }
  }

  private doPauseWebMonetization(frame: FrameSpec, requestId?: string) {
    const id = requestId ?? this.assoc.getStreamId(frame)
    if (id) {
      this.tabStates.logLastMonetizationCommand(frame, 'pause', id)
      this.log('pausing stream', id)
      this.streams.pauseStream(id)
      this.sendSetMonetizationStateMessage(frame, 'stopped')
    }
    return true
  }

  private doResumeWebMonetization(frame: FrameSpec, requestId?: string) {
    const id = requestId ?? this.assoc.getStreamId(frame)
    if (id) {
      this.tabStates.logLastMonetizationCommand(frame, 'resume', id)
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
    return this.doPauseWebMonetization(
      getFrameSpec(sender),
      request.data.requestId
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
      request.data.requestId
    )
  }

  private handleStreamsAbortEvent() {
    this.streams.on('abort', requestId => {
      this.log('aborting monetization request', requestId)
      const frame = this.assoc.getFrame(requestId)
      if (frame) {
        this.doStopWebMonetization(frame)
      }
    })
  }

  stopWebMonetization(sender: MessageSender) {
    return this.doStopWebMonetization(getFrameSpec(sender))
  }

  private doStopWebMonetization(frame: FrameSpec) {
    this.tabStates.setFrame(frame, { paymentPointer: undefined })

    const requestId = this.assoc.getStreamId(frame)
    if (requestId) {
      this.tabStates.logLastMonetizationCommand(frame, 'stop', requestId)
    }
    const closed = this._closeStreams(frame.tabId, frame.frameId)
    // May be noop other side if stop monetization was initiated from
    // ContentScript
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
        requestId: (this.assoc.getStreamId({ tabId, frameId }) ?? requestId)!,
        state
      }
    }
    this.api.tabs.sendMessage(tabId, message, { frameId })
  }

  _closeStreams(tabId: number, frameId?: number) {
    const streamIds = this.assoc.getTabStreams(tabId)
    const haveFrameId = typeof frameId !== 'undefined'

    let closed = 0
    if (streamIds) {
      Object.entries(streamIds).forEach(([innerFrameId, streamId]) => {
        if (haveFrameId && Number(innerFrameId) !== frameId) {
          return
        }

        this.log('closing stream with id', streamId)
        this.streams.closeStream(streamId)
        this.assoc.clearFrame(streamId)
        closed++
      })
      if (haveFrameId) {
        this.assoc.clearStream({ tabId, frameId: frameId as number })
      } else {
        this.assoc.clearTabStreams(tabId)
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

  private logout() {
    for (const tabId of this.tabStates.tabKeys()) {
      // Make a copy as _closeStreams mutates and we want to actually close
      // the streams before we set the state to stopped.
      const requestIds = { ...this.assoc.getTabStreams(tabId) }
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
    // Clear tokens in incognito windows too
    this.framesService.sendCommandToFramesMatching(
      { command: 'clearToken' },
      frame => Boolean(frame.href?.startsWith(this.coilDomain))
    )
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
    const { tabId, frameId, spec } = getFrameSpec(sender)
    // Content script used to send a stopWebMonetization message every time
    // it loaded. Noop if no stream for tab.
    this._closeStreams(tabId, frameId)
    this.tabStates.clearFrame(spec)
    this.reloadTabState({
      from: 'onTabsUpdated status === contentScriptInit'
    })
    return true
  }

  private async onFrameAllowedChanged(
    request: OnFrameAllowedChanged,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: MessageSender
  ) {
    // Send message to all relevant frames in the tab
    const frames = [request.data.frame.frameId].concat(
      this.framesService.getChildren(request.data.frame).map(f => f.frameId)
    )
    frames.forEach(frameId => {
      const tabId = request.data.frame.tabId
      this.api.tabs.sendMessage(tabId, request, { frameId })
    })
  }

  private bindOnInstalled() {
    // This can mess up the puppeteer tests
    if (!this.buildConfig.isCI) {
      this.api.runtime.onInstalled.addListener(details => {
        if (details.reason === 'install') {
          this.api.tabs.create({ url: `${this.coilDomain}/signup` })
        }
      })
    }
  }
}
