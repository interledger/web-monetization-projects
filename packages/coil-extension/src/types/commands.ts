import { PaymentDetails } from '@webmonetization/polyfill-utils'
import { MonetizationState } from '@webmonetization/types'

import {
  PlayOrPauseState,
  StickyState,
  ToggleControlsAction
} from './streamControls'
import { FrameSpec } from './FrameSpec'

/**
 * browser.runtime.sendMessage
 */
export interface LocalStorageUpdate extends Command {
  command: 'localStorageUpdate'
  key: string
}

export interface Command<T = any> {
  command: string
  data?: T
}

/**
 * popup -> background
 * browser.runtime.sendMessage
 */
export interface SetStreamControls extends Command {
  command: 'setStreamControls'
  data: {
    sticky: StickyState
    play: PlayOrPauseState
    action: ToggleControlsAction
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface Logout extends Command {
  command: 'logout'
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface ContentScriptInit extends Command {
  command: 'contentScriptInit'
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface AdaptedPageDetails extends Command {
  command: 'adaptedPageDetails'
  data: { url: string; channelId?: string }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface PauseWebMonetization extends Command {
  command: 'pauseWebMonetization'
  data: {
    requestId?: string
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface ResumeWebMonetization extends Command {
  command: 'resumeWebMonetization'
  data: {
    requestId?: string
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface StartWebMonetization extends Command {
  command: 'startWebMonetization'
  data: PaymentDetails
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface StopWebMonetization extends Command {
  command: 'stopWebMonetization'
  data: PaymentDetails
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface LogCommand extends Command {
  command: 'log'
  data: string
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface FetchYoutubeChannelId extends Command {
  command: 'fetchYoutubeChannelId'
  data: {
    youtubeUrl: string
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface FrameStateChange extends Command {
  command: 'frameStateChange'
  data: {
    state: Document['readyState']
    href: string
  }
}

/**
 * content -> background, background -> content
 * browser.runtime.sendMessage, browser.tabs.sendMessage
 */
export interface OnFrameAllowedChanged extends Command {
  command: 'onFrameAllowedChanged'
  data: {
    frame: FrameSpec
    allowed: boolean
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface UnloadFrame extends Command {
  command: 'unloadFrame'
  // frameId is retrieved via MessageSender['frameId']
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface ReportCorrelationIdFromIFrameContentScript extends Command {
  command: 'reportCorrelationIdFromIFrameContentScript'
  data: {
    correlationId: string
    // FrameSpec is implied
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface CheckIFrameIsAllowedFromIFrameContentScript extends Command {
  command: 'checkIFrameIsAllowedFromIFrameContentScript'
  // data: {
  // FrameSpec is implied
  // }
}

export type ToBackgroundMessage =
  | PauseWebMonetization
  | ResumeWebMonetization
  | StopWebMonetization
  | SetStreamControls
  | LogCommand
  | Logout
  | AdaptedSite
  | InjectToken
  | StartWebMonetization
  | IsRateLimited
  | ContentScriptInit
  | FetchYoutubeChannelId
  | SendTip
  | TipPreview
  | Tip
  | FrameStateChange
  | UnloadFrame
  | CheckIFrameIsAllowedFromIFrameContentScript
  | ReportCorrelationIdFromIFrameContentScript
  | OnFrameAllowedChanged
  | AdaptedPageDetails

export type IconState =
  | 'streaming-paused'
  | 'unavailable'
  | 'inactive'
  | 'monetized'
  | 'streaming'

export interface AdaptedSite {
  command: 'adaptedSite'
  data: {
    state: boolean // adapted
    channelImage: string
  }
}

export interface InjectToken extends Command {
  command: 'injectToken'
  data: {
    token: string
  }
}

/**
 * popup -> background
 * browser.runtime.sendMessage
 */
export interface IsRateLimited extends Command {
  command: 'isRateLimited'
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface CheckAdaptedContent {
  command: 'checkAdaptedContent'
  data: { from?: string }
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface ClearToken {
  command: 'clearToken'
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface MonetizationProgress {
  command: 'monetizationProgress'
  data: {
    // received
    amount: string
    receipt?: string
    // source
    sentAmount: string
    assetCode: string
    assetScale: number
    requestId: string
    paymentPointer: string
  }
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface MonetizationStart {
  command: 'monetizationStart'
  data: {
    requestId: string
    paymentPointer: string
  }
}

/**
 *  background -> popup
 *  browser.tabs.sendMessage
 */
export interface ClosePopup extends Command {
  command: 'closePopup'
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface SetMonetizationState {
  command: 'setMonetizationState'
  data: {
    state: MonetizationState
    requestId: string
    /**
     * Only the content script can be the source of a finalized event
     */
    finalized?: undefined
  }
}

/**
 * popup -> background
 * browser.runtime.sendMessage
 */
export interface SendTip {
  command: 'sendTip'
}

/**
 * background -> popup
 * reply to browser.runtime.sendMessage
 */
export interface SendTipResult {
  success: boolean
}

/**
 * popup -> background
 * browser.runtime.sendMessage
 */
export interface TipPreview {
  command: 'tipPreview'
  data: {
    amount: number
  }
}

/**
 * background -> popup
 * reply to browser.runtime.sendMessage
 */
export interface TipPreviewResult {
  success: boolean
  message?: string
  creditCardCharge: string
  tipCreditCharge: string
}

/**
 * popup -> background
 * browser.runtime.sendMessage
 */
export interface Tip {
  command: 'tip'
  data: {
    amount: number
  }
}

/**
 * background -> popup
 * reply to browser.runtime.sendMessage
 */
export interface TipResult {
  success: boolean
  message?: string
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface TipQuoteResult {
  command: 'tipQuote'
  data: {
    paymentPointer: string
    amount: string
    assetCode: string
    assetScale: number
  }
}
/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface TipSent {
  command: 'tip'
  data: {
    paymentPointer: string
    amount: string
    assetCode: string
    assetScale: number
  }
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface CheckIFrameIsAllowedFromBackground {
  command: 'checkIFrameIsAllowedFromBackground'
  data: {
    frame: FrameSpec
  }
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface ReportCorrelationIdToParentContentScript {
  command: 'reportCorrelationIdToParentContentScript'
  data: {
    frame: FrameSpec
    correlationId: string
  }
}

/**
 *  background -> content
 *  browser.tabs.sendMessage
 */
export interface LogInActiveTab {
  command: 'logInActiveTab'
  data: {
    log: string
  }
}

export type ToContentMessage =
  | CheckAdaptedContent
  | MonetizationProgress
  | MonetizationStart
  | SetMonetizationState
  | CheckIFrameIsAllowedFromBackground
  | ReportCorrelationIdToParentContentScript
  | OnFrameAllowedChanged
  | TipSent
  | ClearToken
  | LogInActiveTab

export type ToPopupMessage = LocalStorageUpdate | ClosePopup
