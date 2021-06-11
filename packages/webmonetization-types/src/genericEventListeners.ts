export interface TEventListener<T extends Event = Event> {
  (evt: T): void
}

export interface TEventListenerObject<T extends Event = Event> {
  handleEvent(evt: T): void
}

export type TEventListenerOrListenerObject<T extends Event = Event> =
  | TEventListener<T>
  | TEventListenerObject<T>
