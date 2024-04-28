import CONST from '@src/CONST'
import type { ThemeColors, ThemeName } from './types'
import { colors } from '..'

const { nav, success, warning, error, ...tint } = colors.tint

const getThemeColors = (theme: ThemeName): ThemeColors => ({
	bg: {
		primary: colors.primary[theme],
		secondary: colors.secondary[theme],
		tertiary: colors.tertiary[theme],
	},

	text: {
		primary: tint.primary[theme],
		secondary: tint.secondary[theme],
		tertiary: tint.tertiary[theme],
		heading: tint.title[theme],
		/** static tint colors */
		nav,
		success,
		warning,
		error,
	},

	separator: colors.separator[theme],

	white: colors.white,
	black: colors.black,
	transparent: colors.transparent,
})

const themes = {
	[CONST.THEME.LIGHT]: getThemeColors(CONST.THEME.LIGHT),
	[CONST.THEME.DARK]: getThemeColors(CONST.THEME.DARK),
} satisfies Record<ThemeName, ThemeColors>

export default themes

export const defaultTheme = themes[CONST.THEME.FALLBACK]
