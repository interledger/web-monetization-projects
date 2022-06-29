/*
 * Clients:
 *
 * - Background Page
 * - Popup
 *     Will need to set some popup only state like
 *       maybe the background could set these too
 *     probably should use a unidirectional data flow
 *
 * */
export class Store {
  /**
   * With this we can just use a plain data object
   */
  makeProxy<T>(): T {
    return {} as T
  }
}

export class PopupState {}
