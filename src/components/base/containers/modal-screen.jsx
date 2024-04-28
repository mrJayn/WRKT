import { TouchableWithoutFeedback, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native'

import PropTypes from 'prop-types'
import { styled } from 'nativewind'
import { BlurView } from 'expo-blur'
import { FadeIn, FadeOut } from 'react-native-reanimated'

const StyledView = styled(View, 'flex-1')

export default function ModalScreen({ navigation, children, ...props }) {
	const { goBack } = useNavigation()
	return (
		<TouchableWithoutFeedback onPress={goBack}>
			<View
				style={{ flex: 1 }}
				className='justify-end'
			>
				<View className='flex-[0.66] rounded-t-3xl overflow-hidden bg-secondary-light dark:bg-secondary-dark'>
					<StyledView {...props}>{children}</StyledView>
				</View>
			</View>
		</TouchableWithoutFeedback>
	)
}

ModalScreen.propTypes = {
	children: PropTypes.node,
}
