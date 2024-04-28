import { TextInput, type TextInputProps } from 'react-native'

type BaseTextInputProps = TextInputProps & {
	/** label placeholder text */
	label?: string | undefined

	/** If true, this prop forces the label to remain in it's `focused` position. */
	forceLabelActive?: boolean | undefined

	/** Help text to display. */
	helpText?: string | undefined

	/** Error text to display. */
	errorText?: string | undefined

	/** Indicates field error state. */
	isError?: boolean | undefined

	/** If true the component will indicate that an error exists. */
	forceError?: boolean | undefined

	/** Indicates loading state. */
	isLoading?: boolean | undefined

	/** indicates field validity state. */
	isValid?: boolean | undefined

	/** Time in seconds to wait before the text input ref is focused. Requries the `autoFocus` prop to be set true. */
	autoFocusDelay?: number | undefined

	/** The className of the outer most view. */
	containerClassName?: string | undefined
}

type BaseTextInputRef = typeof TextInput & TextInput & HTMLInputElement

export default BaseTextInputProps

export type { BaseTextInputProps, BaseTextInputRef }
