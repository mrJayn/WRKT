import { withSpring as withRNRSpring, withTiming as withRNRTiming } from 'react-native-reanimated'
import type {
	AnimatableValue,
	AnimationCallback,
	WithSpringConfig,
	WithTimingConfig,
	Animation,
	SpringAnimation,
	TimingAnimation,
} from 'react-native-reanimated'

import CONST from '@src/CONST'

type withAnim<T extends SpringAnimation | TimingAnimation> = (
	toValue: AnimatableValue,
	callback?: AnimationCallback
) => Animation<T>

const withSpring: withAnim<SpringAnimation> = (toValue, callback) => {
	'worklet'
	let config = CONST.ANIMATION.SPRING_CONFIG as WithSpringConfig
	return withRNRSpring(toValue, config, callback)
}

const withSmoothSpring: withAnim<SpringAnimation> = (toValue, callback) => {
	'worklet'
	let config = CONST.ANIMATION.SMOOTH_SPRING as WithSpringConfig
	return withRNRSpring(toValue, config, callback)
}

function withTiming<T extends AnimatableValue>(toValue: T, callback?: AnimationCallback): T {
	'worklet'
	let timingConfig = CONST.ANIMATION.TIMING_CONFIG as WithTimingConfig
	return withRNRTiming(toValue, timingConfig, callback)
}

export { withSpring, withSmoothSpring, withTiming }
