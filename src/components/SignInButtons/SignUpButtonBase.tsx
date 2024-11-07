import CONST from '@src/CONST'
import DefaultButton from '@components/DefaultButton'
import type { IconName } from '@components/Icon'

type SignInButtonBaseProps = {
	text?: string
	icon?: IconName
	onPress: () => void
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
