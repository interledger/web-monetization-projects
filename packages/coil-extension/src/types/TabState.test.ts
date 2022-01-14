import { FrameState, isFrameMonetized } from './TabState'

describe('isFrameStateMonetized', () => {
  it('isFrameStateMonetized', () => {
    const frameState: FrameState = {
      total: 0,
      adapted: false,
      ['requestId-lastCommand-a']: {
        command: 'start',
        details: {
          requestId: 'a',
          paymentPointer: '',
          initiatingUrl: '',
          attrs: {},
          tagType: 'meta',
          fromBody: false
        }
      }
    }
    expect(isFrameMonetized(frameState)).toBe(true)
  })
})
