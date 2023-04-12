//
// Models
//
export interface ITipContext {
  currentTipAmountUsd: number
  finalTipAmountUsd: number //* only used for the TipCompleteView so it renders the proper amount after local storage updates
  maxAllowableTipAmountUsd: number //* the maxAllowableTip is primarily responsible for disabling tipping inputs
  setCurrentTipAmountUsd: (amount: number) => void
  setFinalTipAmountUsd: (amount: number) => void
}
