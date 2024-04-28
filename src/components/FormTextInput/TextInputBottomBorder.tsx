import React from 'react'
import { ViewStyle } from 'react-native'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { colors } from '@colors'

const BASE_OPACITY = 0.3
const BASE_COLOR = colors.grey[50]
const ERROR_COLOR = colors.tint.error
const VALID_COLOR = colors.tint.success

function TextInputBottomBorder({
	isValid,
	isError,
	focusSV,
}: {
	isValid: boolean
	isError: boolean
	focusSV: SharedValue<boolean>
}) {
	const componentStyle = useAnimatedStyle(() => ({
		opacity: focusSV.value || isValid || isError ? 1 : BASE_OPACITY,
		backgroundColor: isValid ? VALID_COLOR : isError ? ERROR_COLOR : BASE_COLOR,
	}))

	return (
		<Animated.View
			pointerEvents='none'
			className='h-[2px]'
			style={componentStyle}
		/>
	)
}

TextInputBottomBorder.displayName = 'TextInputBottomBorder'

export default React.memo(TextInputBottomBorder)
