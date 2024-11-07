import type CONST from '@src/CONST'
import { ValueOf } from '@src/types/utils'
import { colors } from '../colors'
import linearGradients from '@styles/linearGradients'

// type BaseColorKey = { [K in keyof  typeof colors]-?:  typeof colors[K] extends string ? K : never }[keyof  typeof colors]

type ThemePreference = ValueOf<typeof CONST.THEME>

type ThemeName = Exclude<ThemePreference, typeof CONST.THEME.SYSTEM>

type ThemeColors = {
	primary: string
	secondary: string
	tertiary: string
	tint: {
		primary: string
		secondary: string
		tertiary: string
		title: string
		selection: string
		nav: string
		success: string
		error: string
		warning: string
	}
	separator: string
}

type Theme = ThemeColors & {
	/** Current theme type ( e.g. "dark" | "light" ) */
	type: ThemeName

	/** Themed linear gradient color arrays. */
	linearGradients: Record<keyof typeof linearGradients, string[]>
} & Omit<typeof colors, keyof ThemeColors>

export type { Theme, ThemePreference, ThemeName }
