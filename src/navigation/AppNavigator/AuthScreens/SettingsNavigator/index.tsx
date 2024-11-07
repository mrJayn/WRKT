import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import type { SettingsStackParamList } from '@navigation/types'
import SettingsScreen from '@screens/settings/SettingsScreen'
//
import PreferencesScreen from '@screens/profile/preferences-screen'
import MaxesScreen from '@screens/profile/maxes-screen'
import ManageExsScreen from '@screens/profile/manage-exs-screen'
// import ConfirmSelectionScreen from '@screens/confirm-selection-screen'
import AccountScreen from '@screens/settings/AccountScreen'

const SettingsStack = createStackNavigator<SettingsStackParamList>()

const SettingsNavigator = () => (
	<SettingsStack.Navigator screenOptions={{ headerTransparent: true }}>
		<SettingsStack.Screen
			name={SCREENS.SETTINGS.ACCOUNT}
			component={AccountScreen}
		/>
		{/* 
		<SettingsStack.Screen
			name={SCREENS.SETTINGS.ACCOUNT}
			component={SettingsScreen}
		/>
		 */}
		{/* <SettingsStack.Screen
			name={SCREENS.SETTINGS.PREFERENCES}
			component={PreferencesScreen}
			options={{}}
		/>
		<SettingsStack.Screen
			name={SCREENS.SETTINGS.MAXES}
			component={MaxesScreen}
			options={{ title: 'One Rep Maxes' }}
		/>
		<SettingsStack.Screen
			name={SCREENS.SETTINGS.LIBRARY}
			component={ManageExsScreen}
			options={{ title: 'Manage Exercises' }}
		/>
		<SettingsStack.Screen
			name={SCREENS.SETTINGS.DELETE_ACCOUNT}
			component={ConfirmSelectionScreen}
			options={{
				title: 'Delete Account',
				cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
			}}
		/> */}
	</SettingsStack.Navigator>
)

export default SettingsNavigator
