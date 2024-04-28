import type GetSecureEntryKeyboardType from './types'

/**
 * Return visible-password keyboard type when secure text is visible on Android,
 * otherwise return keyboardType passed as function parameter
 */
const getSecureEntryKeyboardType: GetSecureEntryKeyboardType = (keyboardType, secureTextEntry, passwordHidden) =>
	secureTextEntry && !passwordHidden ? 'visible-password' : keyboardType

export default getSecureEntryKeyboardType
