import axios from 'axios'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const checkUniqueKeyValue = (key, value) => {
	return axios.get('/api/users/check/' + key + '/' + value) 
}

const asyncValidate = (values /*, dispatch */) => {
	console.log("---asyncValidate\nvalues")
	console.dir(values)

	return axios.all([checkUniqueKeyValue('username', values.username), checkUniqueKeyValue('email', values.email)])
	  	.then(axios.spread(function (checkUsernameRes, checkEmailRes) {
		    
		    
		    if (!checkUsernameRes.data.unique) {
		  		throw { username: 'That username is already taken' }  	
		    } else {
		    	console.log("asyncValidate - username OK")
		    }

		    if (!checkEmailRes.data.unique) {
		  		throw { email: 'That email is already in use' }  	
		    } else {
		    	console.log("asyncValidate - email OK")
		    }		    


	  	}));
}

export default asyncValidate