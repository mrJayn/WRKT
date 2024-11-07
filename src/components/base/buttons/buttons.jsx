import PropTypes from 'prop-types'
import { View, Text } from 'react-native'
import { styled, useColorScheme } from 'nativewind'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '@colors'

const propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	textStyle: PropTypes.string,
	icon: PropTypes.string,
	iconSize: PropTypes.number,
	iconColor: PropTypes.string,
	containerStyle: PropTypes.string,
}
const defaultProps = {
	type: undefined,
	text: undefined,
	textStyle: '',
	icon: undefined,
	iconSize: 28,
	iconColor: undefined,
	containerStyle: '',
}

const valid_btn_types = ['plain', 'grey', 'tinted', 'filled ', 'text', 'icon']
const tw_styles = {
	plain: {
		btn: 'bg-transparent',
		text: `text-xl font-inter-semibold text-grey dark:text-grey`,
	},
	grey: {
		btn: 'px-5 py-3 bg-grey-20 dark:bg-grey-85/30',
		text: `text-xl font-inter-semibold text-grey-80 dark:text-grey-40`,
	},
	tinted: {
		btn: 'px-5 py-3 bg-slate-30 dark:bg-slate-90',
		text: `text-xl font-inter-semibold text-slate`,
	},
	filled: {
		btn: 'px-5 py-3 bg-blue',
		text: `text-xl font-inter-semibold text-white`,
	},
	text: {
		btn: 'bg-transparent',
		text: `text-base leading-base font-inter-regular text-black dark:text-white`,
	},
	icon: {
		btn: 'p-0',
		text: `text-white`,
	},
}

const getIconColor = (type, isLight) =>
	({
		plain: colors.grey[isLight ? 25 : 75],
		grey: colors.grey[isLight ? 80 : 40],
		tinted: colors.slate[50],
		filled: '#fff',
		icon: isLight ? '#444' : '#666',
	})[type]

export function Button({ type, text, textStyle, icon, iconSize, iconColor, containerStyle, ...props }) {
	const isLight = useColorScheme()?.colorScheme == 'light'

	if (!type || !type in valid_btn_types) {
		type = icon && !text ? 'icon' : text && !icon ? 'text' : 'plain'
	}

	const StyledButton = styled(TouchableOpacity, `centered min-h-[45px] min-w-[45px] rounded-xl ${tw_styles[type].btn}`)
	const StyledText = styled(Text, tw_styles[type].text)

	return (
		<View className={containerStyle}>
			<StyledButton
				activeOpacity={0.65}
				{...props}
			>
				{icon && (
					<Ionicons
						name={icon}
						size={iconSize}
						color={iconColor ?? getIconColor(type, isLight)}
						style={{ width: iconSize - 1 }}
						suppressHighlighting={true}
					/>
				)}
				{text && <StyledText className={textStyle}>{text}</StyledText>}
			</StyledButton>
		</View>
	)
}

Button.displayName = 'Button'
Button.propTypes = propTypes
Button.defaultProps = defaultProps
