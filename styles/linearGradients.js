import { colors } from './colors'

/** Color arrays for the expo Linear Gradient component. */
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

export default linearGradients
