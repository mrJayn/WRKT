import React from 'react'
import { View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { BlurView } from 'expo-blur'
//
import ROUTES from '@src/ROUTES'
import SCREENS from '@src/SCREENS'
import Navigation from '@navigation/Navigation'
import { RegisterStackParamList } from '@navigation/types'
import useThemePreference from '@hooks/useThemePreference'
import DefaultButton from '@components/DefaultButton'
import Heading from '@components/Heading'
import P from '@components/P'

type Props = StackScreenProps<RegisterStackParamList, typeof SCREENS.REGISTER.USER_EXISTS_MODAL>

function UserAlreadyExistsModal({ route }: Props) {
	const colorScheme = useThemePreference()

	const dismissModal = () => {
		Navigation.goBack()
	}

	return (
		<View className='flex-1 w-full centered'>
			<BlurView
				className='flex-1 w-full z-0'
				intensity={10}
				tint={colorScheme}
			/>

			<View className='absolute top-[25vh] h-[35vh] inset-x-3 p-6 justify-between items-center bg-primary-dark dark:bg-primary-light rounded-2xl z-1'>
				<Heading className='text-base text-center text-white dark:text-black'>
					{`'${route.params.email}' is already connected to an account`}
				</Heading>

				<P className='mb-3 text-xs text-center text-white dark:text-black'>Do you want to log in instead?</P>

				<DefaultButton
					text='Login'
					variant='filled'
					linkTo={ROUTES.LOGIN.getRoute(route.params.email)}
					className='bg-darkgreen-neon'
				/>
				<DefaultButton
					text='dismiss'
					textClassName='font-inter-medium text-white dark:text-black'
					onPress={dismissModal}
				/>
			</View>
		</View>
	)
}

UserAlreadyExistsModal.displayName = 'UserAlreadyExistsModal'

export default UserAlreadyExistsModal
