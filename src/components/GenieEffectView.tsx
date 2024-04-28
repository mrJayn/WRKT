import { ViewProps } from 'react-native'
import Animated, { withTiming, Easing, EntryAnimationsValues, ExitAnimationsValues } from 'react-native-reanimated'

const enterTiming = { duration: 200, easing: Easing.out(Easing.cubic) }
const exitTiming = { duration: 200, easing: Easing.in(Easing.ease) }

function GenieEffectView({
	offset = 0,
	children,
	...props
}: ViewProps & {
	offset?: number
}) {
	const entering = ({ targetWidth, targetHeight }: EntryAnimationsValues) => {
		'worklet'
		const initialValues = {
			originX: targetWidth / 2,
			originY: -targetHeight / 2,
			transform: [{ scale: 0 }],
		}
		const animations = {
			originX: withTiming(targetWidth * offset, enterTiming),
			originY: withTiming(0, enterTiming),
			transform: [{ scale: withTiming(1, enterTiming) }],
		}
		return {
			initialValues,
			animations,
		}
	}

	const exiting = ({ currentWidth, currentHeight, currentOriginX }: ExitAnimationsValues) => {
		'worklet'
		const animations = {
			originX: withTiming(currentWidth / 2, exitTiming),
			originY: withTiming(-currentHeight / 2, exitTiming),
			transform: [{ scale: withTiming(0, exitTiming) }],
		}
		const initialValues = { originX: currentOriginX, originY: 0, transform: [{ scale: 1 }] }
		return {
			initialValues,
			animations,
		}
	}

	return (
		<Animated.View
			entering={entering}
			exiting={exiting}
			{...props}
		>
			{children}
		</Animated.View>
	)
}

export default GenieEffectView
