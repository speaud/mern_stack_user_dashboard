exports.formatJson = {
	response: (valid, payload) => {
		let response = {}

		if (valid) {
			response.data = payload;
		} else {
			response.error = payload
		}

		return response
	}
}