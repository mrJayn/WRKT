import { useLayoutEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import Animated, {
	Easing,
	Extrapolate,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedKeyboard,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Controller, useForm } from 'react-hook-form'

import { colors } from '@colors'

function CreateModelScreen({ navigation, route }) {
	const { model, details } = route.params

	const [isLoading, setIsLoading] = useState(false)
	const [isValidating, setIsValidating] = useState(false)

	const defaultValues = { name: '' }

	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		getValues,
		setError,
		watch,
	} = useForm({ defaultValues, mode: 'all' })

	const onSubmit = async () => {
		setIsLoading(true)
		//await getActionFor(action)
		console.log('clicked me!')
		setTimeout(() => {
			setIsLoading(false)
		}, 6000)
	}

	const validate_input = async () => {}

	function focusOn(ref) {
		if (!isValid) ref.current.focus()
	}

	const inputs = [
		{
			name: 'name',
			label: 'Name',
			errors: errors.name,
			blurOnSubmit: isValid,
			//onSubmitEditing: () => focusOn(username_ref),
		},
	]

	const RenderItem = ({ item: { name, extraRules, ...inputProps } }) => (
		<>
			<Controller
				{...{ control, name }}
				rules={{ required: true, ...extraRules }}
				render={({ field }) => (
					<Form_Input
						value={field.value}
						onChangeText={(e) => {
							field.onChange(e)
							// validate_input()
						}}
						containerStyle='mb-3'
						{...inputProps}
					/>
				)}
			/>
		</>
	)
	const Footer = () => (
		<View className='flex-row justify-between mt-6 gap-x-10'>
			<Button
				type='grey'
				text='Cancel'
				icon='exit'
				iconColor={colors.tint.error}
				onPress={() => navigation.goBack()}
			/>
			<Button
				type='grey'
				text='Done'
				icon='checkmark'
				iconColor={colors.tint.success}
				onPress={handleSubmit(onSubmit)}
				className={`w-24 ${isValid ? '' : 'opacity-50'}`}
				disabled={!isValid}
			/>
		</View>
	)

	const avoidKeyboardStyle = useKeyboardOffset({ extra: 50 })
	useLayoutEffect(() => {
		if (!model) return

		var headerTitle = model.endsWith('s') ? model.slice(0, -1) : model
		navigation.setOptions({
			title: `New ${headerTitle}`,
		})
	}, [])
	return (
		<ModalScreen>
			<Animated.View style={[{ flex: 1 }, avoidKeyboardStyle]}>
				{isValidating && (
					<Animated.View
						className='absolute right-0 top-10 bottom-0 w-12 z-2'
						entering={FadeIn}
						exiting={FadeOut}
					>
						<ActivityIndicator color={'#fff'} />
					</Animated.View>
				)}
				<FlatList
					data={inputs}
					keyExtractor={({ name }) => name}
					stickyHeaderIndices={[0]}
					renderItem={RenderItem}
					ListFooterComponent={Footer}
					keyboardShouldPersistTaps='handled'
					scrollEnabled={true}
					alwaysBounceVertical={false}
					showsVerticalScrollIndicator={false}
					className='flex-1 px-3'
					contentContainerStyle={{ paddingVertical: 50 }}
				/>
			</Animated.View>
			{isLoading && <LoadingModal />}
		</ModalScreen>
	)
}

function useKeyboardOffset({ extra = 50 } = {}) {
	const { bottom: insB } = useSafeAreaInsets()
	const keyboard = useAnimatedKeyboard()

	return useAnimatedStyle(() => {
		const khv = keyboard.height.value
		const paddingBottom = Math.max(0, Math.min(khv + extra, khv - insB))
		return { paddingBottom }
	})
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
