import { createStackNavigator } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import NAVIGATORS from '@src/NAVIGATORS'
import defaultScreenOptions from '@navigation/AppNavigator/defaultScreenOptions'
import transitions from '@navigation/transitions'
import type { PublicStackParamList } from '@navigation/types'
//
import LandingScreen from '@screens/public/LandingScreen'
import LoginScreen from '@screens/public/LoginScreen'
import ForgotPasswordScreen from '@screens/public/ForgotPasswordScreen'
import RegisterNavigator from './RegisterNavigator'

const PublicStack = createStackNavigator<PublicStackParamList>()

const PublicScreens = () => {
	return (
		<PublicStack.Navigator
			screenOptions={{
				...defaultScreenOptions,
				headerShown: false,
			}}
		>
			<PublicStack.Screen
				name={NAVIGATORS.TABS_NAVIGATOR}
				component={LandingScreen}
			/>
			<PublicStack.Screen
				name={NAVIGATORS.REGISTER_NAVIGATOR}
				component={RegisterNavigator}
			/>
			<PublicStack.Screen
				navigationKey={SCREENS.LOGIN}
				name={SCREENS.LOGIN}
				component={LoginScreen}
				options={{ ...transitions.slideUp }}
			/>
			<PublicStack.Screen
				name={SCREENS.FORGOT_PASSWORD}
				component={ForgotPasswordScreen}
				options={{
					title: 'Reset Password',
					headerShown: true,
				}}
			/>
		</PublicStack.Navigator>
	)
}

export default PublicScreens
