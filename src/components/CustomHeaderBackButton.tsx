import { useCallback } from 'react'
import { I18nManager, Image, ImageSourcePropType, Platform, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { HeaderBackButton } from '@react-navigation/elements'
import reactNavigationBackImage from 'node_modules/@react-navigation/elements/src/assets/back-icon.png'

import { colors } from '@colors'
import { defaultTextStyle } from '@navigation/AppNavigator/defaultScreenOptions'

type CustomHeaderBackButtonProps = {
	label: string
	onPress: () => void
	tintColor?: string
	backImageVisible?: boolean | undefined
	imageSource?: ImageSourcePropType | undefined
}

export default function CustomHeaderBackButton({
	label: customLabel,
	onPress,
	tintColor = colors.blue.neon,
	backImageVisible = true,
	imageSource = reactNavigationBackImage,
}: CustomHeaderBackButtonProps) {
	const navigation = useNavigation()

	const getDefaultLabelText = useCallback(() => {
		const routes = navigation.getState()?.routes
		if (!routes || routes.length < 2) {
			return
		}
		return String(routes[routes.length - 2])
	}, [navigation])

	return (
		<HeaderBackButton
			label={customLabel || getDefaultLabelText() || 'Back'}
			labelVisible={true}
			labelStyle={[defaultTextStyle, { color: tintColor }]}
			onPress={onPress}
			backImage={() => (
				<Image
					source={imageSource}
					fadeDuration={0}
					tintColor={tintColor}
					style={[styles.icon, { opacity: backImageVisible ? 1 : 0 }]}
				/>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	icon: {
		resizeMode: 'contain',
		transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
		...Platform.select({
			ios: {
				height: 21,
				width: 13,
				marginLeft: 8,
				marginRight: 6, //22,
				marginVertical: 12,
			},
			default: {
				height: 24,
				width: 24,
				margin: 3,
			},
		}),
	},
})
