import DefaultButton, { DefaultButtonProps } from '@components/DefaultButton'
import CONST from '@src/CONST'

type LinkableSocials = 'Google' | 'Facebook' | 'Apple'

type SignInButtonBaseProps = {
	text?: string
	icon?: DefaultButtonProps['icon']
	onPress: DefaultButtonProps['onPress']
}

function SignInButtonBase({ text, icon, onPress }: SignInButtonBaseProps) {
	return (
		<DefaultButton
			text={text}
			icon={icon}
			onPress={onPress}
			iconSize={20}
			variant='outline'
			textClassName='flex-1 text-center'
			className='flex-row mb-2'
			role={CONST.ROLE.BUTTON}
		/>
	)
}

SignInButtonBase.displayName = 'SignInButtonBase'

export default SignInButtonBase
