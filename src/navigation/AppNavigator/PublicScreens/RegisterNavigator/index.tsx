import { TransitionPresets, createStackNavigator } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import type { RegisterStackParamList } from '@navigation/types'
import screenOptions from './RegisterNavigatorScreenOptions'
//
import EmailFormScreen from '@screens/public/signup/EmailFormScreen'
import CreatePasswordScreen from '@screens/public/signup/CreatePasswordScreen'
import NewProfileScreen from '@screens/public/signup/NewProfileScreen'
import EmailAlreadyExistsModal from '@screens/public/signup/EmailAlreadyExistsModal'

const RegisterStack = createStackNavigator<RegisterStackParamList>()

const RegisterNavigator = () => (
	<RegisterStack.Navigator screenOptions={screenOptions}>
		<RegisterStack.Screen
			name={SCREENS.REGISTER.WITH_EMAIL}
			component={EmailFormScreen}
			options={{ title: "What's your email?" }}
		/>
		<RegisterStack.Screen
			name={SCREENS.REGISTER.CREATE_PASSWORD}
			component={CreatePasswordScreen}
			options={{ title: 'Create a password' }}
		/>
		<RegisterStack.Screen
			name={SCREENS.REGISTER.CREATE_USERNAME}
			component={NewProfileScreen}
			options={{ title: 'What should we call you?' }}
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

export default RegisterNavigator
