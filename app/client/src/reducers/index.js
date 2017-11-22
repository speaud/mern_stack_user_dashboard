import { combineReducers } from 'redux'
import User from './User.js'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  User,
  // you have to pass formReducer under 'form' key,
  // for custom keys look up the docs for 'getFormState'
  form: formReducer 
})

export default rootReducer
