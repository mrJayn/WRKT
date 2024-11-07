import React from 'react'
import { View } from 'react-native'
import { BlurView } from 'expo-blur'
import Navigation from '@navigation/Navigation'
import useTheme from '@hooks/useTheme'
import DefaultButton from '@components/DefaultButton'
import Heading from '@components/Heading'
import P from '@components/P'

type BaseModalProps = React.ComponentProps<typeof DefaultButton> & {
	title: string
	subtitle: string
}

function BaseModal({ title, subtitle, ...buttonProps }: BaseModalProps) {
	const theme = useTheme()

	const dismissModal = () => {
		Navigation.goBack()
	}

	return (
		<View className='flex-1 w-full centered'>
			<BlurView
				className='flex-1 w-full z-0'
				intensity={10}
				tint={theme.type}
			/>

			<View className='absolute top-[25vh] h-[35vh] inset-x-3 p-6 justify-between items-center bg-primary-dark dark:bg-primary-light rounded-2xl z-1'>
				<Heading className='text-base text-center text-white dark:text-black'>{title}</Heading>

				<P className='mb-3 text-xs text-center text-white dark:text-black'>{subtitle}</P>

				<DefaultButton
					variant='filled'
					{...buttonProps}
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

BaseModal.displayName = 'BaseModal'
export default BaseModal
