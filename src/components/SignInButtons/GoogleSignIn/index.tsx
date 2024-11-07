import SignInButtonBase from '../SignUpButtonBase'

/**
 * @react-native-google-signin/google-signin
 *
 * https://github.com/Expensify/App/blob/main/src/components/SignInButtons/GoogleSignIn/index.native.tsx
 */

function GoogleSignIn() {
	return (
		<SignInButtonBase
			text='Continue with Google'
			icon='google'
			onPress={() => {
				console.log('Sign in with goole.')
			}}
		/>
	)
}

GoogleSignIn.displayName = 'GoogleSignIn'

export default GoogleSignIn
