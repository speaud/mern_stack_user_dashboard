import {
  FSA_META_REQUEST,
  FSA_META_RECEIVE,

  REQUEST_USER_LOGIN,
  RECEIVE_USER_LOGIN
} from '../constants/index.js';

const User = (state = {}, action) => {
  switch (action.type) {
    
    case REQUEST_USER_LOGIN:
      return {
        ...state,
        meta: FSA_META_REQUEST
      }

    case RECEIVE_USER_LOGIN:
      return {
        ...state,
        ...action.payload
        //meta: FSA_META_RECEIVE
      }      

    default:
      return state
  }
}

export default User;