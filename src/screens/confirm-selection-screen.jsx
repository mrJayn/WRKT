import PropTypes from 'prop-types'
import { useState } from 'react'
import { Alert, View } from 'react-native'
import { DefaultScreen, P, BlockButton } from '@components/base'
import Animated, {
	Easing,
	Extrapolate,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

/*
const paramTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	action: PropTypes.func.isRequired,
	alert: PropTypes.shape({
		title: PropTypes.string,
		description: PropTypes.string,
		cancelText: PropTypes.string,
		confirmText: PropTypes.string,
	}),
}
PropTypes.checkPropTypes(paramTypes, params, 'params', 'ConfirmSelectionScreen')
*/

export default function ConfirmSelectionScreen({ route }) {
	const [isLoading, setIsLoading] = useState(false)
	const { title, subtitle, buttonText, action, alert } = route.params

	const executeAction = async () => {
		setIsLoading(true)
		await getActionFor(action)
		setTimeout(() => {
			setIsLoading(false)
		}, 6000)
	}

	const handleFirstConfim = () => {
		if (alert) {
			Alert.alert(alert.title ?? 'Are you Sure?', alert.description ?? '', [
				{ text: alert.cancelText ?? 'Cancel', style: 'cancel' },
				{ text: alert.confirmText ?? 'confirm', onPress: executeAction },
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

const getActionFor = async (action) => {
	switch (action) {
		case 'DELETE_ACCOUNT':
			return console.log('DELETING ACCT')
	}
}

const LoadingModal = ({}) => {
	const progress = useSharedValue(0)
	const animatedCircleStyle = useAnimatedStyle(() => ({
		transform: [{ rotate: `${progress.value}deg` }],
	}))
	const firstStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [0, 100, 300, 360], [0, 1, 1, 0], Extrapolate.CLAMP),
	}))
	const secondStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [100, 200, 300, 360], [0, 1, 1, 0], Extrapolate.CLAMP),
	}))
	const thirdStyle = useAnimatedStyle(() => ({
		opacity: interpolate(progress.value, [200, 300, 300, 360], [0, 1, 1, 0], Extrapolate.CLAMP),
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
