import { inject, injectable } from 'inversify'
import { GraphQlClient } from '@coil/client'

import { notNullOrUndef } from '../../util/nullables'
import { StorageService } from '../../services/storage'
import * as tokens from '../../types/tokens'
import {
  AdaptedSite,
  CheckAdaptedContent,
  CheckIFrameIsAllowedFromBackground,
  ClosePopup,
  ContentScriptInit,
  OnFrameAllowedChanged,
  ReportCorrelationIdFromIFrameContentScript,
  ReportCorrelationIdToParentContentScript,
  SetMonetizationState,
  TipSent,
  ToBackgroundMessage
} from '../../types/commands'
import { LocalStorageProxy } from '../../types/storage'
import { getFrameSpec } from '../../util/tabs'
import { FrameSpec } from '../../types/FrameSpec'
import { BuildConfig } from '../../types/BuildConfig'

import { AuthService } from './AuthService'
import { TabStates } from './TabStates'
import { Streams } from './Streams'
import { PopupBrowserAction } from './PopupBrowserAction'
import { Logger, logger } from './utils'
import { YoutubeService } from './YoutubeService'
import { BackgroundFramesService } from './BackgroundFramesService'
import { ActiveTabLogger } from './ActiveTabLogger'
import { StreamAssociationsWM2 } from './StreamAssociationsWM2'
import { SPSPStateWM2 } from './SPSPStateWM2'
import { MonetizationService } from './MonetizationService'

import MessageSender = chrome.runtime.MessageSender

@injectable()
export class BackgroundScript {
  constructor(
    private popup: PopupBrowserAction,
    private assoc: StreamAssociationsWM2,
    private streams: Streams,
    private spspState: SPSPStateWM2,
    private tabStates: TabStates,
    private storage: StorageService,
    @inject(tokens.LocalStorageProxy)
    private store: LocalStorageProxy,
    private auth: AuthService,
    private monetization: MonetizationService,
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

    this.monetization.init()

    this.popup.setDefaultInactive()
    this.framesService.monitor()
    this.bindOnInstalled()
    void this.initAuth()
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
      this.tabStates.reloadTabState({ from: 'onActivated' })
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
          this.tabStates.reloadTabState({ from: 'onFocusChanged' })
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
    this.tabStates.reloadTabState({ from: 'initial' })
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
        sendResponse(
          await this.monetization.startWebMonetization(request, sender)
        )
        break
      case 'pauseWebMonetization':
        sendResponse(this.monetization.pauseWebMonetization(request, sender))
        break
      case 'resumeWebMonetization':
        sendResponse(this.monetization.resumeWebMonetization(request, sender))
        break
      case 'stopWebMonetization':
        sendResponse(this.monetization.stopWebMonetization(sender))
        break
      case 'isRateLimited':
        sendResponse(await this.isRateLimited())
        break
      case 'setStreamControls':
        sendResponse(this.monetization.setStreamControls(request, sender))
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
      this.tabStates.reloadTabState({ from: 'setCoilUrlForPopupIfNeeded' })
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
      this.tabStates.reloadTabState({})
    }
  }

  adaptedSite(data: AdaptedSite['data'], sender: MessageSender) {
    const { spec } = getFrameSpec(sender)
    this.tabStates.setFrame(spec, {
      adapted: data.state
    })
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

  private async sendTip(): Promise<{ success: boolean }> {
    const tabId = this.activeTab
    const streamId = this.assoc.getStreams({ tabId, frameId: 0 })
    if (!streamId.length) {
      this.log('can not find top frame for tabId=%d', tabId)
      return { success: false }
    }
    const stream = this.streams.getStream(streamId[0])
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
    const { assetCode, assetScale, exchangeRate } = stream.getAssetDetails()
    const amount = Math.floor(1e9 * exchangeRate).toString() // 1 USD, assetScale = 9

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
      const message: TipSent = {
        command: 'tip',
        data: {
          paymentPointer: receiver,
          amount,
          assetCode,
          assetScale
        }
      }
      this.api.tabs.sendMessage(tabId, message, { frameId: 0 })
      return { success: true }
    } catch (e) {
      this.log(`sendTip: error. msg=${e.message}`)
      return { success: false }
    }
  }

  private async tipPreview(tip: number): Promise<{
    success: boolean
    message?: string
    creditCardCharge?: string
    tipCreditCharge?: string
  }> {
    const token = this.auth.getStoredToken()

    // TODO: return detailed errors
    if (!token) {
      this.log('tipPreview: token. !!token ', !!token)
      return { success: false }
    }

    // Set tip amount
    const CENTS = 100
    const tipAmountCents = Math.floor(tip * CENTS).toString()

    try {
      this.log('tipPreview: requesting tip preview')

      const result = await this.client.tipPreview(token, tipAmountCents)

      return {
        success: true,
        creditCardCharge: result.charges.creditCardCharge,
        tipCreditCharge: result.charges.tipCreditCharge
      }
    } catch (e) {
      this.log(`tipPreview: error. msg=${e.message}`)
      return { success: false, message: e.message }
    }
  }

  private async tip(tip: number): Promise<{ success: boolean }> {
    const tabId = this.activeTab
    const streamId = this.assoc.getStreams({ tabId, frameId: 0 })
    if (!streamId.length) {
      this.log('can not find top frame for tabId=%d', tabId)
      return { success: false }
    }
    // TODO:WM2
    const stream = this.streams.getStream(streamId[0])
    const token = this.auth.getStoredToken()

    // TODO: return detailed errors
    if (!stream || !token) {
      this.log('tip: no stream | token. !!stream !!token ', !!stream, !!token)
      return { success: false }
    }

    const receiver = stream.getPaymentPointer()

    // Set tip amount
    const CENTS = 100
    const tipAmountCents = Math.floor(tip * CENTS).toString()

    // Set active tab url
    const frameId = 0
    const frame = notNullOrUndef(
      this.framesService.getFrame({ frameId, tabId })
    )
    const activeTabUrl = frame.href

    try {
      this.log(`tip: sending tip to ${receiver}`)

      const result = await this.client.tip(token, {
        tipAmountCents,
        destination: receiver,
        origin: activeTabUrl
      })

      this.log(`tip: sent tip to ${receiver}`, result)
      return { success: true }
    } catch (e) {
      this.log(`tip: error. msg=${e.message}`)
      return { success: false }
    }
  }

  _closeStreams(tabId: number, frameId?: number) {
    return this.monetization._closeStreams(tabId, frameId)
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
      const requestIds = this.assoc.getTabStreams(tabId)
      this._closeStreams(tabId)
      this.tabStates.clear(tabId)
      requestIds.forEach(([requestId, frame]) => {
        // TODO: this is hacky, but should do the trick for now
        const message: SetMonetizationState = {
          command: 'setMonetizationState',
          data: { state: 'stopped', requestId }
        }
        this.api.tabs.sendMessage(tabId, message, { frameId: frame.frameId })
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
    this.tabStates.reloadTabState({})
    return true
  }

  private contentScriptInit(request: ContentScriptInit, sender: MessageSender) {
    const { tabId, frameId, spec } = getFrameSpec(sender)
    // Content script used to send a stopWebMonetization message every time
    // it loaded. Noop if no stream for tab.
    this._closeStreams(tabId, frameId)
    this.tabStates.clearFrame(spec)
    this.tabStates.reloadTabState({
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
