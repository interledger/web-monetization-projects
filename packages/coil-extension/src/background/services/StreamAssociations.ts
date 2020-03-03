import { injectable } from 'inversify'

import { FrameSpec } from '../../types/FrameSpec'

@injectable()
export class StreamAssociations {
  private tabsToFramesToStreams: {
    [tabId: number]: {
      [frameId: number]: string
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

  clearStream({ tabId, frameId }: FrameSpec) {
    const tabsToFramesToStream = this.tabsToFramesToStreams[tabId]
    if (tabsToFramesToStream) {
      delete tabsToFramesToStream[frameId]
    }
  }

  getStreamId({ tabId, frameId }: FrameSpec) {
    return this.tabsToFramesToStreams[tabId]
      ? this.tabsToFramesToStreams[tabId][frameId]
      : undefined
  }

  setStreamId({ tabId, frameId }: FrameSpec, streamId: string) {
    const ensured = (this.tabsToFramesToStreams[tabId] =
      this.tabsToFramesToStreams[tabId] ?? {})
    ensured[frameId] = streamId
  }
}
