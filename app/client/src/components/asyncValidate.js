import axios from 'axios'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


function checkUsername(username) {
  return axios.get('/api/users/check/username/' + username)
}
 
function checkEmail(email) {
  return axios.get('/api/user/check/email/' + email)
}


const checkUniqueKeyValue = (key, value) => {
	return axios.get('/api/user/check/' + key + '/' + value) 
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


//	return axios.all([checkUsername(values.username), checkEmail(values.email)])
//	  	.then(axios.spread(function (checkUsernameRes, checkEmailRes) {
//		    
//		    
//		    if (!checkUsernameRes.data.unique) {
//		  		throw { username: 'That username is already taken' }  	
//		    } else {
//		    	console.log("asyncValidate - username OK")
//		    }
//
//		    if (!checkEmailRes.data.unique) {
//		  		throw { email: 'That email is already in use' }  	
//		    } else {
//		    	console.log("asyncValidate - email OK")
//		    }		    
//
//
//	  	}));




//    return axios.get('/api/user/validate/' + values.username)
//        .then((res) => {
//            console.log(res.data);
//
//            if (!res.data.unique) {
//          		throw { username: 'That username is already taken' }  	
//            }
//
//        })
        //.catch((err) => {
        //    console.log(res);
        //});




  //return sleep(100).then(() => {
//  //	console.log("---asyncValidate")
//  //  // simulate server latency
//  //  if (['john', 'paul', 'george', 'ringo', 'johnnnnnn'].includes(values.username)) {
//  //    throw { username: 'That username is taken' }
//  //  }
//
  //  if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
  //    throw { email: 'That email is taken' }
  //  }    
  //})









}

export default asyncValidate