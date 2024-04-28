import React from 'react'
import { View, useColorScheme } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { styled } from 'nativewind'
import CONST from '@src/CONST'
import Navigation from '@navigation/Navigation'
import Icon from '@components/Icon'
import P from '@components/P'
import getVariantStyles from './getVariantStyles'
import type { DefaultButtonProps } from './types'

// const CLASSNAME = {
// 	OPACITY: /((^|\s)opacity-(0|5|25|75|100|[1-9][0]|\[0(\.\d+)?\])($|\s))/g,
// 	MIN_WIDTH: /((^|\s)min-w-(0|full|min|max|fit|\[(\d+(px|vw|vh|%)?)\])($|\s))/g,
// 	MIN_HEIGHT: /((^|\s)min-h-(0|full|min|max|fit|\[(\d+(px|vw|vh|%)?)\])($|\s))/g,
// 	JUSTIFY_CONTENT: /(^|\s)(justify-\w+|centered)($|\s)/g,
// 	ALIGN_ITEMS: /(^|\s)(items-\w+|centered)($|\s)/g,
// }

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

	const disabledStyle = useAnimatedStyle(() => {
		let toValue = props.disabled ? CONST.BUTTON_DISABLED_OPACITY : 1
		return {
			opacity: withTiming(toValue, { duration: CONST.ANIMATION.OPACITY_DURATION }),
		}
	})

	return (
		<StyledTouchableOpacity
			onPress={handlePress}
			activeOpacity={0.65}
			containerStyle={[{ opacity: props.disabled ? CONST.BUTTON_DISABLED_OPACITY : 1 }, containerStyle]}
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
