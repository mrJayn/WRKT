import React, { useEffect } from 'react'
import { View } from 'react-native'
import { Controller } from 'react-hook-form'
import { HeaderBackButton } from '@react-navigation/elements'
//
import SCREENS from '@src/SCREENS'
import Navigation from '@navigation/Navigation'
import { RootStackScreenProps } from '@navigation/types'
import { LoginSchema } from '@libs/Schema'
import { useLoginMutation } from '@features/auth/authApi'
import useYupForm from '@hooks/useYupForm'
import DefaultButton from '@components/DefaultButton'
import FormTextInput from '@components/FormTextInput'
import P from '@components/P'
import FormLayout from '@components/FormLayout'
import Icon from '@components/Icon'
import ROUTES from '@src/ROUTES'

type LoginScreenProps = RootStackScreenProps<typeof SCREENS.LOGIN>

const ChevronUpBackImage = () => (
	<View className='h-12 w-full centered'>
		<Icon
			name={'chevron-up'}
			size={32}
		/>
		<P className='absolute bottom-0 text-xs uppercase tracking-1'>Back</P>
	</View>
)

function LoginScreen({ route }: LoginScreenProps) {
	const initialEmail = route.params.email || ''

	const [login, { isLoading, isSuccess }] = useLoginMutation()
	const { control, handleSubmit, formState, setValue, setFocus, setError, reset } = useYupForm({
		schema: LoginSchema,
		defaultValues: { email: '', password: '' },
	})

	const onSubmit = handleSubmit(async ({ email, password }) => {
		try {
			await login({ email, password }).unwrap()
			reset()
		} catch {
			console.log('Invalid Credentials.')
			setError('email', { type: 'incorrect' })
			setError('password', {
				type: 'incorrect',
				message: 'The email and password combination is incorrect.',
			})
		}
	})

	const navigateToRegister = () => {
		Navigation.navigate(ROUTES.REGISTER, 'REPLACE')
	}

	const navigateToForgotPassword = () => {
		Navigation.navigate(ROUTES.FORGOT_PASSWORD)
	}

	const handleGoBack = () => {
		Navigation.goBack({ shouldPopToTop: true })
	}

	const formHeaderComponent = () => (
		<HeaderBackButton
			allowFontScaling={false}
			backImage={ChevronUpBackImage}
			labelVisible={false}
			onPress={handleGoBack}
			pressOpacity={0.6}
			style={{ height: 50 }}
		/>
	)

	const FormFooterComponent = () => (
		<View className='absolute bottom-0 inset-x-0 h-20 flex-row centered gap-x-2 z-1'>
			<P>Don't have an account yet?</P>
			<DefaultButton
				text='Sign up now'
				onPress={navigateToRegister}
				variant='plainText'
			/>
		</View>
	)

	/**
	 * If an email was passed in the params,
	 * set the field value when the screen mounts.
	 */
	useEffect(() => {
		if (!!initialEmail) {
			setValue('email', initialEmail)
		}
	}, [])

	return (
		<FormLayout
			title='Login'
			formHeaderComponent={formHeaderComponent}
			formFooterComponent={FormFooterComponent}
			submitButtonLabel='Login'
			onSubmit={onSubmit}
			isValid={formState.isValid}
			isLoading={isLoading}
			isComplete={isSuccess}
		>
			<Controller
				name='email'
				control={control}
				render={({ field, fieldState }) => (
					<FormTextInput
						value={field.value}
						ref={field.ref}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						//
						label='Email Address'
						forceError={!!fieldState.error}
						//
						autoFocus={true}
						autoComplete='email'
						inputMode='email'
						keyboardType='email-address'
						textContentType='emailAddress'
						returnKeyLabel='Next'
						returnKeyType='next'
						onSubmitEditing={() => setFocus('password')}
						blurOnSubmit={false}
					/>
				)}
			/>

			<Controller
				name='password'
				control={control}
				render={({ field, fieldState: { error, isDirty } }) => (
					<FormTextInput
						value={field.value}
						ref={field.ref}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						errorText={error?.message}
						//
						label='Password'
						keyboardType='visible-password'
						textContentType='password'
						secureTextEntry={true}
						returnKeyLabel='Done'
						returnKeyType='done'
						blurOnSubmit={formState.isValid}
						onSubmitEditing={() => {
							if (formState.isValid) {
								onSubmit()
							} else {
								setFocus('email')
							}
						}}
					/>
				)}
			/>

			<View className='items-end'>
				<DefaultButton
					variant='plainText'
					text='Forgot Password?'
					onPress={navigateToForgotPassword}
					textClassName='text-xs'
					className='justify-start'
				/>
			</View>
		</FormLayout>
	)
}

LoginScreen.displayName = 'LoginScreen'

export default LoginScreen
