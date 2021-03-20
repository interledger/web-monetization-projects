import { ProcessStep, HotkeySetting } from '@coil/extension-popup/types'
import * as actions from '@coil/extension-popup/redux/actions-constants'
import { IRootState, Actions } from '@coil/extension-popup/redux/models'

//
// Models
//
export const defaultState: IRootState = {
  settingsIsOpen: false,
  extensionIsOpen: false,
  minimumTipLimit: 1,
  maximumTipLimit: 999999,
  maximumDailyTipLimit: 400,
  tipCreditBalance: 10,
  // tipHistory: [1, 1, 1, 1, 3, 3, 8, 8, 8, 9, 10, 10, 25],
  tipHistory: [] as number[],
  defaultHotkeyAmounts: [2, 5, 10, 50],
  hotkeyAmounts: [1, 5, 10, 50],
  currentTipAmount: 1,
  processStep: ProcessStep.Tip,
  hotkeySetting: HotkeySetting.Default,
  hotkeysSubmit: false,
  designIteration: 2
}

//
// Reducer
//
export const RootReducer = (
  state = defaultState,
  action: Actions
): IRootState => {
  switch (action.type) {
    case actions.SET_CURRENT_TIP_AMOUNT: {
      return { ...state, currentTipAmount: action.payload }
    }

    case actions.SET_TIP_CREDIT_BALANCE: {
      return { ...state, tipCreditBalance: action.payload }
    }

    case actions.SET_PROCESS_STEP: {
      return { ...state, processStep: action.payload }
    }

    case actions.SET_HOTKEYS_SUBMIT: {
      return { ...state, hotkeysSubmit: action.payload }
    }

    case actions.ADD_TIP_TO_HISTORY: {
      const updatedHistory = state.tipHistory.slice()
      updatedHistory.push(action.payload)
      return { ...state, tipHistory: updatedHistory }
    }

    case actions.CLEAR_TIP_TO_HISTORY: {
      return { ...state, tipHistory: [] }
    }

    case actions.TOGGLE_EXTENSION: {
      if (!state.extensionIsOpen) {
        // if extension is closed, cleanup and open
        return {
          ...state,
          extensionIsOpen: true,
          currentTipAmount: defaultState.currentTipAmount,
          processStep: ProcessStep.Tip
        }
      } else {
        return { ...state, extensionIsOpen: false }
      }
    }

    case actions.TOGGLE_SETTINGS: {
      return { ...state, settingsIsOpen: !state.settingsIsOpen }
    }

    case actions.UPDATE_FROM_SETTINGS: {
      return { ...state, ...action.payload, processStep: ProcessStep.Tip }
    }

    case actions.RESET_DEFAULTS_FROM_SETTINGS: {
      return { ...defaultState, settingsIsOpen: true }
    }

    case actions.SET_DESIGN_ITERATION: {
      return {
        ...defaultState,
        processStep: ProcessStep.Tip,
        designIteration: action.payload
      }
    }

    default: {
      return state
    }
  }
}
