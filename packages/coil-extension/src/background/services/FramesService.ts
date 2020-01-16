import { injectable, inject } from 'inversify'
import * as tokens from '@web-monetization/wext/tokens'

type Frame = {
  status: string
  url: string
  title: string
}

@injectable()
export class FramesService {
  tabs: Record<number, Array<Frame>> = {}

  constructor(
    @inject(tokens.WextApi)
    private api: typeof window.chrome
  ) {}

  findFrame(tabId: number): Frame | null {
    return null
  }

  monitor() {
    this.api.tabs.onUpdated.addListener((tabId, change, tab) => {
      //
    })
  }
}
