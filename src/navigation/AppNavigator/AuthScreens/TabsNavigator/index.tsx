import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigationState } from '@react-navigation/native'
import SCREENS from '@src/SCREENS'
import getTopmostTabRoute from '@navigation/getTopMostTabRoute'
import type { TabsNavigatorParamList } from '@navigation/types'
import DisplayScreen from '@screens/DisplayScreen'
import WorkoutsListScreen from '@src/screens/workouts/WorkoutsListScreen'
import ProgramsListScreen from '@src/screens/programs/ProgramsListScreen'
import SettingsScreen from '@src/screens/settings/SettingsScreen'
import ActiveRouteContext from './ActiveRouteContext'
import TabBar from './TabBar'

const Tabs = createBottomTabNavigator<TabsNavigatorParamList>()

function TabsNavigator() {
	const activeRoute = useNavigationState(getTopmostTabRoute)

	return (
		<Tabs.Navigator
			id='tabs-navigator'
			tabBar={TabBar}
			screenOptions={{ headerShown: false }}
		>
			<Tabs.Screen
				name={SCREENS.TABS.MAIN}
				component={DisplayScreen}
			/>
			<Tabs.Screen
				name={SCREENS.TABS.WORKOUTS}
				component={WorkoutsListScreen}
			/>
			<Tabs.Screen
				name={SCREENS.TABS.PROGRAMS}
				component={ProgramsListScreen}
			/>
			<Tabs.Screen
				name={SCREENS.TABS.SETTINGS}
				component={SettingsScreen}
			/>
		</Tabs.Navigator>
	)
}

export default TabsNavigator
