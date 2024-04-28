import _ from 'lodash'
import * as yup from 'yup'
import CONST from '@src/CONST'

const messages = {
	/** generic messages */
	invalid: '${path} is invalid.',
	reserved: 'This ${path} cannot be used.',

	/** field specific messages */
	min: '${path} must be at least ${min} characters.',
	max: '${path} must be at most ${max} characters.',
	lowercase: '${path} must contain at least one lowercase letter.',
	uppercase: '${path} must contain at least one uppercase letter.',
	digit: '${path} must contain at least one digit.',

	/** custom messages */
	username: 'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.',
	email: 'Enter a valid email address.',
	emailOrPhone: 'Enter a valid email address or mobile phone number.',
}

const PASSWORD_ERRORS = {
	minLength: `Password must be at least ${CONST.PASSWORD.MIN_LENGTH} characters long.`,
	maxLength: `Password must be less than ${CONST.PASSWORD.MAX_LENGTH} characters long.`,
	uppercase: `Password must include at least one uppercase letter.`,
	lowercase: `Password must include at least one lowercase letter.`,
	number: `Password must include at least one number.`,
} as const

const isValidPhoneStr = (value: string | undefined) => {
	return yup.string().required().min(8).max(14).isValidSync(String(value))
}
const isValidEmail = (value: string | undefined) => {
	return yup.string().email().isValidSync(value)
}

const createPasswordError = (key: keyof typeof PASSWORD_ERRORS, value: string, path: string) => {
	return new yup.ValidationError(PASSWORD_ERRORS[key], value, path, key)
}

/**  .email_address()  */
yup.addMethod(yup.string, 'emailAddress', function () {
	return this.matches(CONST.REGEX.VALID_EMAIL, messages.email)
})

/**  .emailOrPhone()  */
yup.addMethod(yup.string, 'emailOrPhone', function () {
	return this.required().test('emailOrPhone', messages.emailOrPhone, (value) => {
		return isValidEmail(value) || isValidPhoneStr(value)
	})
})

/**  .password()  */
yup.addMethod(yup.string, 'password', function () {
	return this.required().test({
		name: 'password',
		test: (value, { path }) => {
			let errors = []

			if (value.length < CONST.PASSWORD.MIN_LENGTH) {
				// Too few characters.
				errors.push(createPasswordError('minLength', value, path))
			} else if (value.length > CONST.PASSWORD.MAX_LENGTH) {
				// Too many characters.
				errors.push(createPasswordError('maxLength', value, path))
			}

			if (!CONST.REGEX.LOWERCASE.test(value)) {
				// Missing at least 1 lowercase.
				errors.push(createPasswordError('lowercase', value, path))
			}

			if (!CONST.REGEX.UPPERCASE.test(value)) {
				// Missing at least 1 uppercase.
				errors.push(createPasswordError('uppercase', value, path))
			}

			if (!CONST.REGEX.NUMBER.test(value)) {
				// Missing at least 1 numbers.
				errors.push(createPasswordError('number', value, path))
			}

			if (errors.length === 0) {
				return true
			}
			return new yup.ValidationError(errors)
		},
	})
})

/**  .username()  */

type ReservedName = (typeof CONST.USERNAME.RESERVED_NAMES)[number]

yup.addMethod(yup.string, 'username', function () {
	return this.required()
		.max(CONST.USERNAME.MAX_LENGTH)
		.matches(CONST.REGEX.UNICODE_USERNAME, messages.username) //  re = /^[\w.@+-]+/
		.test('username', messages.reserved, (value) => {
			return !CONST.USERNAME.RESERVED_NAMES.includes(value as ReservedName)
		})
})

/*
if (value.length < CONST.PASSWORD.MIN_LENGTH) {
				errors.push(new yup.ValidationError(PASSWORD_ERRORS['minLength'], value, path, 'minLength'))
			}
			// contains at least 1 lowercase letter //
			if (!CONST.REGEX.LOWERCASE.test(value)) {
				errors.push(new yup.ValidationError(PASSWORD_ERRORS['lowercase'], value, path, 'lowercase'))
			}
			// contains at least 1 uppercase letter //
			if (!CONST.REGEX.UPPERCASE.test(value)) {
				errors.push(new yup.ValidationError(PASSWORD_ERRORS['uppercase'], value, path, 'uppercase'))
			}
			// contains at least 1 number //
			if (!CONST.REGEX.NUMBER.test(value)) {
				errors.push(new yup.ValidationError(PASSWORD_ERRORS['number'], value, path, 'number'))
			}
*/
/*

// mobile phone number //
	PhoneNumber: yup.string().test('phone_number', 'Enter a valid mobile phone number.', (value) => {
		console.log(`[ Validators - PhoneNumberField ] input="${value}"`)
		if (!value || !_.isString(value)) {
			return false
		}
		let phoneNumber = parsePhoneNumber(value, 'US')
		return phoneNumber.isValid()
	}),


// email -OR- phone number //
	EmailOrPhoneNumber: yup
		.string()
		.required()
		.test('email_or_phone', 'Invalid email address or mobile phone number.', (value) => {
			console.log('[ Validators - EmailOrPhoneNumber ] input= ', value)

			if (CONST.REGEX.VALID_EMAIL.test(value)) {
				return true
			}
			try {
				const phone = parsePhoneNumber(value, 'US')
				const phoneValid = phone.isValid()
				console.log('phone-valid? = ', phoneValid)
				return phoneValid
			} catch (e) {
				console.log('FAIL')
				let error = 'Invalid email address or mobile phone number.'
			}
		}),


		

*/
