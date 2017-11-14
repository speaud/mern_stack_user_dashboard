//const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
//
//const asyncValidate = (values /*, dispatch */) => {
//  return sleep(1000).then(() => {
//    // simulate server latency
//    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
//      // eslint-disable-next-line no-throw-literal
//      throw { email: 'Email already Exists' }
//    }
//  })
//}
//
//export default asyncValidate

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /*, dispatch */) => {
  return sleep(100).then(() => {
  	console.log("---asyncValidate")
    // simulate server latency
    if (['john', 'paul', 'george', 'ringo', 'johnnnnnn'].includes(values.username)) {
      throw { username: 'That username is taken' }
    }

    if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
      throw { email: 'That email is taken' }
    }    
  })




}

export default asyncValidate