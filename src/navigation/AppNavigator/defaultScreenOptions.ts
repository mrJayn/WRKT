import { TextStyle } from 'react-native'
import type { StackNavigationOptions } from '@react-navigation/stack/lib/typescript/src/types'

import CONST from '@src/CONST'
import transitions from '../transitions'

const defaultTextStyle: TextStyle = {
	fontFamily: CONST.FONT_FAMILY.INTER_LIGHT,
	fontSize: 17,
	letterSpacing: 0,
}

const defaultScreenOptions: StackNavigationOptions = {
	cardStyle: {
		flex: 1,
		overflow: 'visible',
	},
	headerShadowVisible: false,
	...transitions.defaultTransition,
}

export default defaultScreenOptions
export { defaultTextStyle }

/*
const colorScheme = Appearance.getColorScheme() || CONST.THEME.DEFAULT

const __defaultStackNavigationOptions: StackNavigationOptions = {
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
}
*/
