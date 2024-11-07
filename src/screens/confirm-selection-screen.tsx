// @ts-nocheck

import _ from 'lodash'
import { useState } from 'react'
import { Alert, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import Animated, {
	Easing,
	Extrapolation,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

type ConfirmAlert = {
	title: string
	description: string
	cancelText: string
	confirmText: string
}

type ConfirmSelectionScreenParams = {
	title?: string
	subtitle?: string
	buttonText?: string
	action?: string
	alert?: Partial<ConfirmAlert> | true
}

const DEFAULT_ALERT_OBJECT: ConfirmAlert = {
	title: `Are you absolutely sure?`,
	description: `This is your last chance to go back.`,
	cancelText: 'Cancel',
	confirmText: 'CONFIRM',
}

/*export default*/ function ConfirmSelectionScreen() {
	const route = useRoute()
	const {
		title = 'Are you sure?',
		subtitle,
		buttonText = 'Confirm',
		action,
		alert,
	} = route.params as ConfirmSelectionScreenParams

	const [isLoading, setIsLoading] = useState(false)

	const executeAction = async () => {
		setIsLoading(true)
		await getActionFor(action)
		setTimeout(() => {
			setIsLoading(false)
		}, 6000)
	}

	const handleFirstConfim = () => {
		if (alert) {
			const info: ConfirmAlert = {
				...DEFAULT_ALERT_OBJECT,
				...(_.isObject(alert) && alert),
			}
			Alert.alert(info.title, info.description, [
				{ text: info.cancelText, style: 'cancel' },
				{ text: info.confirmText, onPress: executeAction },
			])
		} else {
			executeAction()
		}
	}

	return (
		<DefaultScreen className='pt-12'>
			<P className='h4'>{title}</P>
			<P className='mb-20 mt-5 text-xl'>{subtitle}</P>
			<BlockButton
				text={buttonText}
				className='bg-red/20'
				textStyle='text-red text-2xl uppercase'
				onPress={handleFirstConfim}
			/>
			{isLoading && <LoadingModal />}
		</DefaultScreen>
	)
}

const getActionFor = async (action: string | undefined) => {
	switch (action) {
		case 'DELETE_ACCOUNT':
			return console.log('DELETING ACCT')
		default:
			return console.log('NO ACTION.')
	}
}

const LoadingModal = ({}) => {
	const progress = useSharedValue(0)
	const animatedCircleStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${progress.value}deg` }],
	}))
	const firstStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [0, 100, 300, 360], [0, 1, 1, 0], Extrapolation.CLAMP),
	}))
	const secondStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [100, 200, 300, 360], [0, 1, 1, 0], Extrapolation.CLAMP),
	}))
	const thirdStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [200, 300, 300, 360], [0, 1, 1, 0], Extrapolation.CLAMP),
	}))

	progress.value = withRepeat(withTiming(360, { duration: 2000, easing: Easing.linear }), 3)

	return (
		<Animated.View
			className='absolute inset-0 centered z-[99] bg-white dark:bg-grey-90'
			entering={FadeIn}
			exiting={FadeOut}
		>
			<P className='h4 text-darkgreen-10'>Goodbye</P>

			<View className='flex-row items-end mt-3'>
				<Animated.View
					className='rounded-full bg-black h-1.5 aspect-[1/1]'
					style={[firstStyle]}
				/>
				<Animated.View
					className='rounded-full bg-black h-1.5 aspect-[1/1] mx-3'
					style={[secondStyle]}
				/>
				<Animated.View
					className='rounded-full bg-black h-1.5 aspect-[1/1]'
					style={[thirdStyle]}
				/>
			</View>

			<Animated.View
				className='w-[90%] aspect-[1/1] rounded-full absolute border-4 centered border-x-white border-y-red/50'
				style={[animatedCircleStyle]}
			/>
		</Animated.View>
	)
}
