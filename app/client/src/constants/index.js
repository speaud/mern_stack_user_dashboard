export const IS_PRODUCTION = (process.env.NODE_ENV == 'production') ? true : false;

// Define Flux Standard Action constants - https://github.com/acdlite/flux-standard-action

export const FSA_META_REQUEST = {
	fetching: true,
	fetched: false
};

export const FSA_META_RECEIVE = {
	fetching: false,
	fetched: true	
};

// Define action type constants

export const REQUEST_QUERY_SOURCE = 'REQUEST_QUERY_SOURCE'
export const RECEIVE_QUERY_SOURCE = 'RECEIVE_QUERY_SOURCE'

export const REQUEST_QUERY_LIMIT = 'REQUEST_QUERY_LIMIT'
export const RECEIVE_QUERY_LIMIT = 'RECEIVE_QUERY_LIMIT'

export const REQUEST_QUERY_SEARCH = 'REQUEST_QUERY_SEARCH'
export const RECEIVE_QUERY_SEARCH = 'RECEIVE_QUERY_SEARCH'

export const REQUEST_QUERY_RESULTS = 'REQUEST_QUERY_RESULTS'
export const RECEIVE_QUERY_RESULTS = 'RECEIVE_QUERY_RESULTS'

export const REQUEST_QUERY_UPDATE = 'REQUEST_QUERY_UPDATE'
export const RECEIVE_QUERY_UPDATE = 'RECEIVE_QUERY_UPDATE'

export const REQUEST_QUERY_RESET = 'REQUEST_QUERY_RESET'
export const RECEIVE_QUERY_RESET = 'RECEIVE_QUERY_RESET'