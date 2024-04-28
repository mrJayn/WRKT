import type { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types'
import { colors } from '@colors'
import CONST from '@src/CONST'
import { Appearance, TextStyle } from 'react-native'
import transitions from '@navigation/transitions'

const colorScheme = Appearance.getColorScheme() || CONST.THEME.DEFAULT

const defaultTextStyle: TextStyle = {
	fontFamily: CONST.FONT_FAMILY.INTER_LIGHT,
	fontSize: 17,
	// lineHeight: 17,
	letterSpacing: 0,
	// color: colors.tint.tertiary[colorScheme],
}

const defaultScreenOptions: StackNavigationOptions = {
	// Card options.
	cardStyle: {
		flex: 1,
		overflow: 'visible',
	},

	// Header options.
	headerShadowVisible: false,

	// Title text options.
	headerTitleAllowFontScaling: false,
	headerTitleStyle: {
		...defaultTextStyle,
		fontFamily: CONST.FONT_FAMILY.INTER_MEDIUM,
		color: colors.tint.title[colorScheme],
	},

	// Back button title text.
	headerBackAllowFontScaling: false,
	headerBackTitleStyle: defaultTextStyle,
	headerBackTitleVisible: false,

	// Transition options.
	...transitions.defaultTransition,
}

export default defaultScreenOptions

export { defaultTextStyle }
