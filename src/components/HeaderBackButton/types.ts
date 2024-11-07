import type { ImageSourcePropType, ImageProps, StyleProp, ImageStyle } from 'react-native'
import type { HeaderBackButtonProps as RNHeaderBackButtonProps } from '@react-navigation/elements'

type HeaderBackButtonProps = Omit<RNHeaderBackButtonProps, 'backImage'> & {
	backImageVisible?: boolean
	imageSource?: ImageSourcePropType
}

type HeaderButtonBackImageProps = Omit<ImageProps, 'source'> & {
	source?: ImageProps['source'] | undefined
}

type BackImageStyle = StyleProp<ImageStyle>

export type { HeaderBackButtonProps, HeaderButtonBackImageProps, BackImageStyle }
