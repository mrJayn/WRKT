import type GetAutoCompleteContentTypeProps from './types'

/**
 * on Web/Desktop/Android
 *
 * Returns props with a key `autoComplete` and a value of "off"
 * for secure text entries, otherwise a value of `props.autoComplete`.
 */

const getAutoCompleteContentTypeProps: GetAutoCompleteContentTypeProps = (
	autoComplete,
	textContentType,
	secureTextEntry
) => ({
	autoCompleteValue: secureTextEntry ? 'off' : autoComplete,
	textContentTypeValue: undefined,
})

export default getAutoCompleteContentTypeProps
