import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { Easing, FadeInUp, FadeOutDown, FadeInDown, FadeOut } from 'react-native-reanimated';
import { colors } from 'twColors';
import { BgGradient } from '@components';

const SplashScreen = ({ isLoading, setIsLoading }) => {
	const [isMounted, setIsMounted] = useState(false);
	const enter = { delay: 500, dur: 1200 };
	const exit = { delay: 800, dur: 600 };
	const stagger = 500;

	let wait1 = enter.delay + enter.dur + stagger;
	let wait2 = wait1 + exit.delay + exit.dur;

	useEffect(() => {
		setTimeout(() => {
			setIsMounted(true);
			setTimeout(() => setIsMounted(false), wait1);
			setTimeout(() => setIsLoading(false), wait2);
		}, 750);
	}, []);

	return (
		isLoading && (
			<Animated.View className='absolute left-0 top-0 h-full w-full z-[999] bg-black justify-center items-center' exiting={FadeOutDown.duration(exit.dur).easing(Easing.in(Easing.ease))}>
				<Animated.View className='absolute full top-0 left-0 bg-black z-[999]' entering={FadeOut.delay(500).duration(1000)} />
				<BgGradient />
				{isMounted && (
					<>
						<Animated.View
							style={[styles.animItem, styles.itemA]}
							entering={FadeInDown.delay(enter.delay).duration(enter.dur).easing(Easing.elastic(2))}
							exiting={FadeOutDown.delay(exit.delay).duration(exit.dur).easing(Easing.in(Easing.ease))}
						/>
						<Animated.View
							style={[styles.animItem, styles.itemB]}
							entering={FadeInDown.delay(enter.delay + stagger / 2)
								.duration(enter.dur)
								.easing(Easing.elastic(2))}
							exiting={FadeOutDown.delay(exit.delay - stagger / 2)
								.duration(exit.dur)
								.easing(Easing.in(Easing.ease))}
						/>
						<Animated.View
							style={[styles.animItem, styles.itemC]}
							entering={FadeInDown.delay(enter.delay + stagger)
								.duration(enter.dur)
								.easing(Easing.elastic(2))}
							exiting={FadeOutDown.delay(exit.delay - stagger)
								.duration(exit.dur)
								.easing(Easing.in(Easing.ease))}
						/>
						<Animated.Text style={[styles.text]} entering={FadeInUp.delay(enter.delay).duration(enter.dur).easing(Easing.elastic(2))} exiting={FadeOutDown.delay(exit.delay).duration(exit.dur).easing(Easing.in(Easing.ease))}>
							WRKT
						</Animated.Text>
					</>
				)}
			</Animated.View>
		)
	);
};

const styles = StyleSheet.create({
	screen: {
		position: 'absolute',
		top: 0,
		left: 0,
		height: '100%',
		width: '100%',
		backgroundColor: colors.black,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 999,
	},
	bgGradient: { position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', zIndex: 0 },
	animItem: {
		position: 'absolute',
		borderRadius: 30,
		aspectRatio: '4/5',
	},
	itemA: {
		zIndex: 1,
		backgroundColor: '#fff1',
		width: '80%',
	},
	itemB: {
		zIndex: 2,
		backgroundColor: '#fff1',
		width: '65%',
	},
	itemC: {
		zIndex: 3,
		backgroundColor: '#fff1',
		width: '50%',
	},
	text: {
		position: 'absolute',
		fontSize: 60,
		fontWeight: 'bold',
		color: '#498c6b',
		zIndex: 4,
	},
});

export default SplashScreen;
