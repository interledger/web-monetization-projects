import { PaymentDetails } from '@web-monetization/polyfill-utils'
import { MonetizationState } from '@web-monetization/types'

import {
  PlayOrPauseState,
  StickyState,
  ToggleControlsAction
} from './streamControls'

/**
 * browser.runtime.sendMessage
 */
export interface LocalStorageUpdate extends Command {
  command: 'localStorageUpdate'
  key: string
}

interface Command<T = any> {
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
export interface PauseWebMonetization extends Command {
  command: 'pauseWebMonetization'
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface ResumeWebMonetization extends Command {
  command: 'resumeWebMonetization'
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface StartWebMonetization extends Command {
  command: 'startWebMonetization'
  data: PaymentDetails & { initiatingUrl: string }
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
 * content -> backround
 * browser.runtime.sendMessage
 */
export interface CheckToken extends Command {
  command: 'checkToken'
  data: {
    token: string
  }
}

/**
 * content -> background
 * browser.runtime.sendMessage
 */
export interface LogCommand extends Command {
  command: 'log'
  data: string
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
export interface RunContent {
  command: 'runContent'
  data: { from?: string }
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
export interface ClosePopup {
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
    /**
     * Only the content script can be the source of a finalized event
     */
    finalized?: undefined
  }
}

export type ToContentMessage =
  | RunContent
  | MonetizationProgress
  | MonetizationStart
  | SetMonetizationState

export type ToPopupMessage = LocalStorageUpdate | ClosePopup
