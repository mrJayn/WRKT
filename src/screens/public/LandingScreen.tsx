import React, { useCallback, useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Animated, { FadeOut, useSharedValue } from 'react-native-reanimated'
import * as AppleAuthentication from 'expo-apple-authentication'
import { BlurView } from 'expo-blur'
//
import ROUTES from '@src/ROUTES'
import Navigation from '@navigation/Navigation'
import useAssets from '@hooks/useAssets'
import usePreferredTheme from '@hooks/useColorScheme'
import AppleSignIn from '@components/SignInButtons/AppleSignIn'
import DefaultButton from '@components/DefaultButton'
import P from '@components/P'
import ScreenWrapper from '@components/ScreenWrapper'
import GoogleSignIn from '@components/SignInButtons/GoogleSignIn'

// type Props = RootStackScreenProps<typeof SCREENS.EMAIL_ALREADY_EXISTS_MODAL>

const SUB_TITLE_TEXT = 'Build a workout for yourself or at least do something.'

function LandingScreen() {
	const [isReady, setIsReady] = useState(false)
	const [appleSignInAvailable, setIsAppleSignInAvailable] = useState(false)
	const isFocusedSV = useSharedValue(false)
	const colorScheme = usePreferredTheme()
	const assets = useAssets()

	useFocusEffect(
		useCallback(() => {
			isFocusedSV.value = true
			return () => {
				isFocusedSV.value = false
			}
		}, [])
	)

	useEffect(() => {
		const prepare = async () => {
			const isAvailable = await AppleAuthentication.isAvailableAsync()
			setIsAppleSignInAvailable(isAvailable)
			setIsReady(true)
		}
		prepare()
	}, [])

	return (
		<>
			<ScreenWrapper className='items-center'>
				<View className='flex-1 gap-y-5 centered'>
					<Image
						source={assets.adaptiveIcon}
						className='h-20 aspect-[5/2] self-center'
					/>
					<P className='h6 text-center'>{SUB_TITLE_TEXT}</P>
				</View>

				<View className='w-full'>
					<DefaultButton
						text='Get Started'
						linkTo={ROUTES.REGISTER}
						variant='filled'
						className='mb-2'
					/>

					{appleSignInAvailable && <AppleSignIn />}

					<DefaultButton
						text='Log in'
						onPress={() => {
							Navigation.navigate(ROUTES.LOGIN.route)
						}}
						textClassName='font-inter-medium tracking-1'
						className='pt-5 pb-10'
					/>
				</View>
			</ScreenWrapper>

			{!isReady && (
				<Animated.View
					pointerEvents='none'
					className='absoluteFill z-[99]'
					exiting={FadeOut.duration(2000)}
				>
					<BlurView
						className='full'
						intensity={50}
						tint={colorScheme}
					/>
				</Animated.View>
			)}
		</>
	)
}

LandingScreen.displayName = 'LandingScreen'

export default LandingScreen
