import { KeyboardAvoidingViewProps, Platform, KeyboardAvoidingView as RNKeyboardAvoidingView, ViewProps } from 'react-native'
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ChildrenProps } from '@src/types/utils'

function _KeyboardAvoidingView({ children }: ChildrenProps) {
	const insets = useSafeAreaInsets()
	const keyboard = useAnimatedKeyboard()

	const avoidKeyboardStyle = useAnimatedStyle(() => {
		let lowerMax = keyboard.height.value + 50,
			lowerMin = keyboard.height.value - insets.bottom

		return { paddingBottom: Math.max(0, Math.min(lowerMax, lowerMin)) }
	})

	return <Animated.View style={[{ flex: 1 }, avoidKeyboardStyle]}>{children}</Animated.View>
}

interface Props extends ViewProps {
	enabled?: boolean
	offset?: number
}

function KeyboardAvoidingView({ enabled, offset, style, children, ...props }: Props) {
	const behaivor = Platform.OS === 'ios' ? 'padding' : 'height'

	return (
		<RNKeyboardAvoidingView
			behavior={behaivor}
			enabled={enabled}
			keyboardVerticalOffset={offset}
			style={[{ flex: 1 }, style]}
			{...props}
		>
			{children}
		</RNKeyboardAvoidingView>
	)
}

export default KeyboardAvoidingView
