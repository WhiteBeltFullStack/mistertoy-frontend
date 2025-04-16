import { todoReducer } from './reducers/todo.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

import { createStore, compose, combineReducers } from 'redux'

const rootReducer = combineReducers({
 todoModule:todoReducer,
  userModule:userReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())


console.log('store.getState():',store.getState())
// * For Debugging
window.gStore = store
