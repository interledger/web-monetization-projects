import '@abraham/reflection'

import { StreamAssociationsWM2 } from './StreamAssociationsWM2'

describe('StreamAssociations', () => {
  it('should internally store only unique strings for each frame', () => {
    const assoc = new StreamAssociationsWM2()
    const streamA = 'a'
    const frame = { tabId: 1, frameId: 0 }
    assoc.addStreamId(frame, streamA)
    assoc.addStreamId(frame, streamA)
    const streams = assoc.getStreams(frame)
    expect(streams).toContain(streamA)
    expect(streams).toHaveLength(1)
  })

  it('getStreams should return an array view list of streams', () => {
    const assoc = new StreamAssociationsWM2()
    const frame = { tabId: 1, frameId: 0 }
    const streams = assoc.getStreams(frame)
    expect(streams).toBeInstanceOf(Array)
  })

  it('getTabStreams should return an aggregate array list', () => {
    const assoc = new StreamAssociationsWM2()
    const frame = { tabId: 1, frameId: 0 }
    const frame1 = { tabId: 1, frameId: 1 }
    const frame2 = { tabId: 1, frameId: 2 }

    // Add six streams between 3 frames
    assoc.addStreamId(frame, 'a')
    assoc.addStreamId(frame, 'b')
    assoc.addStreamId(frame, 'c')
    assoc.addStreamId(frame1, 'd')
    assoc.addStreamId(frame1, 'e')
    assoc.addStreamId(frame2, 'f')

    const tabStreams = assoc.getTabStreams(1)
    expect(tabStreams).toBeInstanceOf(Array)
    expect(tabStreams).toHaveLength(6)
    expect(tabStreams).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
  })

  it('clearStreams should empty the internal store', () => {
    const assoc = new StreamAssociationsWM2()
    const frame = { tabId: 1, frameId: 1 }

    // Add 3 streams, equivalent to 3 <link> tags
    assoc.addStreamId(frame, 'a')
    assoc.addStreamId(frame, 'b')
    assoc.addStreamId(frame, 'c')
    expect(assoc.getStreams(frame)).toHaveLength(3)

    // Clear the streams for the frame
    assoc.clearStreams(frame)
    expect(assoc.getStreams(frame)).toHaveLength(0)
  })
})
