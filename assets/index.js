const Inter = {
	'Inter-Thin': require(`./fonts/Inter/Inter-100.ttf`),
	'Inter-ExtraLight': require(`./fonts/Inter/Inter-200.ttf`),
	'Inter-Light': require(`./fonts/Inter/Inter-300.ttf`),
	Inter: require(`./fonts/Inter/Inter-400.ttf`),
	'Inter-Medium': require(`./fonts/Inter/Inter-500.ttf`),
	'Inter-SemiBold': require(`./fonts/Inter/Inter-600.ttf`),
	'Inter-Bold': require(`./fonts/Inter/Inter-700.ttf`),
	'Inter-ExtraBold': require(`./fonts/Inter/Inter-800.ttf`),
	'Inter-Black': require(`./fonts/Inter/Inter-900.ttf`),
}

const Raleway = {
	Raleway: require(`./fonts/Raleway-Regular.ttf`),
	'Raleway-Medium': require(`./fonts/Raleway-Medium.ttf`),
	'Raleway-SemiBold': require(`./fonts/Raleway-SemiBold.ttf`),
	'Raleway-Bold': require(`./fonts/Raleway-Bold.ttf`),
}

module.exports = {
	Icons: {
		icon: require(`./icons/icon.png`),
		adaptiveIcon: require(`./icons/adaptive-icon.png`),
		maskedIcon: require(`./icons/inverse-adaptive-icon.png`),
		favicon: require(`./icons/favicon.png`),
	},
	Fonts: {
		...Inter,
		...Raleway,
		Inconsolata: require(`./fonts/Inconsolata-Regular.ttf`),
	},
}
