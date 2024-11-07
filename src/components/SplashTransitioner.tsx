import React, { useState, useEffect, useCallback } from 'react'
import { Image, Dimensions } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate } from 'react-native-reanimated'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { LinearGradient } from 'expo-linear-gradient'
import CONST from '@src/CONST'
import useAssets from '@hooks/useAssets'

const screen = Dimensions.get('screen')

function SplashTransitioner({ isNavigationReady }: { isNavigationReady: boolean }) {
	const [isSplashScreenReady, setSplashScreenReady] = useState(false)
	const assets = useAssets()
	const progress = useSharedValue(0)

	const containerStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [0.5, 1], [1, 0], 'clamp'),
	}))

	const overlayStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: interpolate(progress.value, [0, 0.5], [0, -2 * screen.height], 'clamp') }],
	}))

	/** Hide the native splash screen and initiate the exit animation. */
	const onLoadEnd = useCallback(async () => {
		return ExpoSplashScreen.hideAsync()
			.then(() => setSplashScreenReady(true))
			.catch(console.warn)
	}, [])

	/** Start the animation if the navigation is ready and the expo splash screen has been hidden. */
	useEffect(() => {
		if (!isNavigationReady || !isSplashScreenReady) {
			return
		}
		progress.value = withTiming(1, CONST.ANIMATION.SPLASH_EXIT_TRANSITION)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isNavigationReady, isSplashScreenReady])

	return (
		<Animated.View
			pointerEvents='none'
			className='absoluteFill centered bg-black'
			style={[containerStyle]}
		>
			<Image
				source={assets.icon}
				onLoadEnd={onLoadEnd}
				className='full'
				resizeMode='contain'
				fadeDuration={0}
			/>

			<Animated.View
				className='absolute top-0 inset-x-0 h-[300vh]'
				style={[overlayStyle]}
			>
				<LinearGradient
					colors={['#0000', '#000F']}
					start={{ x: 0, y: 0.25 }}
					end={{ x: 0, y: 0.75 }}
					style={{ flex: 1 }}
				/>
			</Animated.View>
		</Animated.View>
	)
}

SplashTransitioner.displayName = 'SplashTransitioner'

export default SplashTransitioner
