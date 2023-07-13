import { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import Animated, { Easing, SlideInLeft, SlideOutLeft } from 'react-native-reanimated';

export default function ScreenBranch({ title, style, children, ...props }) {
	const nav = useNavigation();

	const show = SlideInLeft.duration(500).easing(Easing.out(Easing.ease));
	const exit = SlideOutLeft.duration(500).easing(Easing.in(Easing.ease));

	style = {
		minHeight: '100%',
		width: '100%',
		padding: 10,
		...style,
	};

	useLayoutEffect(() => {
		nav.setOptions({
			headerTitle: title ?? '',
		});
	}, []);

	return (
		<Animated.View entering={show} exiting={exit} style={[style]} {...props}>
			<HeaderBackButton tintColor='#fff' onPress={() => nav.goBack()} />
			{children}
		</Animated.View>
	);
}
