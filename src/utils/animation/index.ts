import type { AnimatableValue, AnimationCallback } from 'react-native-reanimated'
import * as RNR from 'react-native-reanimated'
import CONST from '@src/CONST'

type WithTransitionType = <T extends AnimatableValue>(toValue: T, callback?: AnimationCallback) => T

const withSpring: WithTransitionType = (toValue, callback) => {
	'worklet'
	return RNR.withSpring(toValue, CONST.ANIMATION.SPRING_CONFIG, callback)
}

export { withSpring }
