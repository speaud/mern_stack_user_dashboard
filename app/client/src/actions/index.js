import axios from 'axios'
import bcrypt from 'bcrypt-nodejs'

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





export const testApi = () => dispatch => {
    axios.get('/api/test')
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
};

// TODO: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

export const testUserPost = (obj) => dispatch => {
    axios.post('/api/user', {
        first_name: obj.firstName,
        last_name: obj.lastName,
        email: obj.email
    })

    //axios.post('/api/user', obj)    


    .then((res) => {
        console.log(res.data);
    })
    .catch((err) => {
        console.log(res);
    });
};


export const checkUsername = obj => dispatch => {
    console.log("---checkUsername---")
    axios.get('/api/users/validate/' + obj.username)
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(res);
        });    
}

export const userSignUp = obj => dispatch => {
    console.log("---userSignUp---")
    
    // Store hash as password
    bcrypt.hash(obj.password, null, null, (err, hash) => {
        obj.password = hash

        axios.post('/api/signup', obj)
            
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(res);
            });        
    });
};


export const userLogIn = obj => dispatch => {
    console.log("---userLogIn---")
    axios.get('/api/login', {
            params: {
                username: obj.username,
                password: obj.password
            }
        })                          
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(res);
        });  


// Load hash from your password DB.
//bcrypt.compare(user, hash, function(err, res) {
//    // res == true
//});

//    bcrypt.hash(obj.password, null, null, (err, hash) => {
//
//        obj.password = hash
//        
//        //console.dir(obj)
//
//
//        axios.post('/api/signup', obj)
//            
//            .then((res) => {
//                console.log(res.data);
//            })
//            .catch((err) => {
//                console.log(res);
//            });        
//    });
};

//export const queryAction = (arg) => dispatch => {
//    dispatch({
//        type: REQUEST_QUERY_SOURCE
//    });
//
//    dispatch({
//        type: RECEIVE_QUERY_SOURCE,
//        payload: arg
//    });
//};
//
//
//export const resetQuery = (arg) => dispatch => {
//    dispatch({
//        type: REQUEST_QUERY_RESET
//    });
//
//    dispatch({
//        type: RECEIVE_QUERY_RESET
//    });
//};
//
//export const limitQuery = (arg) => dispatch => {
//    console.log("limitQuery")
//
//    dispatch({
//        type: REQUEST_QUERY_LIMIT
//    });
//
//    dispatch({
//        type: RECEIVE_QUERY_LIMIT,
//        payload: arg
//    });    
//};
//
//export const searchQuery = (arg) => dispatch => {
//    console.log("searchQuery")
//
//    dispatch({
//        type: REQUEST_QUERY_SEARCH
//    });
//
//    dispatch({
//        type: RECEIVE_QUERY_SEARCH,
//        payload: arg
//    });
//
//    if (arg.length > 3) {
//
//        dispatch(runQuery(arg))
//
//    } else {
//        dispatch({
//            type: RECEIVE_QUERY_RESULTS,
//            payload: []
//        });        
//    }
//};
//
//export const runQuery = (arg) => dispatch => {
//    console.log("runQuery arg = ", arg)
//    dispatch({
//        type: REQUEST_QUERY_RESULTS
//    });
//
//    return fetch(`https://www.reddit.com/r/${arg}.json`)
//        .then(response => response.json())
//        .then(json => {
//            //console.dir(json)
//
//            dispatch(recieveQueryResults(json))
//        })
//            
//};
//
//export const recieveQueryResults = (json) => dispatch => {
//    dispatch({
//        type: RECEIVE_QUERY_RESULTS,
//        payload: json.data.children.map(child => child.data)
//    });
//};