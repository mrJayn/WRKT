import type { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types'
import CONST from '@src/CONST'
import { Easing } from 'react-native-reanimated'

type TransitionSpecObject = {
	open: TransitionSpec
	close: TransitionSpec
}

const getSpecObj = (spec1: TransitionSpec, spec2?: TransitionSpec): TransitionSpecObject => ({
	open: spec1,
	close: spec2 ?? spec1,
})

const springTransitionSpec: TransitionSpecObject = getSpecObj({
	animation: 'spring',
	config: CONST.ANIMATION.SPRING_CONFIG,
})

const smoothSpringTransitionSpec: TransitionSpecObject = getSpecObj({
	animation: 'spring',
	config: CONST.ANIMATION.SMOOTH_SPRING,
})

const timingTransitionSpec: TransitionSpecObject = {
	open: {
		animation: 'timing',
		config: {
			duration: 300,
			easing: Easing.out(Easing.circle),
		},
	},
	close: {
		animation: 'timing',
		config: {
			duration: 300,
			easing: Easing.in(Easing.ease),
		},
	},
}

export { springTransitionSpec, smoothSpringTransitionSpec, timingTransitionSpec }
