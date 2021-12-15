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

  getTabStreams(tabId: number) {
    return this.tabsToFramesToStreams[tabId]
  }

  clearTabStreams(tabId: number) {
    delete this.tabsToFramesToStreams[tabId]
  }

  clearFrame(streamId: string) {
    delete this.streamsToFrames[streamId]
  }

  getFrame(streamId: string) {
    return this.streamsToFrames[streamId]
  }

  setFrame(streamId: string, frame: FrameSpec) {
    this.streamsToFrames[streamId] = frame
  }

  clearStreams({ tabId, frameId }: FrameSpec) {
    const tabsToFramesToStream = this.tabsToFramesToStreams[tabId]
    if (tabsToFramesToStream) {
      delete tabsToFramesToStream[frameId]
    }
  }

  getStreams({ tabId, frameId }: FrameSpec) {
    return this.tabsToFramesToStreams[tabId]
      ? this.tabsToFramesToStreams[tabId][frameId]
      : undefined
  }

  addStreamId({ tabId, frameId }: FrameSpec, streamId: string) {
    const ensured = (this.tabsToFramesToStreams[tabId] ??= {})
    ensured[frameId] ??= new Set<string>()
    ensured[frameId].add(streamId)
  }
}
