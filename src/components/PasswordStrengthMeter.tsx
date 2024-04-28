import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import Animated, { interpolate, interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { colors } from '@colors'
import { withSmoothSpring } from '@utils/animation'
import { MultipleFieldErrors } from 'react-hook-form'

/**
 * Field error produced by `yup.string().password()`
 * when an empty string is validated.
 */
const defaultErrorTypes = {
	required: 'required',
	minLength: 'minLength',
	lowercase: 'lowercase',
	uppercase: 'uppercase',
	number: 'number',
} as MultipleFieldErrors

const totalErrors = Object.keys(defaultErrorTypes).length

/**
 * @param errors - The password field errors.
 */
function PasswordStrengthMeter({ errors = {} }: { errors: MultipleFieldErrors | undefined }) {
	const [barWidth, setBarWidth] = useState(0)
	const isFirstRender = useRef(true)
	const barProgressSV = useSharedValue(0)

	const progressBarStyle = useAnimatedStyle(() => ({
		width: interpolate(barProgressSV.value, [0, 1], [0, barWidth]),
		backgroundColor: interpolateColor(barProgressSV.value, [0, 0.6], [colors.red.DEFAULT, colors.tint.success]),
	}))

	/** Animate the strength bar when the errors change. */
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}
		let numErrors = errors === undefined ? totalErrors : Object.keys(errors).length
		let toValue = (totalErrors - numErrors) / totalErrors
		barProgressSV.value = withSmoothSpring(toValue)
	}, [errors])

	return (
		<View
			className='h-3 my-3 mb-3 border-4 border-secondary-light dark:border-separator-dark rounded-xl'
			onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
		>
			<Animated.View
				className='absolute left-0 h-full rounded-xl'
				style={[progressBarStyle]}
			/>
		</View>
	)
}

PasswordStrengthMeter.displayName = 'PasswordStrengthMeter'

export default PasswordStrengthMeter
