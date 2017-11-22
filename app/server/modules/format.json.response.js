exports.formatJson = {
	response: (status, data, message) => {
		let response = {
			success: (typeof status === 'boolean' || status === null) ? status : null,
			data: (data && typeof data === 'object') ? data : null, // has owns keys/props
			message: (typeof message === 'string') ? message : null
		}

		return response
	}
} 

//module.exports = {
//
//	formatJsonResponse: (status, data, message) => {
//		let response = {
//			success: (typeof status === 'boolean' || status === null) ? status : null,
//			data: (data && typeof data === 'object') ? data : null, // has owns keys/props
//			message: (typeof message === 'string') ? message : null
//		}
//
//		return response
//	}
//
//}

//console.log(formatJsonResponse(null, {a: 1}, "aaaa"))
//export const formatResponse = (boolean, object, message, code) => {
//	let response = {};
//	switch (boolean) {
//		case true:
//
//			response.status = "success"
//			response.data = object
//
//			break;
//		
//		case false:
//
//			response.status = "fail"
//			if (_.isObject(object)) {
//				response.data = object
//			} else {
//				response.data = null
//			}
//
//			break;
//		
//		default:
//			
//			response.status = "error"
//			if (_.isObject(object)) {
//				response.data = object
//			} else {
//				response.data = null
//			}			
//			response.message = message
//			response.code = code
//
//			break;
//	}
//
//	return response
//}
//