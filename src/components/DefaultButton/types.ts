import { TouchableOpacity } from 'react-native-gesture-handler'
import type { IconName } from '@components/Icon'
import { GestureResponderEvent, ViewProps } from 'react-native'
import { Route } from '@src/ROUTES'

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
			onPress?: TouchableOpacity['props']['onPress']
			linkTo?: undefined
			linkToType?: undefined
	  }
	| {
			onPress?: undefined
			linkTo: Route
			linkToType?: string | undefined
	  }

type DefaultButtonProps = TouchableOpacity['props'] & CustomButtonProps & ButtonActionProps

export default DefaultButtonProps
export type { ButtonVariantName, DefaultButtonProps }
export { ButtonVariant }
