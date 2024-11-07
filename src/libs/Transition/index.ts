import type { AnimatableValue, AnimationCallback } from 'react-native-reanimated'
import * as RNR from 'react-native-reanimated'

import CONST from '@src/CONST'

type TransitionCreatorFn = <T extends AnimatableValue>(toValue: T, callback?: AnimationCallback) => T
type TransitionKey = 'spring' | 'timing'

type WithTransitionType = {
	[k in TransitionKey]: {
		[key: string]: TransitionCreatorFn
		DEFAULT: TransitionCreatorFn
	}
}

const withTransition: WithTransitionType = {
	/** Spring-based animation builders.  */
	spring: {
		smooth(toValue, callback) {
			'worklet'
			return RNR.withSpring(toValue, CONST.ANIMATION.SMOOTH_SPRING, callback)
		},
		DEFAULT(toValue, callback) {
			'worklet'
			return RNR.withSpring(toValue, CONST.ANIMATION.SPRING_CONFIG, callback)
		},
	},

	/** Timing-based animation builders.  */
	timing: {
		DEFAULT(toValue, callback) {
			'worklet'
			return RNR.withTiming(toValue, CONST.ANIMATION.TIMING_CONFIG, callback)
		},
	},
}

interface ITransition extends WithTransitionType {
	get(path: TransitionKey | `${TransitionKey}.${keyof WithTransitionType[TransitionKey]}`): TransitionCreatorFn
}

const Transition: ITransition = {
	...withTransition,
	//
	get: function (path) {
		const keys = path.split('.')
		const base = this[keys[0] as keyof typeof withTransition]
		if (keys.length > 1 && keys[1] in base) {
			try {
				return base[keys[1]]
			} catch {}
		}
		return base.DEFAULT
	},
}

export default Transition
