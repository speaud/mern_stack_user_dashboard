import {
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
} from '../constants'

export const queryAction = (arg) => dispatch => {
    dispatch({
        type: REQUEST_QUERY_SOURCE
    });

    dispatch({
        type: RECEIVE_QUERY_SOURCE,
        payload: arg
    });
};


export const resetQuery = (arg) => dispatch => {
    dispatch({
        type: REQUEST_QUERY_RESET
    });

    dispatch({
        type: RECEIVE_QUERY_RESET
    });
};

export const limitQuery = (arg) => dispatch => {
    console.log("limitQuery")

    dispatch({
        type: REQUEST_QUERY_LIMIT
    });

    dispatch({
        type: RECEIVE_QUERY_LIMIT,
        payload: arg
    });    
};

export const searchQuery = (arg) => dispatch => {
    console.log("searchQuery")

    dispatch({
        type: REQUEST_QUERY_SEARCH
    });

    dispatch({
        type: RECEIVE_QUERY_SEARCH,
        payload: arg
    });

    if (arg.length > 3) {

        dispatch(runQuery(arg))

    } else {
        dispatch({
            type: RECEIVE_QUERY_RESULTS,
            payload: []
        });        
    }
};

export const runQuery = (arg) => dispatch => {
    console.log("runQuery arg = ", arg)
    dispatch({
        type: REQUEST_QUERY_RESULTS
    });

    return fetch(`https://www.reddit.com/r/${arg}.json`)
        .then(response => response.json())
        .then(json => {
            //console.dir(json)

            dispatch(recieveQueryResults(json))
        })
            
};

export const recieveQueryResults = (json) => dispatch => {
    dispatch({
        type: RECEIVE_QUERY_RESULTS,
        payload: json.data.children.map(child => child.data)
    });
};