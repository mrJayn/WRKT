import type { ViewProps } from 'react-native'
import type { TouchableOpacityProps } from 'react-native-gesture-handler'
import type { Route } from '@src/ROUTES'
import type { IconName } from '@components/Icon'

enum ButtonVariant {
	grey = 'grey',
	filled = 'filled',
	icon = 'icon',
	plainText = 'plainText',
	outline = 'outline',
	header = 'header',
}

type ButtonVariantName = keyof typeof ButtonVariant | undefined

type CustomButtonProps = {
	/** Button preset style name. */
	variant?: ButtonVariantName

	/** Button text. */
	text?: string

	/** Text component className. */
	textClassName?: ViewProps['className']

	/** Icon component name.  */
	icon?: IconName

	/** Icon component size.  */
	iconSize?: number

	/** Icon component tint color.  */
	iconColor?: string
}

type ButtonActionProps =
	| {
			onPress?: (() => void) | undefined
			linkTo?: undefined
			linkToType?: undefined
	  }
	| {
			onPress?: undefined
			linkTo: Route
			linkToType?: string | undefined
	  }

type DefaultButtonProps = TouchableOpacityProps & CustomButtonProps & ButtonActionProps

export type { ButtonVariantName, DefaultButtonProps }
export { ButtonVariant }
