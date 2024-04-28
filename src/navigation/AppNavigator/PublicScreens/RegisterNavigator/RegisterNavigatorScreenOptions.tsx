import { StackNavigationOptions, StackScreenProps } from '@react-navigation/stack'
import type { RegisterStackParamList } from '@navigation/types'
import { colors } from '@colors'
import { backImageStyle } from '@components/HeaderBackButton'
import defaultScreenOptions, { defaultTextStyle } from '@navigation/AppNavigator/defaultScreenOptions'
import transitions from '@navigation/transitions'

const registerNavigatorScreenOptions = ({
	navigation,
	route,
}: StackScreenProps<RegisterStackParamList, keyof RegisterStackParamList>): StackNavigationOptions => {
	const { index } = navigation.getState()
	const backTitle = `Step ${index + 1} of 3`
	// const screenTitle = route.name.replace('Register_', '').replaceAll('_', ' ')

	return {
		...defaultScreenOptions,
		//
		headerBackTitleVisible: true,
		headerBackTitle: backTitle,
		headerTruncatedBackTitle: backTitle,
		//
		headerPressOpacity: 1,
		keyboardHandlingEnabled: false,
		headerStyle: {
			height: 125,
		},
		headerTitleContainerStyle: {
			position: 'absolute',
			bottom: 0,
			left: backImageStyle.width * 3,
		},
		headerLeftContainerStyle: {
			justifyContent: 'flex-end',
			left: backImageStyle.width,
		},
		headerBackTitleStyle: {
			...defaultTextStyle,
			position: 'absolute',
			bottom: 5,
			marginLeft: 1 + backImageStyle.width,
		},
		...transitions.slideLeft,
	}
}

export default registerNavigatorScreenOptions
