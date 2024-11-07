import { Keyboard, TouchableWithoutFeedback } from 'react-native'
import type { TouchableNativeFeedbackProps } from 'react-native'

type KeyboardHandlerViewProps = TouchableNativeFeedbackProps & {
	keyboardHandlingEnabled?: boolean | undefined
}

function KeyboardHandlerView({ keyboardHandlingEnabled = true, children, ...props }: KeyboardHandlerViewProps) {
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
