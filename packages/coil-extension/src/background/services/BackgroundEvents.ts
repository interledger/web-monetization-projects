/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events'

import { inject, injectable } from 'inversify'
import { WextApi } from '@webmonetization/wext/tokens'

/**
 * Not all events are defined in all implementations, so we wrap the declaration
 * in a getter function, which will return undefined when there is a reference
 * error.
 *
 * Mostly this is just so we don't have to maintain a separate list of events
 * and a separate interface.
 *
 * When running this code in jest-dom, chrome will not be defined.
 */
const get = <T>(getter: () => T) => {
  try {
    return getter()
  } catch {
    return undefined
  }
}

const EVENTS = {
  'tabs.onRemoved': get(() => chrome.tabs.onRemoved),
  'tabs.onReplaced': get(() => chrome.tabs.onReplaced),
  'tabs.onActivated': get(() => chrome.tabs.onActivated),
  'tabs.onActiveChanged': get(() => chrome.tabs.onActiveChanged),
  'tabs.onSelectionChanged': get(() => chrome.tabs.onSelectionChanged),
  'tabs.onCreated': get(() => chrome.tabs.onCreated),
  'tabs.onAttached': get(() => chrome.tabs.onAttached),
  'tabs.onDetached': get(() => chrome.tabs.onDetached),

  'windows.onFocusChanged': get(() => chrome.windows.onFocusChanged),

  // Not available on Safari, last checked version 15.5
  'webNavigation.onHistoryStateUpdated': get(
    () => chrome.webNavigation.onHistoryStateUpdated
  ),
  'webNavigation.onReferenceFragmentUpdated': get(
    () => chrome.webNavigation.onReferenceFragmentUpdated
  ),
  'webNavigation.onCommitted': get(() => chrome.webNavigation.onCommitted),
  'webNavigation.onCompleted': get(() => chrome.webNavigation.onCompleted),
  'webNavigation.onBeforeNavigate': get(
    () => chrome.webNavigation.onBeforeNavigate
  ),

  // TODO: this will need special handling ...
  // need to return true here?  using sendResponse ?
  // https://developer.get(() => chrome.com/apps/runtime#event-onMessag)e
  // Important: On Firefox, don't return a Promise directly (e.g. async
  // function) else other listeners do not get run!!
  // See: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage
  'runtime.onMessage': get(() => chrome.runtime.onMessage),

  'runtime.onInstalled': get(() => chrome.runtime.onInstalled)
}

type EventsType = typeof EVENTS
type EventsKey = keyof EventsType

type ChromeEvent<T> = T extends chrome.events.Event<infer P>
  ? P extends (...args: any) => any
    ? Parameters<P>
    : never
  : never

type EventParams<K extends EventsKey> = ChromeEvent<EventsType[K]>

type Func = (...args: any) => any

@injectable()
export class BackgroundEvents extends EventEmitter {
  /**
   * Problem
   *
   * In manifest version 3, service workers require all event listeners to be bound
   * in the same "tick" when the background page module is instantiated. Top level
   * here is in the same sense as `async await` top level functions.
   *
   * Why do they do this? It's because they (I assume synchronously??) start a worker
   * if none is already active and then dispatch it an event. If you construct the
   * object graph of your background page service asynchronously and some listeners
   * are bound too late they will not catch the event that was dispatched.
   *
   * Above I parenthetically pointed out my assumption that the workers are
   * synchronously started and then an event is dispatched. Is this really the case?
   * Wouldn't loading the background script from a crx or cache be an operation that
   * is done asynchronously. If so, why not add an api to mark the background as
   * ready to service events?
   *
   * What about runtime.oninstall ?
   *
   * When is the oninstall event dispatched ?
   * It seems to happen quite some time after install and background service
   * instantiation.
   *
   * Solution[s]
   *
   * 1. Buffer the events
   *
   *     A potential problem with this though is that you would need to keep track
   *     of the listeners so if you had say, 3, buffered events (unlikely but
   *     perhaps possible) that you emitted the events in order and loop through
   *     the listeners for each event. It wouldn't do to just execute the listener
   *     upon binding.
   */

  /**
   * Buffer all events together in order, with a key.
   */
  buffered: Array<{ key: string; params: unknown[] }> = []
  /**
   * Remove all the buffering listeners before emitting the buffered events
   */
  bufferingCleanup: Array<Func> = []

  /**
   *
   */
  events = Object.keys(EVENTS).map(key => ({
    key,
    event: this.lookupEventFromInjectedApi(key as EventsKey)
  }))

  constructor(
    @inject(WextApi)
    private api: typeof chrome
  ) {
    super()
  }

  bindBufferingListeners() {
    this.events.forEach(({ key, event }) => {
      if (!event) {
        return
      }
      const bufferingListener = (...params: unknown[]) => {
        this.buffered.push({ key, params })
      }
      event.addListener(bufferingListener)
      this.bufferingCleanup.push(() => event.removeListener(bufferingListener))
    })
  }

  emitBufferedAndStopBuffering() {
    // Unbind buffering listeners
    this.bufferingCleanup.forEach(c => c())

    const buffered = this.buffered
    // Clean up references
    this.buffered = []

    // Bind proxying listeners
    this.events.forEach(({ key, event }) => {
      event?.addListener((...params: unknown[]) => {
        this.emit(key, ...params)
      })
    })

    // Emit the buffered events
    buffered.forEach(event => {
      // Hopefully we can get away with emitting them synchronously like this.
      // If we have to queue each emission as a micro task, then it's possible
      // that other (non-buffered) events would come in, and then the events
      // would be handled out of order.
      this.emit(event.key, ...event.params)
    })
  }

  on<T extends EventsKey>(
    event: T,
    listener: (...args: EventParams<T>) => void
  ): this {
    return super.on(event, listener as Func)
  }

  once<T extends EventsKey>(
    event: T,
    listener: (...args: EventParams<T>) => void
  ): this {
    return super.once(event, listener as Func)
  }

  private lookupEventFromInjectedApi(
    key: EventsKey
  ): chrome.events.Event<any> | undefined {
    let api = this.api as any
    const split = key.split('.')
    while (split.length) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      api = api[split.shift()!]
      if (api === undefined) {
        break
      }
    }
    return api
  }
}
