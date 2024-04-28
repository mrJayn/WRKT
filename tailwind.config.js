/** @type {import('tailwindcss').Config} */
/**
 * To inspect CSS output run ``` npx tailwind -o output.css ```.
 *
 * Full config path: `tailwindcss/stubs/config.full.js` .
 */

const defaultTheme = require('tailwindcss/defaultTheme')
const { colors } = require('./styles/colors')
const { plugins } = require('./styles/plugins')

const { sans: defaultSans, mono: defaultMono } = defaultTheme.fontFamily

const defaultFontVariants = {
	sans_100: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 100' }],
	sans_200: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 200' }],
	sans_300: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 300' }],
	sans_400: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 400' }],
	sans_500: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 500' }],
	sans_600: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 600' }],
	sans_700: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 700' }],
	sans_800: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 800' }],
	sans_900: [...defaultTheme.fontFamily.sans, { fontVariationSettings: '"wght" 900' }],
	mono: [...defaultTheme.fontFamily.mono],
}

module.exports = {
	content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
	corePlugins: {
		animation: false,
		//
		backdropBlur: false,
		backdropBrightness: false,
		backdropContrast: false,
		backdropGrayscale: false,
		backdropHueRotate: false,
		backdropInvert: false,
		backdropOpacity: false,
		backdropSaturate: false,
		backdropSepia: false,
		//
		keyframes: false,
		transitionDuration: false,
		transitionTimingFunction: false,
		transitionDelay: false,
		transitionProperty: false,
	},
	theme: {
		fontSize: {
			xxs: ['12px', { lineHeight: '15px' }],
			xs: ['14px', { lineHeight: '17.5px' }],
			sm: ['16px', { lineHeight: '20px' }],
			base: ['18px', { lineHeight: '22.5px' }],
			lg: ['21px', { lineHeight: '26.25px' }],
			xl: ['24px', { lineHeight: '30px' }],
			'2xl': ['30px', { lineHeight: '37.5px' }],
			'3xl': ['36px', { lineHeight: '45px' }],
			'4xl': ['48px', { lineHeight: '60px' }],
			'5xl': ['60px', { lineHeight: '75px' }],
			'6xl': ['72px', { lineHeight: '90px' }],
			'7xl': ['96px', { lineHeight: '120px' }],
			'8xl': ['128px', { lineHeight: '160px' }],
			'9xl': ['160px', { lineHeight: '200px' }],
		},
		fontFamily: {
			raleway: ['Raleway'],
			'raleway-bold': ['Raleway-Bold'],
			'raleway-medium': ['Raleway-Medium'],
			'raleway-semibold': ['Raleway-SemiBold'],
			//
			'inter-thin': ['Inter-Thin', ...defaultFontVariants.sans_100],
			'inter-extralight': ['Inter-ExtraLight', defaultFontVariants.sans_200],
			'inter-light': ['Inter-Light', defaultFontVariants.sans_300],
			'inter-regular': ['Inter', defaultFontVariants.sans_400],
			'inter-medium': ['Inter-Medium', defaultFontVariants.sans_500],
			'inter-semibold': ['Inter-SemiBold', defaultFontVariants.sans_600],
			'inter-bold': ['Inter-Bold', defaultFontVariants.sans_700],
			'inter-extrabold': ['Inter-ExtraBold', defaultFontVariants.sans_800],
			'inter-black': ['Inter-Black', defaultFontVariants.sans_900],
			//
			inconsolata: ['Inconsolata', ...defaultFontVariants.mono],
		},
		lineHeight: {
			xs: '14px',
			sm: '16px',
			base: '18px',
			lg: '21px',
			xl: '24px',
			'2xl': '30px',
			'3xl': '36px',
			'4xl': '48px',
			'5xl': '60px',
			'6xl': '72px',
			'7xl': '96px',
			'8xl': '128px',
			'9xl': '160px',
		},
		letterSpacing: {
			'1/4': '0.25px',
			'1/2': '0.5px',
			1: '1px',
		},
		zIndex: {
			0: '0',
			1: '1',
			2: '2',
			3: '3',
			4: '4',
			5: '5',
		},
		spacing: {
			px: '1px',
			0: '0px',
			0.5: '2.5px',
			1: '5px',
			1.5: '7.5px',
			2: '10px',
			2.5: '12.5px',
			3: '15px',
			3.5: '17.5px',
			4: '20px',
			5: '25px',
			6: '30px',
			7: '35px',
			8: '40px',
			9: '45px',
			10: '50px',
			12: '60px',
			14: '70px',
			16: '80px',
			18: '90px',
			20: '100px',
			24: '120px',
			28: '140px',
			32: '160px',
			36: '180px',
			40: '200px',
			44: '220px',
			48: '240px',
			52: '260px',
			56: '280px',
			60: '300px',
			64: '320px',
			72: '360px',
			80: '400px',
			96: '480px',
		},
		resizeMode: {
			cover: 'cover',
			contain: 'contain',
			stretch: 'stretch',
			repeat: 'repeat',
			center: 'center',
		},
		colors,
		extend: {},
	},
	plugins,
}
