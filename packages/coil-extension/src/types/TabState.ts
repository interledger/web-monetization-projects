import { PaymentDetails } from '@webmonetization/polyfill-utils'

export type MonetizationCommand = 'pause' | 'stop' | 'start' | 'resume'
export const MonetizationStateKey = `monetization-state-` as const
export type MonetizationStateKeyType = typeof MonetizationStateKey

export type MonetizationRequestState = {
  command: MonetizationCommand
  details: PaymentDetails
  total: number
  lastPacketTime: number
}

export interface FrameState {
  paymentPointer?: string
  adapted: boolean
  // Tracks the total amount of `source` money sent (not was received)
  [x: `${MonetizationStateKeyType}${string}`]:
    | MonetizationRequestState
    | undefined
    | null
}

export function isFrameMonetized(frameState: FrameState, log = '') {
  return Object.keys(frameState).some(
    key =>
      key.startsWith(MonetizationStateKey) &&
      frameState[key as MonetizationStateKeyType]?.command !== 'stop'
  )
}

export function isFrameStreaming(frameState: FrameState) {
  return Object.keys(frameState).some(key => {
    const command = frameState[key as MonetizationStateKeyType]?.command
    return (
      key.startsWith(MonetizationStateKey) &&
      (command === 'start' || command === 'resume')
    )
  })
}

export function getFrameTotal(frameState: FrameState) {
  return getFrameRequestStates(frameState).reduce((acc, val) => {
    return acc + val.total
  }, 0)
}

export function getFrameRequestStates(frame: FrameState) {
  return Object.keys(frame)
    .filter(key => key.startsWith(MonetizationStateKey))
    .map(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      k => frame[k as MonetizationStateKeyType]!
    )
}

export function frameHasRecentPacket(frameState: FrameState) {
  const now = Date.now()
  return getFrameRequestStates(frameState).some(s => {
    return s.lastPacketTime != 0 && now - s.lastPacketTime <= 5e3
  })
}

export interface TabState {
  favicon?: string
  coilSite?: string
  iconPrimary?: 'active' | 'inactive' | 'tipping-only'
  iconSecondary?: 'unavailable' | 'streaming' | 'streaming-paused' | null
  frameStates: Record<number, FrameState>
}
