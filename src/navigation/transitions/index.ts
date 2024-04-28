import {
	CardStyleInterpolators,
	HeaderStyleInterpolators,
	TransitionPreset,
	TransitionPresets,
	TransitionSpecs,
} from '@react-navigation/stack'
import { forSlideInFadeOut, forSlideLeft, forSlideUp } from '../cardStyleInterpolators'
import { forPopHeader } from '../headerStyleInterpolators'
import { TransitionSpec } from '@react-navigation/stack/lib/typescript/src/types'
import CONST from '@src/CONST'

const transitionSpec: TransitionSpec = {
	animation: 'spring',
	config: CONST.ANIMATION.SPRING_CONFIG,
}

export const defaultTransitionPreset: TransitionPreset = {
	...TransitionPresets.DefaultTransition,
	transitionSpec: {
		open: transitionSpec,
		close: transitionSpec,
	},
	cardStyleInterpolator: forSlideLeft,
	headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

export const slideLeftTransitionPreset: TransitionPreset = {
	gestureDirection: 'horizontal',
	transitionSpec: {
		open: transitionSpec,
		close: transitionSpec,
	},
	cardStyleInterpolator: forSlideLeft,
	headerStyleInterpolator: forPopHeader,
}

export const slideUpTransitionPreset: TransitionPreset = {
	gestureDirection: 'vertical',
	transitionSpec: {
		open: transitionSpec,
		close: transitionSpec,
	},
	cardStyleInterpolator: forSlideUp,
	headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

export default {
	defaultTransition: defaultTransitionPreset,
	slideLeft: slideLeftTransitionPreset,
	slideUp: slideUpTransitionPreset,
}
