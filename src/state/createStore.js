import { createStore, combineReducers } from "redux"
import reducer from "./reducers/index"

// preloadedState will be passed in by the plugin
export default preloadedState => {
  return createStore(reducer, preloadedState)
}
