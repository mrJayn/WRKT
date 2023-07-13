import 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { AuthStack } from './src/navigation/stacks';
import { MyDrawer } from './src/navigation/MyDrawer';
import { SplashScreen } from '@screens';

// const AppContext = createContext({});
// use via... <AppContext.Provider value={theme}>
// then... const theme = useContext(theme)

const PresenceView = ({ time = 500, children }) => {
	const entering = FadeIn.delay(time).duration(time);
	const exiting = FadeOut.duration(time);

	return (
		<Animated.View className='h-full w-full' entering={entering} exiting={exiting}>
			{children}
		</Animated.View>
	);
};

export default function App() {
	const [didLogin, setDidLogin] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	return (
		<>
			<SplashScreen isLoading={isLoading} setIsLoading={setIsLoading} />
			<NavigationContainer>
				{didLogin && (
					<PresenceView>
						<MyDrawer />
					</PresenceView>
				)}
				{!didLogin && (
					<PresenceView>
						<AuthStack setDidLogin={setDidLogin} />
					</PresenceView>
				)}
				<StatusBar style='light' />
			</NavigationContainer>
		</>
	);
}
