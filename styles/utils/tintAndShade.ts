type RGBObject = { red: number; green: number; blue: number }
type ShadeOrTintFn = (rgb: RGBObject, i: number) => RGBObject

const RE_HEX_COLOR = /^#(\b[0-9A-Fa-f]{3}\b|[0-9A-Fa-f]{6}\b)/

/**
 * Convert a integer ( 0 - 255 ), to a 2-character hex string.
 * The given `rgbint` is rounded to a value between 0 and 255.
 */
const intToHex = (value: number) => {
	let str = Math.min(Math.max(Math.round(value), 0), 255).toString(16)
	// Prepend zeros to a hexadecimal string, if it requires it.
	while (str.length < length) {
		str = '0' + str
	}
	return str
}

const rgbShade: ShadeOrTintFn = (rgb, i) => ({
	red: rgb.red * (1 - 0.1 * i),
	green: rgb.green * (1 - 0.1 * i),
	blue: rgb.blue * (1 - 0.1 * i),
})

const rgbTint: ShadeOrTintFn = (rgb, i) => ({
	red: rgb.red + (255 - rgb.red) * i * 0.1,
	green: rgb.green + (255 - rgb.green) * i * 0.1,
	blue: rgb.blue + (255 - rgb.blue) * i * 0.1,
})

/** Takes a hex string and returns a list of 10 shades of the given color. */
const calculate = (colorValue: string, shadeOrTint: ShadeOrTintFn) => {
	// remove "#" first char.
	colorValue = colorValue.slice(1)

	const rgbObj = {
		red: parseInt(colorValue.slice(0, 2), 16),
		green: parseInt(colorValue.slice(2, 2), 16),
		blue: parseInt(colorValue.slice(4, 2), 16),
	}

	return Array.from({ length: 4 }).map((_, i) => {
		// Convert the RGB to a hex color string.
		const { red, green, blue } = shadeOrTint(rgbObj, i)
		return '#' + intToHex(red) + intToHex(green) + intToHex(blue)
	})
}

const createTintsAndShades = (...colors: string[]) => {
	return colors.map((hexStr) => {
		if (!hexStr.match(RE_HEX_COLOR)) {
			throw new Error(`All arguments must be hexidecimal strings. ( got ${hexStr} )`)
		}

		if (hexStr.length === 4) {
			hexStr = hexStr.split('').reduce((acc, it) => acc + it + it, '#')
		}

		const darker = calculate(hexStr, rgbShade)
		const lighter = calculate(hexStr, rgbTint)

		return [...darker, hexStr, ...lighter].reduce((acc, value, i) => {
			const key = String((i + 1) * 10)
			return { ...acc, [key]: value }
		}, {})
	})

	// const parsedColorsArray = colors.map((item) => {
	// 	if (!item.match(RE_HEX_COLOR)) {
	// 		throw new Error(`All arguments must be hexidecimal strings. ( got ${item} )`)
	// 	}
	// 	if (item.length === 3) {
	// 		return item.split('').reduce((acc, it) => acc + it + it, '')
	// 	}
	// 	return item
	// })

	// if (!parsedColorsArray) {
	// 	return
	// }

	// parsedColorsArray.forEach((colorValue) => {
	// 	// get an array of 10 shades in 10% decrements.
	// 	const calculatedShades = calculate(colorValue, rgbShade).concat('000000')
	// 	// get an array of 10 tints in 10% increments.
	// 	const calculatedTints = calculate(colorValue, rgbTint).concat('ffffff')
	// })

	// return false
}

export default createTintsAndShades
