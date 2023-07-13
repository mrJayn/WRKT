import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from 'twColors';
import { MainScreen, EditorScreen, ProgramScreen } from '@screens';
import { TabsUi } from './bottom-tabs/TabsUi';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => (
	<Tab.Navigator tabBar={(props) => <TabsUi {...props} />} screenOptions={{ headerShown: false }}>
		<Tab.Screen name='HomeTab' component={MainScreen} options={{ title: 'Home' }} initialParams={{ color: colors.warmblack }} />
		<Tab.Screen name='EditorTab' component={EditorScreen} options={{ title: 'Editor' }} initialParams={{ color: colors.darkgreen[40] }} />
		<Tab.Screen name='ProgramTab' component={ProgramScreen} options={{ title: 'Program' }} initialParams={{ color: colors.slate[90] }} />
	</Tab.Navigator>
);
