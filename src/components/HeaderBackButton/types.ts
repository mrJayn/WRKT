import type { ImageSourcePropType, ImageProps, StyleProp, ImageStyle } from 'react-native'

import type { HeaderBackButtonProps as RNHeaderBackButtonProps } from '@react-navigation/elements'

export type HeaderBackButtonProps = Omit<RNHeaderBackButtonProps, 'backImage'> & {
	backImageVisible?: boolean
	imageSource?: ImageSourcePropType
}

export type HeaderButtonBackImageProps = Omit<ImageProps, 'source'> & {
	source?: ImageProps['source'] | undefined
}

export type BackImageStyle = StyleProp<ImageStyle>
