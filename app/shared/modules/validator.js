// TODO: return custom messages so we don't have to repeat them
// TODO: check email and username to be unique
const validator = {
	fullName (str) {
		return /^([a-zA-Z]){2,25}\s([a-zA-Z]){2,25}/i.test(str)
	},
	email (str) {
		return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str)
	},
	username (str) {
		if (
			str.length >= 8
			&& /^[a-zA-Z0-9]{8,25}/i.test(str)
		) {
			return true
		}
	},
	password (str) {
		if (
			str.length >= 8 // Must conatin at least eight charaters
			&& /[0-9]/i.test(str) // Must contain at least one number
			&& /[a-z]/i.test(str) // Must contain at least one lower-case letter
			&& /[A-Z]/i.test(str) // Must contain at least one upper-case letter
			&& /[\!\@\#\$\%\^\&\*\(\)\-\_\+\=\{\}\[\]:;<>.?\/]/i.test(str) // Must contain at least special character (i.e., !,@,#,$,%,^,&,*,etc.)
		) {
			return true
		}
	}
}

export default validator