import React, { useEffect, useMemo } from 'react'
import { Controller } from 'react-hook-form'
import ROUTES from '@src/ROUTES'
import Navigation from '@navigation/Navigation'
import { emailFormSchema } from '@libs/Schema'
import authApi from '@features/auth/authApi'
import useYupForm from '@hooks/useYupForm'
import FormTextInput from '@components/FormTextInput'
import FormLayout from '@components/FormLayout'

type ValidateEmailError = { message?: string } | undefined

function RegisterWithEmailScreen() {
	const [validateEmail, { isLoading, isSuccess, error }] = authApi.useValidateEmailMutation()
	const errorText = (error as ValidateEmailError)?.message

	const { control, handleSubmit, formState, trigger } = useYupForm({
		schema: emailFormSchema,
		defaultValues: { email: '' },
	})

	const isFirstSubmit = Boolean(formState.submitCount === 0)

	const isValid = useMemo(
		() => (isFirstSubmit ? formState.isValid : isSuccess),
		[formState.isValid, isSuccess, isFirstSubmit]
	)

	const onSubmit = handleSubmit(async ({ email }) => {
		let shouldPromptLoginInstead = false

		if (isFirstSubmit) {
			try {
				await validateEmail({ email }).unwrap()
			} catch (e) {
				shouldPromptLoginInstead = true
			}
		}

		Navigation.navigate(
			ROUTES[shouldPromptLoginInstead ? 'REGISTER_USER_EXISTS_MODAL' : 'REGISTER_CREATE_PASSWORD'].getRoute(email)
		)
	})

	useEffect(() => {
		trigger()
	}, [trigger])

	return (
		<FormLayout
			submitButtonLabel='Next'
			onSubmit={onSubmit}
			isValid={isValid}
			keyboardHandlingEnabled={false}
		>
			<Controller
				name='email'
				control={control}
				render={({ field }) => {
					return (
						<FormTextInput
							value={field.value}
							ref={field.ref}
							onChangeText={(text) => {
								if (!isFirstSubmit && formState.isValid && !isLoading) {
									validateEmail({ email: text })
								}
								field.onChange(text)
							}}
							onBlur={field.onBlur}
							//
							label='Email address'
							helpText="You'll need to confirm this email later."
							errorText={errorText}
							isLoading={isLoading}
							isValid={isValid}
							forceLabelActive={true}
							//
							autoFocus={true}
							autoComplete='email'
							inputMode='email'
							keyboardType='email-address'
							textContentType='emailAddress'
							enablesReturnKeyAutomatically
							returnKeyLabel='Next'
							returnKeyType='next'
							onSubmitEditing={onSubmit}
							blurOnSubmit={false}
						/>
					)
				}}
			/>
		</FormLayout>
	)
}

RegisterWithEmailScreen.displayName = 'RegisterWithEmailScreen'

export default RegisterWithEmailScreen
