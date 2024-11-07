import { createStackNavigator } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import type { WorkoutsStackParamList } from '@navigation/types'
import { DayDetailScreen, DaysListScreen } from '@screens'
import options, { editorStackNavigationScreenOptions } from './screenOptions'

const WorkoutsStack = createStackNavigator<WorkoutsStackParamList>()

const WorkoutsNavigator = () => {
	return (
		<WorkoutsStack.Navigator
			id='workouts-stack-navigator'
			screenOptions={editorStackNavigationScreenOptions}
		>
			<WorkoutsStack.Screen
				// Days List ( selected workout )
				name={SCREENS.WORKOUTS.DAYS}
				component={DaysListScreen}
				options={options.listScreen}
			/>
			<WorkoutsStack.Screen
				// Exercises List ( selected day )
				name={SCREENS.WORKOUTS.DAYS_DETAIL}
				component={DayDetailScreen}
				options={options.listDetailScreen}
			/>
		</WorkoutsStack.Navigator>
	)
}

export default WorkoutsNavigator
