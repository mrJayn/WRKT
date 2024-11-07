import { I18nManager, Image, Platform, StyleSheet } from 'react-native'
import { HeaderBackButton as RNHeaderBackButton } from '@react-navigation/elements'
import reactNavigationBackImage from 'node_modules/@react-navigation/elements/src/assets/back-icon.png'
import { theme } from 'tailwind.config'

import Navigation from '@navigation/Navigation'
import { BackImageStyle, HeaderBackButtonProps, HeaderButtonBackImageProps } from './types'

const HeaderButtonBackImage = ({ style, source, ...props }: HeaderButtonBackImageProps) => (
	<Image
		style={[backImageStyle as BackImageStyle, style]}
		source={source ?? reactNavigationBackImage}
		fadeDuration={0}
		{...props}
	/>
)

function HeaderBackButton({
	label: customLabel,
	onPress,
	tintColor = theme.colors.blue.neon,
	backImageVisible = true,
	imageSource = reactNavigationBackImage,
	...props
}: HeaderBackButtonProps) {
	const label = customLabel || Navigation.getPrevRouteName() || 'Back'

	const handlePress = onPress ?? Navigation.goBack

	return (
		<RNHeaderBackButton
			label={label}
			labelVisible={true}
			labelStyle={[styles.label, { color: tintColor }]}
			onPress={handlePress}
			backImage={() => (
				<HeaderButtonBackImage
					style={{
						tintColor,
						opacity: backImageVisible ? 1 : 0,
					}}
					source={imageSource}
				/>
			)}
			{...props}
		/>
	)
}

const backImageStyle = Platform.select({
	ios: {
		height: 21,
		width: 13,
		marginTop: 12,
		marginRight: 6,
		marginBotttom: 12,
		marginLeft: 8,
		resizeMode: 'contain',
		transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
	},
	default: {
		height: 24,
		width: 24,
		marginTop: 3,
		marginRight: 3,
		marginBotttom: 3,
		marginLeft: 3,
		resizeMode: 'contain',
		transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
	},
})

const styles = StyleSheet.create({
	label: {
		fontSize: 17,
		fontFamily: 'Inter-Medium',
		letterSpacing: 0,
	},
	icon: backImageStyle,
})

export default HeaderBackButton

export { HeaderButtonBackImage, backImageStyle }
