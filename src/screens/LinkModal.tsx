import { View } from 'react-native'

import ROUTES, { Route } from '@src/ROUTES'
import P from '@components/P'
import DefaultButton from '@components/DefaultButton'
import { RootStackScreenProps } from '@navigation/types'
import SCREENS from '@src/SCREENS'
import { getFocusedRouteNameFromRoute, getStateFromPath } from '@react-navigation/native'
import Navigation from '@navigation/Navigation'
import usePreferredTheme from '@hooks/useColorScheme'
import { BlurView } from 'expo-blur'
import Heading from '@components/Heading'

const linkModalTypes = {
	[ROUTES.WORKOUTS]: {
		title: 'Get Started',
		subtitle: "Looks like there's nothing here yet!",
		label: 'Add Exercises',
	},
} as const

type LinkModalType = keyof typeof linkModalTypes

function LinkModal({
	route: {
		params: { linkTo },
	},
}: RootStackScreenProps<typeof SCREENS.LINK_MODAL>) {
	const { title, subtitle, label } = linkModalTypes[linkTo]

	const colorScheme = usePreferredTheme()

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
				<Heading className='text-base text-center text-white dark:text-black'>{title}</Heading>

				{!!subtitle && <P className='mb-3 text-xs text-center text-white dark:text-black'>{subtitle}</P>}

				<DefaultButton
					text={label || `Open ${linkTo.slice(5)}...`}
					variant='filled'
					linkTo={linkTo}
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

LinkModal.displayName = 'LinkModal'

export default LinkModal

export type { LinkModalType }
