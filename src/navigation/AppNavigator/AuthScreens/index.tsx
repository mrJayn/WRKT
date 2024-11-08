import { createStackNavigator } from '@react-navigation/stack'

import SCREENS from '@src/SCREENS'
import NAVIGATORS from '@src/NAVIGATORS'
import type { AuthStackParamList } from '@navigation/types'
import RefreshTokenScreen from '@screens/RefreshTokenScreen'
import authStackOptions from './authStackScreenOptions'
import TabsNavigator from './TabsNavigator'
import WorkoutsNavigator from './WorkoutsNavigator'
import ProgramsNavigator from './ProgramsNavigator'
import SettingsNavigator from './SettingsNavigator'
import NotFoundScreen from '@screens/NotFoundScreen'

const AuthStack = createStackNavigator<AuthStackParamList>()

function AuthScreens() {
	return (
		<AuthStack.Navigator id='auth-stack-navigator'>
			<AuthStack.Screen
				name={NAVIGATORS.TABS_NAVIGATOR}
				component={TabsNavigator}
				options={authStackOptions[NAVIGATORS.TABS_NAVIGATOR]}
			/>
			<AuthStack.Screen
				name={NAVIGATORS.WORKOUTS_NAVIGATOR}
				component={WorkoutsNavigator}
				options={authStackOptions[NAVIGATORS.WORKOUTS_NAVIGATOR]}
			/>
			<AuthStack.Screen
				name={NAVIGATORS.PROGRAMS_NAVIGATOR}
				component={ProgramsNavigator}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name={NAVIGATORS.SETTINGS_NAVIGATOR}
				component={SettingsNavigator}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name={SCREENS.REFRESH_TOKEN}
				component={RefreshTokenScreen}
				options={{ headerShown: false }}
			/>
			<AuthStack.Screen
				name={SCREENS.NOT_FOUND}
				component={NotFoundScreen}
			/>
		</AuthStack.Navigator>
	)
}

AuthScreens.displayName = 'AuthStack'
export default AuthScreens

/*
let isLoadingApp = false

function handleNetworkReconnect() {
	if (isLoadingApp) {
		//App.openApp();
	} else {
		console.log('[handleNetworkReconnect] Sending ReconnectApp')
		// App.reconnectApp(lastUpdateIDAppliedToClient);
		// getOnyxDataForOpenOrReconnect(true)
	}
}

========== ========== ========== ========== ==========

useEffect(() => {
			Network.listenForReconnect()
			Network.onReconnect(handleNetworkReconnect)
	}, [])
*/
