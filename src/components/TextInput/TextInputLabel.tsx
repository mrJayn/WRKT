import React, { useMemo, useState } from 'react'
import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { withSpring } from '@utils/animation'

type TextInputLabelProps = {
	/** Label text to display. */
	label: string

	/** A shared value that indicates the active state of the label. */
	isLabelActiveSV: SharedValue<boolean>
}

const ACTIVE_TRANSLATE_Y = -22.5
const ACTIVE_SCALE = 0.825

const INACTIVE_TRANSLATE_X = 15
const INACTIVE_TRANSLATE_Y = 0
const INACTIVE_SCALE = 1

function TextInputLabel({ label, isLabelActiveSV }: TextInputLabelProps) {
	const [width, setWidth] = useState(0)

	const activeTranslateX = useMemo(() => -(width - width * ACTIVE_SCALE) / 4, [width])

	const labelTransformStyle = useAnimatedStyle(() => {
		const isActive = isLabelActiveSV.value
		return {
			transform: [
				{ translateX: withSpring(isActive ? activeTranslateX : INACTIVE_TRANSLATE_X) },
				{ translateY: withSpring(isActive ? ACTIVE_TRANSLATE_Y : INACTIVE_TRANSLATE_Y) },
				{ scale: withSpring(isActive ? ACTIVE_SCALE : INACTIVE_SCALE) },
			],
		}
	})

	return (
		<Animated.Text
			allowFontScaling={false}
			suppressHighlighting={true}
			className='absolute left-0 label-text text-tint-tertiary-light dark:text-tint-tertiary-dark'
			style={[labelTransformStyle]}
			onLayout={({ nativeEvent: { layout } }) => setWidth(layout.width)}
		>
			{label}
		</Animated.Text>
	)
}

TextInputLabel.displayName = 'TextInputLabel'

export default TextInputLabel
