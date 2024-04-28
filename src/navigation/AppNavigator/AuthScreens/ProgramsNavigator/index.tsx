import { createStackNavigator } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import type { ProgramsStackParamList } from '@navigation/types'
import ProgramsDetail from '@screens/programs/programs-detail'

const ProgramsStack = createStackNavigator<ProgramsStackParamList>()

const ProgramsNavigator = () => (
	<ProgramsStack.Navigator>
		<ProgramsStack.Screen
			name={SCREENS.PROGRAMS.WEEKS}
			component={ProgramsDetail}
		/>
	</ProgramsStack.Navigator>
)

export default ProgramsNavigator
