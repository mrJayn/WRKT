import React from 'react'
import { Keyboard, TouchableWithoutFeedback, TouchableNativeFeedbackProps } from 'react-native'

export type KeyboardHandlerViewProps = TouchableNativeFeedbackProps & {
	keyboardHandlingEnabled?: boolean | undefined
}

function KeyboardHandlerView({ keyboardHandlingEnabled = false, children, ...props }: KeyboardHandlerViewProps) {
	return (
		<TouchableWithoutFeedback
			{...props}
			accessible={false}
			onPress={keyboardHandlingEnabled ? Keyboard.dismiss : undefined}
		>
			{children}
		</TouchableWithoutFeedback>
	)
}

KeyboardHandlerView.displayName = 'KeyboardHandlerView'

export default KeyboardHandlerView
