import { injectable } from 'inversify'

import { FrameSpec } from '../../types/FrameSpec'

@injectable()
export class StreamAssociations {
  // TODO: extract these two variables into some kind of service
  private tabsToFramesToStreams: {
    [tab: number]: Record<
      // frameId
      number,
      // streamId
      string
    >
  } = {}

  private streamsToFrames: {
    [stream: string]: FrameSpec
  } = {}

  getTabStreams(tabId: number) {
    return { ...this.tabsToFramesToStreams[tabId] }
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

  clearFrameStream(tabId: number, frameId: number) {
    delete this.tabsToFramesToStreams[tabId][frameId as number]
  }

  getStreamID({ tabId, frameId }: FrameSpec) {
    return this.tabsToFramesToStreams[tabId]
      ? this.tabsToFramesToStreams[tabId][frameId]
      : undefined
  }

  setStreamID({ tabId, frameId }: FrameSpec, streamId: string) {
    const ensured = (this.tabsToFramesToStreams[tabId] =
      this.tabsToFramesToStreams[tabId] ?? {})
    ensured[frameId] = streamId
  }
}
