import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import Animated, {
	Easing,
	cancelAnimation,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated'
import { BlurView } from 'expo-blur'
import FadeView from '@components/FadeView'
import { H, P } from '../base'
import type { IconName } from '../Icon'

type NotificationProps = {
	title?: string
	message?: string
	icon?: IconName
	source?: ImageSourcePropType
}

function Notification({ title, message }: NotificationProps) {
	const [show, setShow] = useState(false)
	const progress = useSharedValue(0)

	const resetAnimation = () => {
		progress.value = 0
	}

	const startAnimation = () => {
		progress.value = withTiming(1, { duration: 2500, easing: Easing.linear }, () => {
			if (progress.value === 1) {
				runOnJS(setShow)(false)
			}
		})
	}

	const pauseAnimation = () => cancelAnimation(progress)

	const progressBarStyle = useAnimatedStyle(() => ({
		width: `${progress.value * 100}%`,
	}))

	useEffect(() => {
		if (title || message) {
			setShow(true)
			resetAnimation()
			setTimeout(() => startAnimation(), 250)
		}
	}, [title, message])

	return (
		show && (
			<FadeView className='absoluteFill top-32 bottom-64 inset-x-1.5 rounded-2xl overflow-hidden z-1'>
				<Animated.View
					className='absolute top-0 left-0 h-3 bg-blue z-1'
					style={[progressBarStyle]}
				/>
				<BlurView
					intensity={25}
					tint='default'
					className='full centered'
					onTouchStart={pauseAnimation}
					onTouchEnd={startAnimation}
				>
					<H className='h4 text-red mb-5'>{title || 'Oops...'}</H>
					<P className='text-xl text-center'>{message || 'Looks like something went wrong.'}</P>
				</BlurView>
			</FadeView>
		)
	)
}

export default Notification
