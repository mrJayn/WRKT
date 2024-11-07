export const Icons = {
	icon: require(`assets/icons/icon.png`),
	adaptiveIcon: require(`assets/icons/adaptive-icon.png`),
	maskedIcon: require(`assets/icons/inverse-adaptive-icon.png`),
	favicon: require(`assets/icons/favicon.png`),
} as const

export const Fonts = {
	'Inter-Thin': require(`assets/fonts/Inter/Inter-100.ttf`),
	'Inter-ExtraLight': require(`assets/fonts/Inter/Inter-200.ttf`),
	'Inter-Light': require(`assets/fonts/Inter/Inter-300.ttf`),
	Inter: require(`assets/fonts/Inter/Inter-400.ttf`),
	'Inter-Medium': require(`assets/fonts/Inter/Inter-500.ttf`),
	'Inter-SemiBold': require(`assets/fonts/Inter/Inter-600.ttf`),
	'Inter-Bold': require(`assets/fonts/Inter/Inter-700.ttf`),
	'Inter-ExtraBold': require(`assets/fonts/Inter/Inter-800.ttf`),
	'Inter-Black': require(`assets/fonts/Inter/Inter-900.ttf`),
	//
	Inconsolata: require(`assets/fonts/Inconsolata-Regular.ttf`),
	//
	Raleway: require(`assets/fonts/Raleway-Regular.ttf`),
	'Raleway-Medium': require(`assets/fonts/Raleway-Medium.ttf`),
	'Raleway-SemiBold': require(`assets/fonts/Raleway-SemiBold.ttf`),
	'Raleway-Bold': require(`assets/fonts/Raleway-Bold.ttf`),
} as const

export default { Icons, Fonts }
