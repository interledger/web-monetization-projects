import { createStore, applyMiddleware } from 'redux'
import {
  RootReducer
  // defaultState
} from '@coil/extension-popup/redux/reducer'
// import throttle from 'lodash.throttle'
// import { saveStateToSessionStorage, loadStateFromSessionStorage } from 'utils/redux-persist-storage.utils'
// import { saveStateToLocalStorage, loadStateFromLocalStorage } from 'utils/redux-persist-storage.utils';
import { composeWithDevTools } from 'redux-devtools-extension'

// persist store
// const stateFromSessionStorage = loadStateFromSessionStorage()
// const stateFromLocalStorage = loadStateFromLocalStorage();

// setup for Chrome debugging extension
const composeEnhancers = composeWithDevTools({})

// main store export
const store = createStore(
  RootReducer,
  // stateFromSessionStorage || defaultState,
  // stateFromLocalStorage || defaultState,
  composeEnhancers(applyMiddleware())
)

// when state changes, save to sessionStorage, throttle to only one save per second
// store.subscribe(
//     throttle(() => {
//         saveStateToSessionStorage(store.getState())
//         // saveStateToLocalStorage(store.getState());
//     }, 1000)
// )

// eslint-disable-next-line import/no-default-export
export default store
