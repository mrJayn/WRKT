import { useEffect, useState } from 'react'
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	combineTransition,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

const TextLoader = ({ containerStyle, color, count = 20 }) => {
	const progress = useSharedValue(0)

	useEffect(() => {
		progress.value = 0
		progress.value = withRepeat(withTiming(200, { duration: 1500, easing: Easing.linear }), -1)
	}, [])

	return (
		<Animated.View
			className={`flex-row ${containerStyle ?? ''}`}
			layout={combineTransition(FadeOut, FadeIn)}
		>
			{[...Array(count).keys()].map((i) => (
				<Panel
					key={`panel-${i}`}
					{...{ i, progress, count, color }}
				/>
			))}
		</Animated.View>
	)
}

const Panel = ({ i, progress, count, color }) => {
	const d = (80 / (count - 1)) * i
	const animStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [d, d + 40, d + 100], [0, 1, 0], 'clamp'),
	}))
	return (
		<Animated.View
			key={`panel-${i}`}
			className='h-full flex-1'
			style={[animStyle, { backgroundColor: color }]}
		/>
	)
}

export default TextLoader
