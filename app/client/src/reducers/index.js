import { combineReducers } from 'redux'
import Query from './Query.js'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  Query,
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer 
})

export default rootReducer
