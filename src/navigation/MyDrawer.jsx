import { Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'twColors';
import { GH_URL } from '@config';
import { HomeStack, ProfileStack } from './stacks';

const Drawer = createDrawerNavigator();

export const MyDrawer = () => {
	const drawerProps = {
		drawerContent: (props) => (
			<SafeAreaView className='flex-1 px-2 py-5 overflow-hidden bg-nav-inactive'>
				<DrawerItemList {...props} />
				{drawerItemProps.map((itemProps) => (
					<DrawerItem key={itemProps.label} className='border-[1px] border-nav-active py-2 z-0' labelStyle={{ color: colors['nav-font-inactive'] }} {...itemProps} />
				))}
			</SafeAreaView>
		),
		screenOptions: { headerShown: false, drawerPosition: 'right', drawerType: 'back' },
	};

	const drawerItemProps = [
		{ label: 'More Info', onPress: () => Linking.openURL(GH_URL), icon: Info_ico },
		{ label: 'Log-Out', onPress: () => null, icon: Logout_ico },
	];

	const drawerScreenProps = [
		{ options: { title: 'Home', drawerIcon: Home_ico }, component: HomeStack },
		{ options: { title: 'Profile', drawerIcon: Acct_ico }, component: ProfileStack },
	];

	return (
		<Drawer.Navigator initialRouteName='HomeStack' {...drawerProps}>
			{drawerScreenProps.map(({ options, ...component }) => (
				<Drawer.Screen key={options.title} name={`${options.title}Stack`} options={{ ...options, ...styles }} {...component} />
			))}
		</Drawer.Navigator>
	);
};

const [Home_ico, Acct_ico, Info_ico, Logout_ico] = ['home-sharp', 'person-circle', 'information-circle-outline', 'log-out-outline'].map((nameStr) => {
	return () => <Ionicons name={nameStr} size={22} color='white' />;
});

const styles = {
	drawerStyle: { backgroundColor: colors['nav'] },
	drawerInactiveBackgroundColor: colors['nav-inactive'],
	drawerInactiveTintColor: colors['nav-font-inactive'],
	drawerActiveTintColor: colors['nav-font-active'],
	drawerActiveBackgroundColor: colors['nav-active'],
};
