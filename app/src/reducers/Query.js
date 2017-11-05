import {
  FSA_META_REQUEST,
  FSA_META_RECEIVE,

  REQUEST_QUERY_SOURCE,
  RECEIVE_QUERY_SOURCE,

  REQUEST_QUERY_LIMIT,
  RECEIVE_QUERY_LIMIT,

  REQUEST_QUERY_SEARCH,
  RECEIVE_QUERY_SEARCH,

  REQUEST_QUERY_RESULTS,
  RECEIVE_QUERY_RESULTS,

  REQUEST_QUERY_RESET,
  RECEIVE_QUERY_RESET
} from '../constants/index.js';

const initialState = {
  meta: null,
  source: '',
  results: [],
  search: '',
  limit: ''
}

const Query = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_QUERY_SOURCE:
    case REQUEST_QUERY_LIMIT:
    case REQUEST_QUERY_SEARCH:
    case REQUEST_QUERY_RESULTS:
    case REQUEST_QUERY_RESET:
      return {
        ...state,
        meta: FSA_META_REQUEST
      }

    case RECEIVE_QUERY_SOURCE:
      return {
        ...state,
        source: action.payload,
        meta: FSA_META_RECEIVE
      }

    case RECEIVE_QUERY_LIMIT:
      return {
        ...state,
        limit: action.payload,
        meta: FSA_META_RECEIVE
      }      

    case RECEIVE_QUERY_SEARCH:
      return {
        ...state,
        search: action.payload,
        meta: FSA_META_RECEIVE
      }


    case RECEIVE_QUERY_RESULTS:
      return {
        ...state,
        results: action.payload,
        meta: FSA_META_RECEIVE
      }

    case RECEIVE_QUERY_RESET:
      return {
        ...initialState,
        meta: FSA_META_RECEIVE
      }

    default:
      return state
  }
}

export default Query;