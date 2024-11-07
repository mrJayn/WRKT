import { LightenDarkenColor } from './utils'

const BASE = {
	white: '#ffffff',
	black: '#000000',
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
	grey: {
		1: '#f8f8f8', // 248 248 248
		5: '#f3f3f3', // 243 243 243
		10: '#e7e7e7', // 231 231 231
		15: '#dbdbdb', // 219 219 219
		20: '#cfcfcf', // 207 207 207
		25: '#c4c4c4', // 196 196 196
		30: '#b8b8b8', // 184 184 184
		35: '#acacac', // 172 172 172
		40: '#a0a0a0', // 160 160 160
		45: '#949494', // 148 148 148
		50: '#888888', // 136 136 136
		55: '#7a7a7a', // 122 122 122
		60: '#6d6d6d', // 109 109 109
		65: '#5f5f5f', // 95 95 95
		70: '#525252', // 82 82 82
		75: '#444444', // 68 68 68
		80: '#303030', // 48 48 48
		85: '#222222', // 34 34 34
		90: '#141414', // 20 20 20
		95: '#070707', // 7 7 7
		DEFAULT: '#888888',
	},
} as const

const pallete = {
	primary: '#0c0c0c',
	secondary: '#101010',
	tertiary: '#202020',
} as const

const themeColors = {
	primary: pallete.primary,
	secondary: pallete.secondary,
	tertiary: pallete.tertiary,

	/** button, link, and input background color */
	button: {
		DEFAULT: '#52796f',
		hover: LightenDarkenColor('#52796f', 10),
		active: LightenDarkenColor('#52796f', -50),
	},

	/** highlighted background color */
	selection: BASE.grey[50],

	/** highlighted background color */
	separator: '#ffffff10',

	tint: {
		primary: BASE.grey[15],
		secondary: BASE.grey[45],
		tertiary: BASE.grey[55],

		/** button, link, and input text color */
		button: BASE.white,

		/** highlighted text and cursor color */
		selection: BASE.white,
	},

	/** utility colors */
	success: '#248a3d',
	error: '#7c2525',
	danger: '#7c2525',
	warning: '#ffd426',
	info: '#007aff',
} as const

const colors = {
	...themeColors,
	...pallete,
}

export default colors
