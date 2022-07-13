import {
  IDLE_TIMEOUT,
  IdleDetection,
  IdleDetectionDocument
} from '@webmonetization/wext/content'

type VisibilityState = Document['visibilityState']

class MockDocument implements IdleDetectionDocument {
  visibilityState: VisibilityState = 'hidden'
  listeners: Partial<Record<keyof DocumentEventMap, Function>> = {}

  addEventListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    if (this.listeners[type]) {
      throw new Error()
    }
    this.listeners[type] = listener
  }

  removeEventListener<K extends keyof DocumentEventMap>(
    type: K,
    listener: (this: Document, ev: DocumentEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ) {
    delete this.listeners[type]
  }

  mouseMove() {
    this.listeners['mousemove']?.call(this)
  }

  changeVisibilityState(state: VisibilityState) {
    const prior = this.visibilityState
    this.visibilityState = state
    if (prior !== state) {
      this.listeners['visibilitychange']?.call(this)
    }
  }
}

beforeEach(() => {
  jest.useFakeTimers()
})
afterEach(() => {
  jest.useRealTimers()
})

describe('IdleDetection', () => {
  it('should do something', () => {
    const doc = new MockDocument()
    const now = 0 // Date.now()
    let passed = 0
    const passTime = (ms: number) => {
      passed += ms
      jest.advanceTimersByTime(ms)
    }

    doc.visibilityState = 'visible'
    const idle = new IdleDetection(doc as unknown as Document)
    jest.spyOn(idle, 'getNow').mockImplementation(() => now + passed)
    const { setWatch, clearWatch } = idle.watchPageEvents()
    const watch = { pause: jest.fn(), resume: jest.fn() }
    setWatch(watch)
    expect(jest.getTimerCount()).toBe(1)
    passTime(IDLE_TIMEOUT)
    expect(jest.getTimerCount()).toBe(0)

    expect(watch.pause.mock.calls.length).toBe(1)
    expect(watch.resume.mock.calls.length).toBe(0)

    doc.mouseMove()
    expect(watch.resume.mock.calls.length).toBe(1)
    passTime(IDLE_TIMEOUT)
    expect(watch.pause.mock.calls.length).toBe(2)

    doc.mouseMove()
    expect(watch.resume.mock.calls.length).toBe(2)

    clearWatch()
  })
})
