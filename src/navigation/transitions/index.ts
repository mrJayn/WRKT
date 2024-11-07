import { HeaderStyleInterpolators, TransitionPreset, TransitionPresets } from '@react-navigation/stack'
import { forSlideInFadeOut, forSlideLeft, forSlideUp } from '../cardStyleInterpolators'
import { forPopHeader } from '../headerStyleInterpolators'
import { springTransitionSpec, smoothSpringTransitionSpec, timingTransitionSpec } from './transitionSpecs'

const defaultTransitionPreset: TransitionPreset = {
	...TransitionPresets.DefaultTransition,
	transitionSpec: springTransitionSpec,
	cardStyleInterpolator: forSlideLeft,
	headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

const slideLeftTransitionPreset: TransitionPreset = {
	gestureDirection: 'horizontal',
	transitionSpec: springTransitionSpec,
	cardStyleInterpolator: forSlideLeft,
	headerStyleInterpolator: forPopHeader,
}

const slideUpTransitionPreset: TransitionPreset = {
	gestureDirection: 'vertical',
	transitionSpec: springTransitionSpec,
	cardStyleInterpolator: forSlideUp,
	headerStyleInterpolator: HeaderStyleInterpolators.forFade,
}

export default {
	defaultTransition: defaultTransitionPreset,
	slideLeft: slideLeftTransitionPreset,
	slideUp: slideUpTransitionPreset,
}
export { defaultTransitionPreset, slideLeftTransitionPreset, slideUpTransitionPreset }
