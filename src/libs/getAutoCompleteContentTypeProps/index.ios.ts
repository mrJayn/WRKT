import type GetAutoCompleteContentTypeProps from './types'

/**
 * on IOS
 *
 * Returns props with a key `textContentType` and a value of "oneTimeCode"
 * for secure text entries, otherwise a value of `props.textContentType`.
 */

const getAutoCompleteContentTypeProps: GetAutoCompleteContentTypeProps = (
	autoComplete,
	textContentType,
	secureTextEntry
) => ({
	autoCompleteValue: textContentType !== undefined ? undefined : secureTextEntry ? 'off' : autoComplete,
	textContentTypeValue: secureTextEntry ? 'oneTimeCode' : textContentType,
})

export default getAutoCompleteContentTypeProps
