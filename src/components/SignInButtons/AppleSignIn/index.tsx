import { View } from 'react-native'
import * as AppleAuthentication from 'expo-apple-authentication'
import SignInButtonBase from '../SignUpButtonBase'

function AppleSignIn() {
	const handlePress = async () => {
		try {
			const credential = await AppleAuthentication.signInAsync({
				requestedScopes: [AppleAuthentication.AppleAuthenticationScope.EMAIL],
			})
			console.log('[ AppleSignIn ] credential=', credential)
			// signed in
		} catch (error) {
			let e = error as { code: string }
			if (e.code === 'ERR_REQUEST_CANCELED') {
				// handle that the user canceled the sign-in flow
			} else {
				// handle other errors
			}
		}
	}

	return (
		<SignInButtonBase
			text='Continue with Apple'
			icon='apple'
			onPress={handlePress}
		/>
	)

	return (
		<View className='border-2 border-separator-dark rounded-full'>
			<AppleAuthentication.AppleAuthenticationButton
				buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
				buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
				className='h-9 w-full'
				cornerRadius={999}
				onPress={handlePress}
			/>
		</View>
	)
}

AppleSignIn.displayName = 'AppleSignIn'

export default AppleSignIn
