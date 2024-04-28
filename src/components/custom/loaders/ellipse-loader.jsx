import FadeView from '@components/FadeView'
import { View } from 'react-native'
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'
import { P } from 'src/components/base'

const EllipseLoader = () => {
	const progress = useSharedValue(0)
	progress.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), 5)

	return (
		<FadeView className='absolute inset-0 centered z-[99] bg-black/50'>
			<P className='h4 text-darkgreen-10'>{`Loading`}</P>
			<View className='flex-row items-end mt-3'>
				<Ellipse {...{ progress, range: [0, 100, 300, 360] }} />
				<Ellipse {...{ progress, range: [100, 200, 300, 360] }} />
				<Ellipse {...{ progress, range: [200, 300, 300, 360] }} />
			</View>
		</FadeView>
	)
}

const Ellipse = ({ progress, range }) => {
	const animStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, range, [0, 1, 1, 0], 'clamp'),
	}))
	return (
		<Animated.View
			className='rounded-full bg-white h-1.5 aspect-[1/1] mx-1'
			style={[animStyle]}
		/>
	)
}

export default EllipseLoader
