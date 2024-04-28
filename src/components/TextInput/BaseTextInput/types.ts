import { TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native'

/* 
type CrossPlatform_AutoComplete =
	| 'additional-name'
	| 'address-line1'
	| 'address-line2'
	| 'cc-number'
	| 'country'
	| 'current-password'
	| 'email'
	| 'family-name'
	| 'given-name'
	| 'honorific-prefix'
	| 'honorific-suffix'
	| 'name'
	| 'new-password'
	| 'off'
	| 'one-time-code'
	| 'postal-code'
	| 'street-address'
	| 'tel'
	| 'username'

type CrossPlatform_KeyboardType =
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url"
*/

type BaseTextInputProps = TextInputProps & {
	/** label placeholder text */
	label?: string | undefined

	/** If true, this prop forces the label to remain in it's `focused` position. */
	forceLabelActive?: boolean | undefined

	/** Indicates field error state. */
	isError?: boolean | undefined

	/** Indicates loading state. */
	isLoading?: boolean | undefined

	/** indicates field validity state. */
	isValid?: boolean | undefined

	/** Time in seconds to wait before the text input ref is focused. Requries the `autoFocus` prop to be set true. */
	autoFocusDelay?: number | undefined

	/** The `className` prop of the component's container view. */
	containerClassName?: string | undefined

	/** The `style` prop of the component's container view. */
	containerStyle?: StyleProp<ViewStyle>
}

type BaseTextInputRef = typeof TextInput & TextInput & HTMLInputElement

export type { BaseTextInputProps, BaseTextInputRef }
