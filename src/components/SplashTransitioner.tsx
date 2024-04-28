import React, { useState, useEffect, useCallback } from 'react'
import { Image, Dimensions } from 'react-native'
import Animated, {
	runOnJS,
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolate,
	Easing,
} from 'react-native-reanimated'
import * as ExpoSplashScreen from 'expo-splash-screen'
import { LinearGradient } from 'expo-linear-gradient'
import useAssets from '@hooks/useAssets'

const transitionConfig = {
	duration: 1500,
	easing: Easing.inOut(Easing.poly(3)),
} as const

const screen = Dimensions.get('screen')

function SplashTransitioner({ isNavigationReady }: { isNavigationReady: boolean }) {
	const [isExpoSplashVisible, setIsExpoSplashVisible] = useState(true)
	const [transitionComplete, setTransitionComplete] = useState(false)
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
		try {
			await ExpoSplashScreen.hideAsync()
		} catch (e) {
			console.warn(e)
		} finally {
			setIsExpoSplashVisible(false)
		}
	}, [])

	/** Start animation if tasks are done and children are ready. */
	useEffect(() => {
		if (transitionComplete || !isNavigationReady || isExpoSplashVisible) {
			return
		}
		progress.value = withTiming(1, transitionConfig, () => {
			//runOnJS(setTransitionComplete)(true)
		})
	}, [isNavigationReady, isExpoSplashVisible])

	if (transitionComplete) {
		return null
	}

	return (
		<Animated.View
			pointerEvents='none'
			className='absoluteFill centered bg-black'
			style={[containerStyle]}
		>
			<Image
				source={assets.icon}
				onLoadEnd={onLoadEnd}
				className='full resize-mode-contain'
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
