const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ matchUtilities, theme }) {
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
})
