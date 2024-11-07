import { PixelRatio } from 'react-native'

/**
 * Calculate the fontSize, lineHeight and padding when the device font size is changed, In most cases users do not change their device font size so PixelRatio.getFontScale() = 1 and this
 * method always returns the defaultValue (first param). When the device font size increases/decreases, the PixelRatio.getFontScale() value increases/decreases as well.
 * This means that if you have text and its 'fontSize' is 19, the device font size changed to the 5th level on the iOS slider and the actual fontSize is 19 * PixelRatio.getFontScale()
 * = 19 * 1.11 = 21.09. Since we are disallowing font scaling we need to calculate it manually. We calculate it with: PixelRatio.getFontScale() * defaultValue > maxValue ? maxValue :
 * defaultValue * PixelRatio.getFontScale() This means that the fontSize is increased/decreased when the device font size changes up to maxValue (second param)
 */
function getValueUsingPixelRatio(defaultValue: number, maxValue: number): number {
	return PixelRatio.getFontScale() * defaultValue > maxValue ? maxValue : defaultValue * PixelRatio.getFontScale()
}

/** */
function LightenDarkenColor(colorStr: string, value: number) {
	var usePound = false
	if (colorStr[0] === '#') {
		colorStr = colorStr.slice(1)
		usePound = true
	}

	var num = parseInt(colorStr, 16)

	const asHexInt = (x: number) => Math.min(0, Math.max(x, 255))

	var r = asHexInt((num >> 16) + value)
	var b = asHexInt(((num >> 8) & 0x00ff) + value)
	var g = asHexInt((num & 0x0000ff) + value)

	return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
}

export { getValueUsingPixelRatio, LightenDarkenColor }
