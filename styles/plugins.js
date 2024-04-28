const plugin = require('tailwindcss/plugin')

module.exports = {
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
				'.absoluteFill': {
					position: 'absolute',
					top: 0,
					right: 0,
					bottom: 0,
					left: 0,
				},
				'.pt-screen': {
					paddingTop: 75,
				},
				'.px-screen': {
					paddingRight: 15,
					paddingLeft: 15,
				},
				'.h1': {
					fontSize: '60px',
					lineHeight: '75px',
					fontFamily: 'Inter-Bold',
				},
				'.h2': {
					fontSize: '48px',
					lineHeight: '60px',
					fontFamily: 'Inter-SemiBold',
				},
				'.h3': {
					fontSize: '36px',
					lineHeight: '45px',
					fontFamily: 'Inter-SemiBold',
				},
				'.h4': {
					fontSize: '30px',
					lineHeight: '37.5px',
					fontFamily: 'Inter-Medium',
				},
				'.h5': {
					fontSize: '24px',
					lineHeight: '30px',
					fontFamily: 'Inter-Medium',
				},
				'.h6': {
					fontSize: '21px',
					lineHeight: '26.25px',
					fontFamily: 'Inter-Medium',
				},
				'.label-text': {
					fontSize: '18px',
					lineHeight: '22.5px',
					fontFamily: 'Inter',
				},
				'.font-normal': {
					fontFamily: 'Inter',
				},
				'.font-medium': {
					fontFamily: 'Inter-Medium',
				},
				'.font-semibold': {
					fontFamily: 'Inter-SemiBold',
				},
				'.font-bold': {
					fontFamily: 'Inter-Bold',
				},
			})
		}),
		plugin(function ({ matchUtilities, theme }) {
			matchUtilities(
				{
					'resize-mode': (value) => ({
						resizeMode: value,
					}),
				},
				{ values: theme('resizeMode') }
			)
			matchUtilities(
				{
					inset: (value) => ({
						top: value,
						right: value,
						bottom: value,
						left: value,
					}),
				},
				{
					values: theme('spacing'),
					supportsNegativeValues: true,
				}
			)
		}),
	],
}
