import React from 'react'
import { Controller } from 'react-hook-form'
import { StackScreenProps } from '@react-navigation/stack'
import SCREENS from '@src/SCREENS'
import { RegisterStackParamList } from '@navigation/types'
import { useRegisterMutation } from '@features/auth/authApi'
import { createProfileSchema } from '@libs/Schema'
import useYupForm from '@hooks/useYupForm'
import FormTextInput from '@components/FormTextInput'
import FormLayout from '@components/FormLayout'

type Props = StackScreenProps<RegisterStackParamList, typeof SCREENS.REGISTER.CREATE_USERNAME>

function CreateUsernameScreen({ route }: Props) {
	const [registerUser, { isLoading, isSuccess }] = useRegisterMutation()

	const { control, handleSubmit, formState } = useYupForm({
		schema: createProfileSchema,
		defaultValues: { username: '' },
	})

	const submit = handleSubmit(async ({ username }) => {
		try {
			await registerUser({
				...route.params,
				username,
			}).unwrap()
		} catch (e) {
			console.log('[ CreateUsernameScreen Error ]', e)
		}
	})

	return (
		<FormLayout
			submitButtonLabel='Done'
			onSubmit={submit}
			isValid={formState.isValid}
			isLoading={isLoading}
			isComplete={isSuccess}
			keyboardHandlingEnabled={false}
		>
			<Controller
				name='username'
				control={control}
				render={({ field }) => (
					<FormTextInput
						value={field.value}
						ref={field.ref}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						//
						label='Username'
						forceLabelActive={true}
						errorText={formState.errors.username?.message as string | undefined}
						isValid={formState.isValid}
						//
						autoFocus={true}
						enablesReturnKeyAutomatically
						returnKeyType='next'
						returnKeyLabel='Next'
						onSubmitEditing={submit}
						blurOnSubmit={true}
					/>
				)}
			/>
		</FormLayout>
	)
}

CreateUsernameScreen.displayName = 'CreateUsernameScreen'

export default CreateUsernameScreen
