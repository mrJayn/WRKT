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

const Tab = createBottomTabNavigator<TabsNavigatorParamList>()

function TabsNavigator() {
	const activeRoute = useNavigationState(getTopmostTabRoute)

	return (
		<Tab.Navigator
			id='tabs-navigator'
			tabBar={TabBar}
			screenOptions={{ headerShown: false }}
		>
			<Tab.Screen
				// Days List ( active workout )  +  Exercises List ( selected day )
				name={SCREENS.TABS.MAIN}
				component={DisplayScreen}
			/>
			<Tab.Screen
				// Workouts List
				name={SCREENS.TABS.WORKOUTS}
				component={WorkoutsListScreen}
			/>
			<Tab.Screen
				// Programs List
				name={SCREENS.TABS.PROGRAMS}
				component={ProgramsListScreen}
			/>
			<Tab.Screen
				// User
				name={SCREENS.TABS.SETTINGS}
				component={SettingsScreen}
			/>
		</Tab.Navigator>
	)
}

TabsNavigator.displayName = 'TabsNavigator'

export default TabsNavigator
