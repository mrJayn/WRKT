import { Animated, Platform } from 'react-native'
import { CardStyleInterpolators, HeaderStyleInterpolators, TransitionSpecs } from '@react-navigation/stack'
import type { StackHeaderInterpolatedStyle, StackHeaderStyleInterpolator } from '@react-navigation/stack'

const { add } = Animated

const interp3 = (progress: Animated.AnimatedAddition<string | number>, outputs: [number, number, number]) => {
	return progress.interpolate({ inputRange: [0, 1, 2], outputRange: outputs })
}

const forPopHeader: StackHeaderStyleInterpolator = ({ current, next, layouts: { screen } }) => {
	const progress = add(
		current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
		next ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }) : 0
	)

	const opacity = progress.interpolate({
		inputRange: [0, 1, 1.9, 2],
		outputRange: [0, 1, 1, 0],
	})

	const titleTranslateX = progress.interpolate({
		inputRange: [0, 1, 2],
		outputRange: [screen.width, 0, -screen.width],
	})

	return {
		leftButtonStyle: { opacity },
		titleStyle: {
			transform: [{ translateX: titleTranslateX }],
		},
		backgroundStyle: {
			opacity: progress.interpolate({
				inputRange: [0, 1, 2],
				outputRange: [0, 1, 0],
			}),
		},
	}
}

const forFadeHeaderLeft: StackHeaderStyleInterpolator = ({ current }) => {
	const progress = add(current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }), 0)

	const opacity = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] })

	return {
		leftButtonStyle: { opacity },
		leftLabelStyle: { opacity },
	}
}

const forListHeader: StackHeaderStyleInterpolator = ({ current, next, layouts: { screen } }) => {
	const progress = add(
		current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
		next ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }) : 0
	)

	return {
		leftButtonStyle: {
			opacity: interp3(progress, [0, 1, 1]),
			transform: [
				{ translateX: interp3(progress, [34, 0, -15]) },
				{ translateY: interp3(progress, [60, 0, -30]) },
				{ scale: interp3(progress, [2, 1, 1]) },
			],
		},
		titleStyle: {
			opacity: interp3(progress, [1, 1, 0]),
			transform: [
				{ translateX: interp3(progress, [screen.width, 0, -34]) },
				{ translateY: interp3(progress, [0, 0, -46]) },
				{ scale: interp3(progress, [1, 1, 0.5]) },
			],
		},
		rightButtonStyle: {
			opacity: progress.interpolate({ inputRange: [0.25, 1, 2], outputRange: [0, 1, 0] }),
		},
	}
}

const forDetailHeader: StackHeaderStyleInterpolator = ({ current, next, layouts: { screen } }) => {
	const progress = add(
		current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }),
		next ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: 'clamp' }) : 0
	)
	const offset = screen.width * 0.3725

	return {
		leftButtonStyle: {
			opacity: interp3(progress, [0, 1, 1]),
		},
		leftLabelStyle: {
			transform: [{ translateX: interp3(progress, [offset, 0, -offset]) }],
		},
		titleStyle: {
			opacity: interp3(progress, [1, 1, 0]),
			transform: [{ translateX: interp3(progress, [screen.width, 0, -offset]) }],
		},
		rightButtonStyle: {
			opacity: interp3(progress, [0, 1, 0]),
		},
	}
}

export {
	forPopHeader,
	forFadeHeaderLeft,
	forListHeader,
	forDetailHeader,
	//
}
