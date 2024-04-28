import { ColorSchemeName } from 'react-native'
import { colors } from '@colors'
import { ButtonVariant, ButtonVariantName } from './types'

const buttonTwBase = 'min-h-[45px] min-w-[45px] centered'

export default function (variant: ButtonVariantName, colorScheme: ColorSchemeName) {
	colorScheme = colorScheme || 'dark'

	switch (variant) {
		case ButtonVariant.grey:
			/** monotone  */
			return {
				buttonTw: `px-5 py-2 bg-grey-20 dark:bg-grey-85/30 rounded-xl ${buttonTwBase}`,
				textTw: `font-inter-medium text-grey-80 dark:text-grey-40`,
				iconColor: colors.grey[colorScheme === 'dark' ? 40 : 80],
			}
		case ButtonVariant.filled:
			/** colored button  */
			return {
				buttonTw: `px-5 py-3 bg-darkgreen-10 rounded-full ${buttonTwBase}`,
				textTw: `font-inter-semibold text-primary-dark dark:text-primary-dark`,
				iconColor: colors.white,
			}
		case ButtonVariant.plainText:
			/** plain text button (e.g. an inline link) */
			return {
				buttonTw: buttonTwBase,
				textTw: 'text-black dark:text-white',
				iconColor: undefined,
			}
		case ButtonVariant.icon:
			/** icon primary button */
			return {
				buttonTw: buttonTwBase,
				textTw: 'text-grey-75 dark:text-grey-60',
				iconColor: colors.grey[colorScheme === 'dark' ? 60 : 75],
			}
		case ButtonVariant.outline:
			return {
				buttonTw: `p-3 border-2 border-separator-light dark:border-separator-dark rounded-full ${buttonTwBase}`,
				textTw: `font-inter-semibold text-sm`,
				iconColor: colors.tint.primary[colorScheme],
			}
		case ButtonVariant.header:
			return {
				buttonTw: buttonTwBase,
				textTw: 'font-inter-light text-[17] leading-[17] tracking-[0]',
				iconColor: undefined,
			}
		default:
			/** normal button */
			return {
				buttonTw: buttonTwBase,
				textTw: '',
				iconColor: colors.tint.primary[colorScheme],
			}
	}
}
