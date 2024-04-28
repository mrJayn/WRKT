import { colors } from './colors'

/**
 * Expo linear gradient color range values.
 */

const linearGradients = {
	primary: {
		dark: [colors.primary.dark, colors.black],
		light: [colors.primary.light, colors.grey[15]],
	},

	secondary: {
		dark: [colors.grey[95], colors.black],
		light: [colors.secondary.light, colors.grey[45]],
	},
}

export type GradientColorsKey = keyof typeof linearGradients

export default linearGradients
