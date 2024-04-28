import { I18nManager, Image, ImageSourcePropType, Platform, StyleSheet } from 'react-native'
import { HeaderBackButton } from '@react-navigation/elements'
import { colors } from '@colors'

import reactNavigationBackImage from 'node_modules/@react-navigation/elements/src/assets/back-icon.png'
import _ from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { defaultTextStyle } from '@navigation/AppNavigator/defaultScreenOptions'

type Props = {
	label: string
	onPress: () => void
	tintColor?: string | null | undefined
	backImageVisible?: boolean | undefined
	imageSource?: ImageSourcePropType | undefined
}

const getPrevRouteName = () => {
	const { getState } = useNavigation()
	const { routes } = getState()
	const prevRouteName = routes[routes.length - 2]
	return _.isString(prevRouteName) && prevRouteName
}

export default function CustomHeaderBackButton({
	label: customLabel,
	onPress,
	tintColor: customTintColor,
	backImageVisible = true,
	imageSource = reactNavigationBackImage,
}: Props) {
	const label = customLabel || getPrevRouteName() || 'Back'
	const tintColor = customTintColor ?? colors.blue.neon

	return (
		<HeaderBackButton
			label={label}
			labelVisible={true}
			labelStyle={{
				...defaultTextStyle,
				color: tintColor,
			}}
			onPress={onPress}
			backImage={() => (
				<Image
					style={[styles.icon, { tintColor, opacity: backImageVisible ? 1 : 0 }]}
					source={imageSource}
					fadeDuration={0}
				/>
			)}
		/>
	)
}

const styles = StyleSheet.create({
	icon: Platform.select({
		ios: {
			height: 21,
			width: 13,
			marginLeft: 8,
			marginRight: 6, //22,
			marginVertical: 12,
			resizeMode: 'contain',
			transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
		},
		default: {
			height: 24,
			width: 24,
			margin: 3,
			resizeMode: 'contain',
			transform: [{ scaleX: I18nManager.getConstants().isRTL ? -1 : 1 }],
		},
	}),
})
