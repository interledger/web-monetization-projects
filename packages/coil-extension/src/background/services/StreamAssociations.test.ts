import { describe, expect, it } from '@jest/globals'
import '@abraham/reflection'

import { StreamAssociations } from './StreamAssociations'

describe('StreamAssociations', () => {
  it('should internally store only unique strings for each frame', () => {
    const assoc = new StreamAssociations()
    const streamA = 'a'
    const frame = { tabId: 1, frameId: 0 }
    assoc.addStreamId(frame, streamA)
    assoc.addStreamId(frame, streamA)
    const streams = assoc.getStreams(frame)
    expect(streams).toContain(streamA)
    expect(streams).toHaveLength(1)
  })

  it('should set reverse association when adding stream id', () => {
    const assoc = new StreamAssociations()
    const streamA = 'a'
    const frame = { tabId: 1, frameId: 0 }
    assoc.addStreamId(frame, streamA)
    expect(assoc.getStreamFrame(streamA)).toEqual(frame)
  })

  it('getStreams should return an array view list of streams', () => {
    const assoc = new StreamAssociations()
    const frame = { tabId: 1, frameId: 0 }
    const streams = assoc.getStreams(frame)
    expect(streams).toBeInstanceOf(Array)
  })

  it('getTabStreams should return an aggregate array list', () => {
    const assoc = new StreamAssociations()
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
    expect(tabStreams).toEqual([
      ['a', frame],
      ['b', frame],
      ['c', frame],
      ['d', frame1],
      ['e', frame1],
      ['f', frame2]
    ])
  })

  it('should delete all frame associations after clearTabStreams', () => {
    const assoc = new StreamAssociations()
    const frame = { tabId: 1, frameId: 0 }
    const frame2 = { tabId: 1, frameId: 2 }

    assoc.addStreamId(frame, 'a')
    assoc.addStreamId(frame2, 'f')

    expect(assoc.getStreamFrame('a')).toEqual(frame)
    expect(assoc.getStreamFrame('f')).toEqual(frame2)

    assoc.clearTabStreams(frame.tabId)

    expect(assoc.getStreamFrame('a')).toBeUndefined()
    expect(assoc.getStreamFrame('f')).toBeUndefined()
  })

  it('clearStreams should empty the internal store', () => {
    const assoc = new StreamAssociations()
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
