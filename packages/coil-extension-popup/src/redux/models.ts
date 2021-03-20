import * as constants from '@coil/extension-popup/redux/actions-constants'
import { ProcessStep, HotkeySetting } from '@coil/extension-popup/types'

export interface IRootState {
  settingsIsOpen: boolean
  extensionIsOpen: boolean
  minimumTipLimit: number
  maximumTipLimit: number
  maximumDailyTipLimit: number
  tipCreditBalance: number
  tipHistory: number[]
  defaultHotkeyAmounts: number[]
  hotkeyAmounts: number[]
  currentTipAmount: number
  processStep: ProcessStep
  hotkeySetting: HotkeySetting
  hotkeysSubmit: boolean
  designIteration: number
}

export interface ISettingsUpdate {
  maximumTipLimit: number
  maximumDailyTipLimit: number
  minimumTipLimit: number
  tipCreditBalance: number
  hotkeyAmounts: number[]
  hotkeySetting: HotkeySetting
  hotkeysSubmit: boolean
  designIteration: number
}

export type Actions =
  | { type: typeof constants.SET_CURRENT_TIP_AMOUNT; payload: number }
  | { type: typeof constants.SET_TIP_CREDIT_BALANCE; payload: number }
  | { type: typeof constants.SET_PROCESS_STEP; payload: ProcessStep }
  | { type: typeof constants.ADD_TIP_TO_HISTORY; payload: number }
  | { type: typeof constants.CLEAR_TIP_TO_HISTORY }
  | { type: typeof constants.TOGGLE_EXTENSION }
  | { type: typeof constants.TOGGLE_SETTINGS }
  | { type: typeof constants.UPDATE_FROM_SETTINGS; payload: ISettingsUpdate }
  | { type: typeof constants.RESET_DEFAULTS_FROM_SETTINGS }
  | { type: typeof constants.SET_HOTKEYS_SUBMIT; payload: boolean }
  | { type: typeof constants.SET_DESIGN_ITERATION; payload: number }
