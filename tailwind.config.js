/** @type {import('tailwindcss').Config} */
/**
 * To inspect CSS output run ``` npx tailwind -o output.css ```.
 *
 * Full config path: `tailwindcss/stubs/config.full.js` .
 */

const themeConfig = require('./tailwind/theme.cjs')
const pluginsConfig = require('./tailwind/plugins.cjs')

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
	theme: themeConfig,
	plugins: pluginsConfig,
}
