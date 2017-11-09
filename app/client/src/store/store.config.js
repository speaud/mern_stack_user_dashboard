import { createStore, applyMiddleware, compose } from 'redux'
import { loadState, saveState } from './store.state.js';
import { createLogger } from 'redux-logger'
import { IS_PRODUCTION } from '../constants'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import DevTools from '../containers/DevTools'

const persistedState = loadState()
const middlewares = [ thunk ]

if (!IS_PRODUCTION) {
  // Only include the createLogger method if developing locally
  middlewares.push(createLogger())
}

const storeConfig = () => {
  const store = createStore(
    rootReducer,
    persistedState,
    compose(
      applyMiddleware(...middlewares),
      DevTools.instrument() // This is excluded if IS_PRODUCTION, logic contained in ../components/App.js
    )
  )
  
	store.subscribe(() => {
    saveState(store.getState());
	});  

  if (module.hot) {
    // Enable Webpack HMR for reducers
    module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers').default
        store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default storeConfig