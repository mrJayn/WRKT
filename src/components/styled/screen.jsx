import { useContext, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';

//import Animated, { LightSpeedInLeft, Layout, LightSpeedOutRight } from 'react-native-reanimated';
// const animatedProps = { entering: LightSpeedInLeft, layout: Layout.springify(), exiting: LightSpeedOutRight };

export default function Screen({ style, children, headerTitle, ...props }) {
	const nav = useNavigation();
	//const themeFromContext = useContext(ThemeContext)

	useLayoutEffect(() => {
		if (!headerTitle) return;
		nav.setOptions({
			headerTitle: headerTitle,
			headerRight: () => null,
			headerLeft: () => <HeaderBackButton tintColor='#fff' onPress={() => nav.goBack()} />,
		});
	}, []);

	return (
		<View className='min-h-full w-full' style={{ ...style }} {...props}>
			{children}
		</View>
	);
}
