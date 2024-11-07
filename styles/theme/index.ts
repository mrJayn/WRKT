import CONST from '@src/CONST'
import type { Theme, ThemeName } from './types'
import { colors } from '../colors'
import linearGradientColors from '../linearGradients'

const { primary, secondary, tertiary, tint, separator, ...pallete } = colors

const getTheme = (theme: ThemeName): Theme => ({
	type: theme,

	primary: primary[theme],
	secondary: secondary[theme],
	tertiary: tertiary[theme],

	tint: {
		primary: tint.primary[theme],
		secondary: tint.secondary[theme],
		tertiary: tint.tertiary[theme],
		title: tint.title[theme],
		selection: tint.selection[theme],
		/** static tint colors */
		nav: tint.nav,
		success: tint.success,
		warning: tint.warning,
		error: tint.error,
	},

	separator: separator[theme],

	...pallete,

	linearGradients: {
		primary: linearGradientColors.primary[theme],
		secondary: linearGradientColors.secondary[theme],
	},
})

const theme = {
	[CONST.THEME.LIGHT]: getTheme(CONST.THEME.LIGHT),
	[CONST.THEME.DARK]: getTheme(CONST.THEME.DARK),
} satisfies Record<ThemeName, Theme>

export default theme

export const defaultTheme = theme[CONST.THEME.FALLBACK]
