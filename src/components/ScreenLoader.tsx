import React from 'react'
import { ActivityIndicator } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import { colors } from '@colors'
import CONST from '@src/CONST'

type ScreenLoaderProps = {
	mode?: 'fadeIn' | 'both' | 'fadeOut'
	fadeDuration?: number
	shouldDelayFadeOut?: boolean
}

export default function ScreenLoader({
	mode = 'fadeOut',
	fadeDuration = CONST.ANIMATION.OPACITY_DURATION,
	shouldDelayFadeOut = false,
}: ScreenLoaderProps) {
	// prettier-ignore
	const entering = 
		mode === 'fadeOut' 
		? undefined 
		: FadeIn.duration(fadeDuration)

	// prettier-ignore
	const exiting =
		mode === 'fadeIn'
			? undefined
			: FadeOut.delay( shouldDelayFadeOut ? 100 : 0).duration(fadeDuration)

	return (
		<Animated.View
			className='absoluteFill centered bg-black/80 z-[99]'
			entering={entering}
			exiting={exiting}
		>
			<BlurView
				className='absoluteFill'
				tint='dark'
				intensity={35}
			/>
			<ActivityIndicator
				size='large'
				color={colors.grey[40]}
			/>
		</Animated.View>
	)
}

/* 
interface EllipsisProps {
	progress: SharedValue<number>
	range: [number,number,number,number]
}

const TIME = 500
const EASE = Easing.linear

function Ellipsis({ progress, range }: EllipsisProps) {
	const opacityStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, range, [0, 1, 1, 0], Extrapolate.CLAMP),
	}))

	return (
		<Animated.View
			className='rounded-full bg-white h-1.5 aspect-[1/1] mx-1'
			style={[opacityStyle]}
		/>
	)
}

//========

<View
				className='flex-row items-end mt-3'
			>
				<Ellipsis {...{ progress, range: [0, 100, 300, 360] }} />
				<Ellipsis {...{ progress, range: [100, 200, 300, 360] }} />
				<Ellipsis {...{ progress, range: [200, 300, 300, 360] }} />
			</View> */
