import React, { useEffect } from 'react'
import { Controller, MultipleFieldErrors } from 'react-hook-form'
import { StackScreenProps } from '@react-navigation/stack'

//
import ROUTES from '@src/ROUTES'
import SCREENS from '@src/SCREENS'
import Navigation from '@navigation/Navigation'
import { RegisterStackParamList } from '@navigation/types'
import { createPasswordSchema } from '@libs/Schema'
import useYupForm from '@hooks/useYupForm'
import FormTextInput from '@components/FormTextInput'
import FormLayout from '@components/FormLayout'
import PasswordRequirementsList from '@components/PasswordRequirementsList'

type Props = StackScreenProps<RegisterStackParamList, typeof SCREENS.REGISTER.CREATE_PASSWORD>

function CreatePasswordScreen({ route }: Props) {
	const { control, handleSubmit, formState, trigger } = useYupForm({
		schema: createPasswordSchema,
		defaultValues: { password: '' },
		criteriaMode: 'all',
	})

	const submit = handleSubmit(({ password }) => {
		Navigation.navigate(ROUTES.REGISTER_CREATE_USERNAME.getRoute(route.params.email, password))
	})

	const passwordErrorTypes = formState.errors.password?.types as MultipleFieldErrors | undefined

	useEffect(() => {
		trigger()
	}, [trigger])

	return (
		<FormLayout
			submitButtonLabel='Next'
			onSubmit={submit}
			isValid={formState.isValid}
			keyboardHandlingEnabled={false}
		>
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<FormTextInput
						value={field.value}
						ref={field.ref}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						//
						label='Password'
						forceLabelActive={true}
						isValid={formState.isValid}
						//
						autoFocus={true}
						secureTextEntry={true}
						autoComplete='password-new'
						textContentType='newPassword'
						enablesReturnKeyAutomatically
						returnKeyLabel='Next'
						returnKeyType='next'
						onSubmitEditing={submit}
						blurOnSubmit={false}
					/>
				)}
			/>
			<PasswordRequirementsList
				isValid={formState.isValid}
				errorTypes={passwordErrorTypes}
			/>
		</FormLayout>
	)
}

CreatePasswordScreen.displayName = 'CreatePasswordScreen'

export default CreatePasswordScreen
