const themeColors = {
	'font-light': '#c8c8c8',
	'font-dark': '#141414',

	main: '#555',
	'main-active': '#777',
	'main-inactive': '#383838',

	nav: '#040404',
	'nav-active': '#282828',
	'nav-inactive': '#141414',
	'nav-font': '#c8c8c8',
	'nav-font-inactive': '#999',
	'nav-font-active': '#eee',

	'btn-bg': '#444',
};
const pallete = {
	white: '#fff',
	black: '#000',
	warmblack: '#090706',
	grey: {
		10: '#f5f5f5',
		20: '#e5e5e5',
		30: '#d4d4d4',
		40: '#a3a3a3',
		50: '#737373',
		60: '#525252',
		70: '#404040',
		80: '#262626',
		90: '#171717',
		DEFAULT: '#737373',
	},
	slate: {
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
	darkgreen: {
		10: '#1d3f21',
		20: '#042a08',
		30: '#042607',
		40: '#032206',
		50: '#031d06',
		60: '#021905',
		70: '#021504',
		80: '#021103',
		90: '#010d02',
		neon: '#498c6b',
		DEFAULT: '#042A08',
	},
	red: '#a00',
};

module.exports = {
	colors: {
		current: 'currentColor',
		transparent: 'transparent',
		...pallete,
		...themeColors,
	},
};
