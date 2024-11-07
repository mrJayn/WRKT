import type { AnimatableValue, AnimationCallback } from 'react-native-reanimated'
import * as RNR from 'react-native-reanimated'

import CONST from '@src/CONST'

type WithTransitionType = <T extends AnimatableValue>(toValue: T, callback?: AnimationCallback) => T

const withSpring: WithTransitionType = (toValue, callback) => {
	'worklet'
	return RNR.withSpring(toValue, CONST.ANIMATION.SPRING_CONFIG, callback)
}

const withSmoothSpring: WithTransitionType = (toValue, callback) => {
	'worklet'
	return RNR.withSpring(toValue, CONST.ANIMATION.SMOOTH_SPRING, callback)
}

const withTiming: WithTransitionType = (toValue, callback) => {
	'worklet'
	return RNR.withTiming(toValue, CONST.ANIMATION.TIMING_CONFIG, callback)
}

export { withSpring }
