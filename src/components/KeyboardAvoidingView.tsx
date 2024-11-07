import type { ViewProps } from 'react-native'
import { Platform } from 'react-native'
import { KeyboardAvoidingView as RNKeyboardAvoidingView } from 'react-native'

type KeyboardAvoidingViewProps = ViewProps & {
	/** The distance between the top of the device screen and the RN view.*/
	keyboardVerticalOffset?: number | undefined

	/** Enables or disables the KeyboardAvoidingView. */
	enabled?: boolean | undefined
}

function KeyboardAvoidingView({
	enabled = true,
	keyboardVerticalOffset = 0,
	style,
	children,
	...rest
}: KeyboardAvoidingViewProps) {
	const behaivor = Platform.OS === 'ios' ? 'padding' : 'height'

	return (
		<RNKeyboardAvoidingView
			behavior={behaivor}
			enabled={enabled}
			keyboardVerticalOffset={keyboardVerticalOffset}
			style={[{ flex: 1 }, style]}
			{...rest}
		>
			{children}
		</RNKeyboardAvoidingView>
	)
}

KeyboardAvoidingView.displayName = 'KeyboardAvoidingView'

export default KeyboardAvoidingView
