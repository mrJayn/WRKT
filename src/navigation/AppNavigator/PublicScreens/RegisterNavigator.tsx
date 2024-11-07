import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'

import CONST from '@src/CONST'
import SCREENS from '@src/SCREENS'
import defaultScreenOptions from '@navigation/AppNavigator/defaultScreenOptions'
import { slideLeftTransitionPreset } from '@navigation/transitions'
import type { RegisterStackParamList } from '@navigation/types'
import EmailFormScreen from '@screens/public/signup/EmailFormScreen'
import CreatePasswordScreen from '@screens/public/signup/CreatePasswordScreen'
import NewProfileScreen from '@screens/public/signup/NewProfileScreen'
import EmailAlreadyExistsModal from '@screens/public/signup/EmailAlreadyExistsModal'
import { backImageStyle } from '@components/HeaderBackButton'

const RegisterStack = createStackNavigator<RegisterStackParamList>()

const RegisterNavigator = () => {
	return (
		<RegisterStack.Navigator
			screenOptions={({ navigation }) => {
				let backTitle
				try {
					backTitle = `Step ${navigation.getState().index + 1} of 3`
				} catch {}

				return {
					...defaultScreenOptions,
					// Header options
					headerPressOpacity: 1,
					headerStyle: {
						height: 125,
					},
					headerTitleContainerStyle: {
						position: 'absolute',
						bottom: 0,
						left: backImageStyle.width * 3,
					},
					headerBackTitleVisible: true,
					headerLeftContainerStyle: {
						justifyContent: 'flex-end',
						left: backImageStyle.width,
					},
					headerBackTitleStyle: {
						fontFamily: CONST.FONT_FAMILY.INTER_LIGHT,
						fontSize: 17,
						letterSpacing: 0,
						position: 'absolute',
						bottom: 5,
						marginLeft: 1 + backImageStyle.width,
					},
					// Navigation options
					keyboardHandlingEnabled: true,
					...slideLeftTransitionPreset,
				}
			}}
		>
			<RegisterStack.Screen
				name={SCREENS.REGISTER.WITH_EMAIL}
				component={EmailFormScreen}
				options={{
					title: "What's your email?",
					headerBackTitle: 'Step 1 of 3',
				}}
			/>
			<RegisterStack.Screen
				name={SCREENS.REGISTER.CREATE_PASSWORD}
				component={CreatePasswordScreen}
				options={{
					title: 'Create a password',
					headerBackTitle: 'Step 2 of 3',
				}}
			/>
			<RegisterStack.Screen
				name={SCREENS.REGISTER.CREATE_USERNAME}
				component={NewProfileScreen}
				options={{
					title: 'What should we call you?',
					headerBackTitle: 'Step 3 of 3',
				}}
			/>
			<RegisterStack.Screen
				name={SCREENS.REGISTER.USER_EXISTS_MODAL}
				component={EmailAlreadyExistsModal}
				options={{
					headerShown: false,
					...TransitionPresets.ModalTransition,
				}}
			/>
		</RegisterStack.Navigator>
	)
}

RegisterNavigator.displayName = 'RegisterNavigator'
export default RegisterNavigator
