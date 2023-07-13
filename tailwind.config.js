/** @type {import('tailwindcss').Config} */

const { twTheme } = require('./twTheme');
const twColors = require('./twColors');
const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./App.js', './src/**/*.{js,jsx,ts,tsx}'],
	corePlugins: {
		transitionDuration: false,
		transitionTimingFunction: false,
		transitionDelay: false,
		transitionProperty: false,
		animation: false,
		keyframes: false,
	},
	theme: {
		...twColors,
		...twTheme,
	},
	plugins: [
		plugin(function ({ addComponents }) {
			addComponents({
				'.full': {
					height: '100%',
					width: '100%',
				},
				'.centered': {
					alignItems: 'center',
					justifyContent: 'center',
				},
			});
		}),
	],
};
