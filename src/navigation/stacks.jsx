import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons';
import { colors } from 'twColors';
import { ProfileScreen, ProfileDetailScreen, LoginScreen, SignUpScreen, ForgotPwScreen, EditorWrktScreen, NewExerciseScreen } from '@screens';
import { HomeTabs } from './tab';

const Stack = createStackNavigator();

export const HomeStack = () => {
	const nav = useNavigation();

	return (
		<Stack.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerRight: () => <Ionicons name='menu' size={40} color={colors['nav-font']} style={{ marginRight: 10 }} onPress={() => nav.toggleDrawer()} />,
				headerLeft: () => <Image source={require('../../assets/favicon.png')} resizeMode='cover' style={{ height: 40, width: 60, marginLeft: 10 }} />,
				...navigatorStyle,
			}}>
			<Stack.Screen name='Home' component={HomeTabs} />
			<Stack.Screen name='WrktEditor' component={EditorWrktScreen} />
			<Stack.Screen name='NewExercise' component={NewExerciseScreen} />
		</Stack.Navigator>
	);
};

export const ProfileStack = () => {
	const nav = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				headerLeft: () => <HeaderBackButton tintColor='white' onPress={() => nav.goBack()} />,
				...navigatorStyle,
			}}>
			<Stack.Screen name='Profile' component={ProfileScreen} />
			<Stack.Screen name='ProfileDetail' component={ProfileDetailScreen} />
		</Stack.Navigator>
	);
};

export const AuthStack = (props) => {
	const LoginScreenWProps = () => <LoginScreen {...props} />;

	return (
		<Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Login' component={LoginScreenWProps} />
			<Stack.Screen name='SignUp' component={SignUpScreen} />
			<Stack.Screen name='ForgotPw' component={ForgotPwScreen} />
		</Stack.Navigator>
	);
};

// ===============================
const navigatorStyle = {
	headerTintColor: colors['nav-font'],
	headerStyle: { backgroundColor: colors['nav'] },
};
