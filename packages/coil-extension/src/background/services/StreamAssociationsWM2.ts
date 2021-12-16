import { injectable } from 'inversify'

import { FrameSpec } from '../../types/FrameSpec'

@injectable()
export class StreamAssociationsWM2 {
  private tabsToFramesToStreams: {
    [tabId: number]: {
      [frameId: number]: Set<string>
    }
  } = {}

  private streamsToFrames: {
    [streamId: string]: FrameSpec
  } = {}

  getTabStreams(tabId: number): string[] {
    return Object.values(this.tabsToFramesToStreams[tabId] ?? {}).reduce(
      (accum, set) => {
        set.forEach(v => accum.push(v))
        return accum
      },
      [] as string[]
    )
  }

  clearTabStreams(tabId: number): void {
    delete this.tabsToFramesToStreams[tabId]
  }

  clearStreamFrame(streamId: string): void {
    delete this.streamsToFrames[streamId]
  }

  getStreamFrame(streamId: string): FrameSpec {
    return this.streamsToFrames[streamId]
  }

  setStreamFrame(streamId: string, frame: FrameSpec): void {
    this.streamsToFrames[streamId] = frame
  }

  clearStreams({ tabId, frameId }: FrameSpec): void {
    const tabsToFramesToStream = this.tabsToFramesToStreams[tabId]
    if (tabsToFramesToStream) {
      delete tabsToFramesToStream[frameId]
    }
  }

  getStreams({ tabId, frameId }: FrameSpec): string[] {
    return Array.from(
      this.tabsToFramesToStreams[tabId]?.[frameId]?.values() ?? []
    )
  }

  addStreamId({ tabId, frameId }: FrameSpec, streamId: string): void {
    const ensured = (this.tabsToFramesToStreams[tabId] ??= {})
    ensured[frameId] ??= new Set<string>()
    ensured[frameId].add(streamId)
  }
}
