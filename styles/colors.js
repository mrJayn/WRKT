//const { platformSelect, platformColor } = require('nativewind')

/** search and fix....
 * "-title"
 *
 */

const BASE = {
	red: '#a00',
	orange: '#ff9500',
	yellow: '#ffd426',
	green: '#248a3d',
	cyan: '#00c7be',
	blue: '#0271a4',
	indigo: '#3634a3',
	purple: '#8944ab',
	pink: '#ff6482',
	brown: '#7f6545',
}

const pallete = {
	transparent: 'transparent',
	white: '#ffffff',
	black: '#000000',
	red: {
		DEFAULT: '#a00',
	},
	darkgreen: {
		/** Very dark (mostly black) lime green */
		10: '#1d3f21',
		20: '#042a08',
		30: '#042607',
		40: '#032206',
		50: '#031d06',
		60: '#021905',
		70: '#021504',
		80: '#021103',
		90: '#010601',
		neon: '#498c6b',
		DEFAULT: '#042A08',
	},
	slate: {
		/** Dark grayish blue. */
		10: '#dce1ea',
		20: '#c5cddd',
		30: '#aeb9cf',
		40: '#939db2',
		50: '#78859e',
		60: '#697791',
		70: '#4e5c75',
		80: '#354157',
		90: '#283347',
		neon: '#6199ff',
		DEFAULT: '#78859e',
	},
	blue: {
		10: '#dbe5f0',
		20: '#b8cbe1',
		30: '#94b1d1',
		40: '#7197c2',
		50: '#4d7db3',
		60: '#3e648f',
		70: '#2e4b6b',
		80: '#1f3248',
		90: '#0f1924',
		neon: '#007AFF',
		DEFAULT: '#4d7db3',
	},
	grey: {
		1: '#f8f8f8',
		5: '#f3f3f3',
		10: '#e7e7e7',
		15: '#dbdbdb',
		20: '#cfcfcf',
		25: '#c4c4c4',
		30: '#b8b8b8',
		35: '#acacac',
		40: '#a0a0a0',
		45: '#949494',
		50: '#888888',
		55: '#7a7a7a',
		60: '#6d6d6d',
		65: '#5f5f5f',
		70: '#525252',
		75: '#444444',
		80: '#303030',
		85: '#222222',
		90: '#141414',
		95: '#070707',
		DEFAULT: '#888888',
	},
}

const colors = {
	...pallete,

	/** background colors */
	primary: {
		light: pallete.white,
		dark: '#0c0c0c',
	},
	secondary: {
		light: pallete.grey[15],
		dark: '#101010',
	},
	tertiary: {
		light: '#efefef',
		dark: '#202020',
	},

	/** text colors */
	tint: {
		primary: {
			light: pallete.grey[85],
			dark: pallete.grey[15],
		},
		secondary: {
			light: pallete.grey[55],
			dark: pallete.grey[45],
		},
		tertiary: {
			light: pallete.grey[45],
			dark: pallete.grey[55],
		},

		/** title or heading text colors */
		title: {
			light: pallete.grey[90],
			dark: pallete.grey[10],
		},

		/** highlight and cursor color of the text */
		selection: {
			light: pallete.grey[50],
			dark: pallete.grey[50],
		},

		/** generic text colors */
		success: BASE.green,
		error: BASE.red,
		warning: BASE.yellow,
		nav: pallete.blue.neon,
		// link: BASE.cyan,  'link-visited': BASE.indigo
	},

	/** border colors */
	separator: {
		light: pallete.grey[5],
		dark: '#fff1',
	},
}

module.exports = {
	colors,
}
