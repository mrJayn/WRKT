import PropTypes from 'prop-types'
import { useCallback, useEffect } from 'react'
import { Pressable } from 'react-native'
import Animated, {
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from 'react-native-reanimated'
import { TransitionSpecs } from '@react-navigation/stack'
import { colors } from '@colors'

const IOSSpringConfig = TransitionSpecs.TransitionIOSSpec.config

RNSwitch.propTypes = {
	value: PropTypes.bool.isRequired,
	setValue: PropTypes.func.isRequired,
	labels: PropTypes.array,
}

export default function RNSwitch({ value, setValue, labels = ['on', 'off'] }) {
	const progress = useSharedValue(0)
	const labelVis = useSharedValue(value ? 1 : 0)

	const bgColor = useAnimatedStyle(() => ({
		backgroundColor: interpolateColor(progress.value, [0, 36], [colors.grey[20], colors.blue[30]]),
	}))
	const translateX = useAnimatedStyle(() => ({ transform: [{ translateX: progress.value }] }))

	const onLabelVis = useAnimatedStyle(() => ({ opacity: labelVis.value }))
	const offLabelVis = useAnimatedStyle(() => ({ opacity: 1 - labelVis.value }))

	const handleSwitch = useCallback(() => {
		setValue(!value)
	}, [setValue, value])

	useEffect(() => {
		progress.value = withSpring(value ? 35 : 0, IOSSpringConfig)
		labelVis.value = withTiming(value ? 1 : 0)
	}, [value])

	return (
		<Pressable onPress={handleSwitch}>
			<Animated.View
				className='w-14 rounded-full p-1'
				style={[bgColor]}
			>
				<AnimatedLabel
					text={labels[0]}
					style={[{ left: 12 }, onLabelVis]}
				/>
				<Animated.View
					className='z-2 aspect-[1/1] h-5 rounded-full bg-white shadow-sm shadow-black/25'
					style={[translateX]}
				/>
				<AnimatedLabel
					text={labels[1]}
					style={[{ right: 12 }, offLabelVis]}
				/>
			</Animated.View>
		</Pressable>
	)
}

AnimatedLabel.propTypes = {
	text: PropTypes.string,
	style: PropTypes.arrayOf(PropTypes.object),
}

function AnimatedLabel({ text, style }) {
	return (
		<Animated.Text
			className='absolute top-[8px] z-1 font-raleway-bold text-sm'
			pointerEvents='none'
			style={style}
		>
			{text}
		</Animated.Text>
	)
}

/*
const [switchTranslate] = useState(new Animated.Value(0))

	useEffect(() => {
		if (value) {
			spring(switchTranslate, {
				toValue: 21,
				mass: 1,
				damping: 15,
				stiffness: 120,
				overshootClamping: false,
				restSpeedThreshold: 0.001,
				restDisplacementThreshold: 0.001,
			}).start()
		} else {
			spring(switchTranslate, {
				toValue: 0,
				mass: 1,
				damping: 15,
				stiffness: 120,
				overshootClamping: false,
				restSpeedThreshold: 0.001,
				restDisplacementThreshold: 0.001,
			}).start()
		}
	}, [value, switchTranslate])

	const animatedBgColor = {
		backgroundColor: interpolateColors(switchTranslate, {
			inputRange: [0, 22],
			outputColorRange: [colors.grey[20],  colors.blue[30]],
		}),
	}

	const memoizedOnSwitchPressCallback = useCallback(() => {
		setValue(!value)
	}, [setValue, value])
*/
