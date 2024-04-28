import type { TextInputProps } from 'react-native'

type AutoComplete = TextInputProps['autoComplete']

type TextContentType = TextInputProps['textContentType']

type GetAutoCompleteContentTypeProps = (
	autoComplete: AutoComplete,
	textContentType: TextContentType,
	secureTextEntry: boolean
) => {
	autoCompleteValue?: AutoComplete
	textContentTypeValue?: TextContentType
}

export default GetAutoCompleteContentTypeProps
