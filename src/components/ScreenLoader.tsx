import React, { useEffect, useRef } from 'react'
import { ActivityIndicator } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { theme } from 'tailwind.config'
import CONST from '@src/CONST'

// layout animations
const entering = FadeIn.duration(CONST.ANIMATION.OPACITY_DURATION)
const exiting = FadeOut.delay(250).duration(CONST.ANIMATION.OPACITY_DURATION)

// type ScreenLoaderProps = {}

function ScreenLoader() {
	const isFirstRender = useRef(true)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
		}
	}, [])

	return (
		<Animated.View
			className='absoluteFill centered bg-black/80 z-[99]'
			{...(!isFirstRender.current && { entering })}
			exiting={exiting}
		>
			<BlurView
				className='absoluteFill'
				tint='dark'
				intensity={35}
			/>
			<ActivityIndicator
				size='large'
				color={theme.colors.grey[40]}
			/>
		</Animated.View>
	)
}
ScreenLoader.displayName = 'ScreenLoader'

export default ScreenLoader
