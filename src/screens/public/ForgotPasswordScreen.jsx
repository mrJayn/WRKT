import { useEffect, useState } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { Controller } from 'react-hook-form'
import * as yup from 'yup'
import { BlurView } from 'expo-blur'
//
import Navigation from '@navigation/Navigation'
import useYupForm from '@hooks/useYupForm'
import DefaultButton from '@components/DefaultButton'
import FormTextInput from '@components/FormTextInput'
import Heading from '@components/Heading'
import P from '@components/P'
import ScreenWrapper from '@components/ScreenWrapper'

const resetPasswordSchema = yup.object({
	email: yup.string().required(),
})

function ForgotPasswordScreen() {
	const [reciever, setReciever] = useState('')

	const { control, handleSubmit, formState, trigger } = useYupForm({
		schema: resetPasswordSchema,
		defaultValues: { email: 'm63jayne@gmail.com' },
		mode: 'onChange',
	})

	const onSubmit = handleSubmit(({ email }) => {
		setReciever(email)
	})

	const onDone = () => {
		Navigation.goBack({ shouldPopToTop: true })
	}

	useEffect(() => {
		trigger()
	}, [trigger])

	return (
		<ScreenWrapper>
			<Heading className='h4'>Getting back into your account</Heading>
			<P className='text-lg mt-3 mb-6'>Tell us some information about your account.</P>

			<Controller
				name='email'
				control={control}
				render={({ field, fieldState: { error } }) => (
					<FormTextInput
						value={field.value}
						ref={field.ref}
						onChangeText={field.onChange}
						onBlur={field.onBlur}
						//
						label='Email Address'
						forceError={!!error}
						//
						autoFocus={true}
						autoComplete='email'
						inputMode='email'
						keyboardType='email-address'
						textContentType='emailAddress'
						returnKeyLabel='Done'
						returnKeyType='done'
						enablesReturnKeyAutomatically={true}
						onSubmitEditing={onSubmit}
					/>
				)}
			/>

			<DefaultButton
				text='Request Password Reset'
				onPress={onSubmit}
				disabled={!formState.isValid}
				variant='filled'
				containerStyle={{ marginTop: 20 }}
			/>

			{!!reciever && (
				<Animated.View
					className='absolute inset-0'
					entering={FadeIn}
				>
					<BlurView
						intensity={50}
						tint='dark'
						className='full centered p-5 pt-0'
					>
						<Animated.View
							className='rounded-xl bg-white p-7 shadow shadow-black/50'
							entering={FadeInDown}
						>
							<View className='centered mb-5 gap-y-2.5'>
								<P className='h5'>Check your email</P>
								<P>
									<P className='text-lg'>Please go to your</P>
									<P className='text-lg font-inter-bold'>{` ${reciever} `}</P>
									<P className='text-lg'>
										email and follow the intructions to continue resetting your password.
									</P>
								</P>
							</View>
							<DefaultButton
								text='Done'
								className='bg-slate-20'
								variant='filled'
								onPress={onDone}
							/>
						</Animated.View>
					</BlurView>
				</Animated.View>
			)}
		</ScreenWrapper>
	)
}

ForgotPasswordScreen.displayName = 'ForgotPasswordScreen'

export default ForgotPasswordScreen
