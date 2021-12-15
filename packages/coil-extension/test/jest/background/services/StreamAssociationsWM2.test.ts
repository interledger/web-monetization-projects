import '@abraham/reflection'

import { StreamAssociationsWM2 } from '../../../../src/background/services/StreamAssociationsWM2'

describe('StreamAssociations', () => {
  it('should store a Set() of strings for each frame', () => {
    const assoc = new StreamAssociationsWM2()
    const streamA = 'a'
    const frame = { tabId: 1, frameId: 0 }
    assoc.addStreamId(frame, streamA)
    expect(assoc.getStreams(frame)).toContain(streamA)
  })
})
