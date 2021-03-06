import { createStore, applyMiddleware, combineReducers, compose } from "redux"
import {
  batchActions,
  enableBatching,
  batchDispatchMiddleware,
} from "redux-batched-actions"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"

import reducer from "./reducers/index"

// preloadedState will be passed in by the plugin
export default preloadedState => {
  return createStore(reducer, preloadedState, composeWithDevTools())
}
