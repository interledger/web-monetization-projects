type DefaultView = WindowProxy & typeof globalThis
type CloneInto = (obj: unknown, window: DefaultView | null) => typeof obj
declare const cloneInto: CloneInto | undefined

let cloneIntoRef: CloneInto | undefined
try {
  cloneIntoRef = cloneInto
} catch (e) {
  cloneIntoRef = undefined
}

export const mozCloneInto = cloneIntoRef
