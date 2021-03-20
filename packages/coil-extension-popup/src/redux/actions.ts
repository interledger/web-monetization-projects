import { ProcessStep } from '@coil/extension-popup/types'
import * as actions from '@coil/extension-popup/redux/actions-constants'
import { Actions, ISettingsUpdate } from '@coil/extension-popup/redux/models'

//
// Action Creators
//
export const set_current_tip_amount = (payload: number): Actions => ({
  type: actions.SET_CURRENT_TIP_AMOUNT,
  payload
})

export const set_process_step = (payload: ProcessStep): Actions => ({
  type: actions.SET_PROCESS_STEP,
  payload
})

export const set_hotkeys_submit = (payload: boolean): Actions => ({
  type: actions.SET_HOTKEYS_SUBMIT,
  payload
})

export const set_tip_credit_balance = (payload: number): Actions => ({
  type: actions.SET_TIP_CREDIT_BALANCE,
  payload
})

export const add_tip_to_history = (payload: number): Actions => ({
  type: actions.ADD_TIP_TO_HISTORY,
  payload
})

export const clear_tip_to_history = (): Actions => ({
  type: actions.CLEAR_TIP_TO_HISTORY
})

export const toggle_extension = (): Actions => ({
  type: actions.TOGGLE_EXTENSION
})

export const toggle_settings = (): Actions => ({
  type: actions.TOGGLE_SETTINGS
})

export const update_from_settings = (payload: ISettingsUpdate): Actions => ({
  type: actions.UPDATE_FROM_SETTINGS,
  payload
})

export const reset_defaults_from_settings = (): Actions => ({
  type: actions.RESET_DEFAULTS_FROM_SETTINGS
})

export const set_design_iteration = (payload: number): Actions => ({
  type: actions.SET_DESIGN_ITERATION,
  payload
})
