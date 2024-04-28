import { colors } from '@colors'
import { ColorSchemeName } from 'react-native'

/** static tint colors */
const { success, warning, error, nav } = colors.tint

const colorTheme = (colorSchemeName: ColorSchemeName) => {
	let colorScheme = colorSchemeName || 'dark'

	return {
		primary: colors.white,
		secondary: colors.secondary[colorScheme],
		tertiary: colors.tertiary[colorScheme],
		tint: {
			text: colors.tint.primary[colorScheme],
			title: colors.tint.title[colorScheme],
			success,
			error,
			warning,
			nav,
		},
		separator: colors.separator[colorScheme],
	}
}
