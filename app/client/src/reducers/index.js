import { combineReducers } from 'redux'
import User from './User.js'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  User,
  // You have to pass formReducer under 'form' key, or custom keys look up the docs for 'getFormState'
  form: formReducer
})

export default rootReducer
