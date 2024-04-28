import _ from 'lodash'
import { Animated, Platform } from 'react-native'
import { type StackCardStyleInterpolator } from '@react-navigation/stack'
import { Extrapolation } from 'react-native-reanimated'

type SlideDirection = 'top' | 'bottom' | 'left' | 'right'

type Options = {
	opacity?: number
	offset?: number
	firstOffset?: number
	firstOpacity?: number
}

const { add } = Animated
const { CLAMP } = Extrapolation

/**
 * Factory for stack card style interpolators: `forSlideUp`, `forSlideRight`, `forSlideDown`, and `forSlideLeft`.
 */
export function createForSlideCardStyleInterpolator(direction: SlideDirection, options: Options = {}) {
	const forSlideCardStyleInterpolator: StackCardStyleInterpolator = ({ current, next, layouts: { screen }, index }) => {
		const is1st = index === 0
		const progress = add(
			current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: CLAMP }),
			next ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: CLAMP }) : 0
		)

		let opac = (is1st ? options.firstOpacity : options.opacity) ?? 0
		const opacity = progress.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [opac, 1, opac],
		})

		const translate = (screenValue: number) => {
			let offset = (is1st ? options.firstOffset : options.offset) ?? screenValue

			return progress.interpolate({
				inputRange: [0, 1, 2],
				outputRange: [offset, 0, -offset],
				extrapolate: CLAMP,
			})
		}

		let transform

		switch (direction) {
			case 'top':
				transform = [{ translateY: translate(-screen.height) }]
				break
			case 'bottom':
				transform = [{ translateY: translate(screen.height) }]
				break
			case 'right':
				transform = [{ translateX: translate(-screen.width) }]
				break
			case 'left':
				transform = [{ translateX: translate(screen.width) }]
				break
		}

		return {
			cardStyle: {
				opacity,
				transform,
				backgroundColor: 'transparent',
			},
		}
	}
	return forSlideCardStyleInterpolator
}

export const forSlideUp = createForSlideCardStyleInterpolator('bottom')
export const forSlideRight = createForSlideCardStyleInterpolator('right')
export const forSlideDown = createForSlideCardStyleInterpolator('top')
export const forSlideLeft = createForSlideCardStyleInterpolator('left')

const forModal: StackCardStyleInterpolator = ({ index, current, next, inverted, layouts: { screen }, insets }) => {
	const hasNotchIos = Platform.OS === 'ios' && !Platform.isPad && !Platform.isTV && insets.top > 20
	const isLandscape = screen.width > screen.height
	const topOffset = isLandscape ? 0 : 10
	const statusBarHeight = insets.top
	const aspectRatio = screen.height / screen.width

	const progress = Animated.add(
		current.progress.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1],
			extrapolate: CLAMP,
		}),
		next
			? next.progress.interpolate({
					inputRange: [0, 1],
					outputRange: [0, 1],
					extrapolate: CLAMP,
			  })
			: 0
	)

	const isFirst = index === 0

	const translateY = Animated.multiply(
		progress.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [screen.height, isFirst ? 0 : topOffset, (isFirst ? statusBarHeight : 0) - topOffset * aspectRatio],
		}),
		inverted
	)

	const overlayOpacity = progress.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 0.7],
	})

	const scale = isLandscape
		? 1
		: progress.interpolate({
				inputRange: [0, 1, 2],
				outputRange: [1, 1, screen.width ? 1 - (topOffset * 2) / screen.width : 1],
		  })

	const borderRadius = isLandscape
		? 0
		: isFirst
		? progress.interpolate({
				inputRange: [0, 1, 1.0001, 2],
				outputRange: [0, 0, hasNotchIos ? 38 : 0, 10],
		  })
		: 10
	return {
		cardStyle: {
			overflow: 'hidden',
			borderTopLeftRadius: borderRadius,
			borderTopRightRadius: borderRadius,
			// We don't need these for the animation
			// But different border radius for corners improves animation perf
			borderBottomLeftRadius: hasNotchIos ? borderRadius : 0,
			borderBottomRightRadius: hasNotchIos ? borderRadius : 0,
			marginTop: isFirst ? 0 : statusBarHeight,
			marginBottom: isFirst ? 0 : topOffset,
			transform: [{ translateY }, { scale }],
		},
		overlayStyle: { opacity: next ? 0 : overlayOpacity },
	}
}

const forSlideInFadeOut: StackCardStyleInterpolator = ({ index, current, next, inverted, layouts: { screen }, insets }) => {
	const is1st = index === 0

	const progress = Animated.add(
		current.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: CLAMP }),
		next ? next.progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1], extrapolate: CLAMP }) : 0
	)

	const translateX = Animated.multiply(
		progress.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [screen.width, 0, is1st ? 0 : -screen.width],
		}),
		inverted
	)
	const opacity = Animated.multiply(
		progress.interpolate({
			inputRange: [0, 1, 2],
			outputRange: [0, 1, 0],
		}),
		inverted
	)
	return {
		cardStyle: {
			opacity,
			transform: [{ translateX }],
		},
	}
}

const forFade: StackCardStyleInterpolator = ({ current, next }) => {
	const opacity = Animated.add(current.progress, next ? next.progress : 0).interpolate({
		inputRange: [0, 1, 2],
		outputRange: [0, 1, 0],
	})

	return {
		cardStyle: { opacity },
	}
}

export {
	forModal,
	forSlideInFadeOut,
	forFade,
	//
}
