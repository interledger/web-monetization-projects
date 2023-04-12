import { injectable } from 'inversify'

import { FrameSpec } from '../../types/FrameSpec'

@injectable()
export class StreamAssociations {
  private tabsToFramesToStreams: {
    [tabId: number]: {
      [frameId: number]: Set<string>
    }
  } = {}

  private streamsToFrames: {
    [streamId: string]: FrameSpec
  } = {}

  getTabStreams(tabId: number): ReadonlyArray<[string, FrameSpec]> {
    return Object.values(this.tabsToFramesToStreams[tabId] ?? {}).reduce(
      (accum, set) => {
        set.forEach(v => accum.push([v, this.getStreamFrame(v)]))
        return accum
      },
      [] as Array<[string, FrameSpec]>
    )
  }

  clearTabStreams(tabId: number): void {
    this.getTabStreams(tabId).forEach(([streamId]) => {
      this.clearStreamFrame(streamId)
    })
    delete this.tabsToFramesToStreams[tabId]
  }

  clearStreamFrame(streamId: string): void {
    delete this.streamsToFrames[streamId]
  }

  clearStreamFrameAndFromFrameSet(streamId: string) {
    const { tabId, frameId } = this.getStreamFrame(streamId)
    this.clearStreamFrame(streamId)
    this.tabsToFramesToStreams[tabId]?.[frameId]?.delete(streamId)
  }

  getStreamFrame(streamId: string): FrameSpec {
    return this.streamsToFrames[streamId]
  }

  setStreamFrame(streamId: string, frame: FrameSpec): void {
    this.streamsToFrames[streamId] = frame
  }

  clearStreams({ tabId, frameId }: FrameSpec): void {
    this.getStreams({ tabId, frameId }).forEach(
      this.clearStreamFrame.bind(this)
    )
    const tabsToFramesToStream = this.tabsToFramesToStreams[tabId]
    if (tabsToFramesToStream) {
      delete tabsToFramesToStream[frameId]
    }
  }

  getStreams({ tabId, frameId }: FrameSpec): ReadonlyArray<string> {
    return Array.from(
      this.tabsToFramesToStreams[tabId]?.[frameId]?.values() ?? []
    )
  }

  addStreamId({ tabId, frameId }: FrameSpec, streamId: string): void {
    const ensured = (this.tabsToFramesToStreams[tabId] ??= {})
    ensured[frameId] ??= new Set<string>()
    ensured[frameId].add(streamId)
    this.setStreamFrame(streamId, { tabId, frameId })
  }
}
