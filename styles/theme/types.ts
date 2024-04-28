import type CONST from '@src/CONST'
import { ValueOf } from '@src/types/utils'

type Color = string

type ThemePreference = ValueOf<typeof CONST.THEME>

type ThemeName = Exclude<ThemePreference, typeof CONST.THEME.SYSTEM>

type ThemeColors = {
	bg: {
		primary: Color
		secondary: Color
		tertiary: Color
	}
	text: {
		primary: Color
		secondary: Color
		tertiary: Color

		heading: Color
		nav: Color

		success: Color
		error: Color
		warning: Color
	}
	//
	separator: Color
	//
	white: Color
	black: Color
	transparent: Color
}

export type { ThemePreference, ThemeName, ThemeColors, Color }
