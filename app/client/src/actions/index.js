import axios from 'axios'
import bcrypt from 'bcrypt-nodejs'

import {
    REQUEST_USER_LOGIN,
    RECEIVE_USER_LOGIN    
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
    //bcrypt.hash(obj.password, null, null, (err, hash) => {
        //obj.password = hash

        axios.post('/api/signup', obj)
            
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(res);
            });        
    //});
};


export const userLogIn = obj => dispatch => {
    dispatch({
        type: REQUEST_USER_LOGIN
    });

    axios.get('/api/login', {
            params: {
                username: obj.username,
                password: obj.password
            }
        })                          
        .then((res) => {
            dispatch({
                type: RECEIVE_USER_LOGIN,
                payload: res.data.data
            });
        })
        .catch((err) => {
            // TODO: handle userLogIn action err
            console.log(res);
        });  
};