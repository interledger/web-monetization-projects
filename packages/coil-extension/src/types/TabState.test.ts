import { FrameState, isFrameMonetized } from './TabState'

describe('isFrameStateMonetized', () => {
  it('isFrameStateMonetized', () => {
    const frameState: FrameState = {
      adapted: false,
      ['monetization-state-a']: {
        command: 'start',
        total: 0,
        lastPacketTime: 0,
        details: {
          requestId: 'a',
          paymentPointer: '',
          initiatingUrl: '',
          attrs: {},
          tagType: 'meta',
          fromBody: false,
          fromHTTPHeader: false
        }
      }
    }
    expect(isFrameMonetized(frameState)).toBe(true)
  })
})
