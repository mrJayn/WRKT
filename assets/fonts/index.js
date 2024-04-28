// const Monserrat = {
// 	'Monserrat-Thin': require(`./Montserrat/Montserrat-100.ttf`),
// 	'Monserrat-ExtraLight': require(`./Montserrat/Montserrat-200.ttf`),
// 	'Monserrat-Light': require(`./Montserrat/Montserrat-300.ttf`),
// 	Monserrat: require(`./Montserrat/Montserrat-400.ttf`),
// 	'Monserrat-Medium': require(`./Montserrat/Montserrat-500.ttf`),
// 	'Monserrat-SemiBold': require(`./Montserrat/Montserrat-600.ttf`),
// 	'Monserrat-Bold': require(`./Montserrat/Montserrat-700.ttf`),
// 	'Monserrat-ExtraBold': require(`./Montserrat/Montserrat-800.ttf`),
// 	'Monserrat-Black': require(`./Montserrat/Montserrat-900.ttf`),
// }

const Inter = {
	'Inter-Thin': require(`./Inter/Inter-100.ttf`),
	'Inter-ExtraLight': require(`./Inter/Inter-200.ttf`),
	'Inter-Light': require(`./Inter/Inter-300.ttf`),
	Inter: require(`./Inter/Inter-400.ttf`),
	'Inter-Medium': require(`./Inter/Inter-500.ttf`),
	'Inter-SemiBold': require(`./Inter/Inter-600.ttf`),
	'Inter-Bold': require(`./Inter/Inter-700.ttf`),
	'Inter-ExtraBold': require(`./Inter/Inter-800.ttf`),
	'Inter-Black': require(`./Inter/Inter-900.ttf`),
}

const Raleway = {
	Raleway: require(`./Raleway-Regular.ttf`),
	'Raleway-Medium': require(`./Raleway-Medium.ttf`),
	'Raleway-SemiBold': require(`./Raleway-SemiBold.ttf`),
	'Raleway-Bold': require(`./Raleway-Bold.ttf`),
}

const Inconsolata = {
	Inconsolata: require(`./Inconsolata-Regular.ttf`),
}

module.exports = {
	...Inter,
	...Raleway,
	...Inconsolata,
}
