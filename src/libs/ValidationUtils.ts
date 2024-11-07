import { addYears, isAfter, isBefore, isValid, startOfDay, subYears } from 'date-fns'
import { debounce } from 'lodash'
import CONST from '@src/CONST'

/**
 * Validate date fields
 */
function isValidDate(date: string | Date): boolean {
	if (!date) {
		return false
	}

	const pastDate = subYears(new Date(), 1000)
	const futureDate = addYears(new Date(), 1000)
	const testDate = new Date(date)
	return isValid(testDate) && isAfter(testDate, pastDate) && isBefore(testDate, futureDate)
}

/**
 * Validate that date entered isn't a future date.
 */
function isValidPastDate(date: string | Date): boolean {
	if (!date) {
		return false
	}
	const pastDate = subYears(new Date(), 1000)
	const currentDate = new Date()
	const testDate = startOfDay(new Date(date))
	return isValid(testDate) && isAfter(testDate, pastDate) && isBefore(testDate, currentDate)
}

/**
 * Checks that the provided name doesn't contain any commas or semicolons
 */
function isValidUsername(name: string): boolean {
	return !name.includes(',') && !name.includes(';')
}

/**
 * Checks that the provided legal name doesn't contain special characters
 */
function isValidLegalName(name: string): boolean {
	const hasAccentedChars = Boolean(name.match(CONST.REGEX.ACCENT_LATIN_CHARS))
	return CONST.REGEX.ALPHABETIC_AND_LATIN_CHARS.test(name) && !hasAccentedChars
}

/**
 * Checks that the provided name doesn't contain special characters or numbers
 */
function isValidPersonName(value: string) {
	return /^[^\d^!#$%*=<>;{}"]+$/.test(value)
}

/**
 * Checks if the provided string includes any of the provided reserved words
 */
// function doesContainReservedWord(value: string, reservedWords: string[]): boolean {
// 	const valueToCheck = value.trim().toLowerCase()
// 	return reservedWords.some((reservedWord) => valueToCheck.includes(reservedWord.toLowerCase()))
// }

// const validateUniqueWithDebounce = debounce(validateUnique, 500, { leading: true })

/**
 * Method to check if a user attribute is unique among all users.
 */
// async function isUserFieldUnique(field: string, value: string) {
// 	return Boolean(await validateUniqueWithDebounce(field, value))
// }

export {
	isValidDate,
	isValidPastDate,
	isValidUsername,
	isValidLegalName,
	isValidPersonName,
	//
}
