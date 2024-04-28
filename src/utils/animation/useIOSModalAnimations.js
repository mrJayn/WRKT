import { Dimensions } from 'react-native'
import { withTiming, withSpring, Easing } from 'react-native-reanimated'
import { TransitionSpecs } from '@react-navigation/stack'

const screenHeight = Dimensions.get('screen').height

const iosSpringConfig = TransitionSpecs.TransitionIOSSpec.config

export default function IOSModalAnimations() {
	const overlayEnter = (targetValues) => {
		'worklet'
		const animations = {
			opacity: withTiming(1, { duration: 300, easing: Easing.in(Easing.ease) }),
		}
		const initialValues = { opacity: 0 }
		return { initialValues, animations }
	}

	const overlayExit = (values) => {
		'worklet'
		const animations = {
			opacity: withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) }),
		}
		const initialValues = { opacity: 1 }
		return { initialValues, animations }
	}

	const modalEnter = (targetValues) => {
		'worklet'
		const animations = {
			transform: [{ translateY: withSpring(0, iosSpringConfig) }],
		}
		const initialValues = {
			transform: [{ translateY: screenHeight }],
		}
		return { initialValues, animations }
	}

	const modalExit = (values) => {
		'worklet'
		const animations = {
			transform: [{ translateY: withSpring(screenHeight, iosSpringConfig) }],
		}
		const initialValues = {
			transform: [{ translateY: 0 }],
		}
		return { initialValues, animations }
	}

	return {
		overlayEnter,
		overlayExit,
		modalEnter,
		modalExit,
	}
}
