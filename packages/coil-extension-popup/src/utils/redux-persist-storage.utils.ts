// Currently uses sessionStorage to persist through session
//? Move it to localStorage if we're using tip history?
//? Configure to only persist specific state?
import { IRootState } from '@coil/extension-popup/redux/models'
const storageKey = 'ReduxStorageKey'

export const loadStateFromSessionStorage = (): IRootState | undefined => {
  try {
    const serializedState = sessionStorage.getItem(storageKey)
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    // do nothing
    console.log(err)
    return undefined
  }
}

// remove some items, and JSON.stringify the ...rest and save it
export const saveStateToSessionStorage = (props: IRootState): void => {
  try {
    // const { publicKey, ...rest } = props;
    const serializedState = JSON.stringify({
      ...props
    })
    sessionStorage.setItem(storageKey, serializedState)
  } catch (err) {
    // do nothing
    console.log(err)
  }
}

export const loadStateFromLocalStorage = (): IRootState | undefined => {
  try {
    const serializedState = localStorage.getItem(storageKey)
    if (!serializedState) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    // do nothing
    console.log(err)
    return undefined
  }
}

// remove some items, and JSON.stringify the ...rest and save it
export const saveStateToLocalStorage = (props: IRootState): void => {
  try {
    // const { publicKey, ...rest } = props;
    const serializedState = JSON.stringify({
      ...props
    })
    localStorage.setItem(storageKey, serializedState)
  } catch (err) {
    // do nothing
    console.log(err)
  }
}
