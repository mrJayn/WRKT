import CONST from '@src/CONST'
import { parsePhoneNumber } from 'libphonenumber-js'

let countryCodeByIP = 1

/**
 * Append user country code to the phone number
 */
function appendCountryCode(phone: string): string {
	return phone.startsWith('+') ? phone : `+${countryCodeByIP}${phone}`
}

/**
 * Check number is valid and attach country code
 * @returns a valid phone number with country code
 */
function getPhoneLogin(phone: string): string {
	if (phone.length === 0) {
		return ''
	}
	const significantPhoneNumber = phone.replace(CONST.REGEX.SPECIAL_CHARS_WITHOUT_NEWLINE, '')
	return appendCountryCode(significantPhoneNumber)
}

export { appendCountryCode, getPhoneLogin }
