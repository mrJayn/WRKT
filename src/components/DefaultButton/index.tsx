import React from 'react'
import { useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { styled } from 'nativewind'

import CONST from '@src/CONST'
import Navigation from '@navigation/Navigation'
import Icon from '@components/Icon'
import P from '@components/P'
import getVariantStyles from './getVariantStyles'
import type { DefaultButtonProps } from './types'

function DefaultButton({
	variant,
	text,
	containerStyle,
	textClassName,
	icon,
	iconSize = 28,
	iconColor: customIconColor,
	style,
	onPress,
	linkTo = undefined,
	linkToType = undefined,
	...props
}: DefaultButtonProps) {
	const colorScheme = useColorScheme()
	const { buttonTw, textTw, iconColor } = getVariantStyles(variant, colorScheme)

	const StyledTouchableOpacity = styled(TouchableOpacity, buttonTw)

	const handlePress = () => {
		if (linkTo) {
			Navigation.navigate(linkTo, linkToType)
		} else {
			onPress && onPress()
		}
	}

	// const disabledStyle = useAnimatedStyle(() => {
	// 	let toValue = props.disabled ? CONST.BUTTON.DISABLED_OPACITY : 1
	// 	return {
	// 		opacity: withTiming(toValue, { duration: CONST.ANIMATION.OPACITY_DURATION }),
	// 	}
	// })

	return (
		<StyledTouchableOpacity
			onPress={handlePress}
			activeOpacity={CONST.BUTTON.ACTIVE_OPACITY}
			containerStyle={[{ opacity: props.disabled ? CONST.BUTTON.DISABLED_OPACITY : 1 }, containerStyle]}
			{...props}
		>
			{!!icon && (
				<Icon
					name={icon}
					size={iconSize}
					color={customIconColor || iconColor}
					style={{ width: iconSize - 1 }}
					className=' opac'
				/>
			)}
			{!!text && <P className={`${textTw} ${textClassName}`}>{text}</P>}
		</StyledTouchableOpacity>
	)
}

export default DefaultButton

export type { DefaultButtonProps }
