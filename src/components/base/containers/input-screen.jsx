import PropTypes from 'prop-types'
import { useRef } from 'react'
import { KeyboardAvoidingView, View, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useScrollToTop } from '@react-navigation/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function InputScreen({ children, ...props }) {
	const insets = useSafeAreaInsets()
	const ref = useRef(null)
	useScrollToTop(ref)

	return (
		<ScrollView
			contentContainerStyle={{
				minHeight: '100%',
				paddingTop: insets.top,
			}}
			keyboardShouldPersistTaps='handled'
			ref={ref}
		>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View {...props}>{children}</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
			{children}
		</ScrollView>
	)
}

InputScreen.propTypes = {
	children: PropTypes.node,
}
