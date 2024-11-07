import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { SlideInRight, FadeOutRight } from 'react-native-reanimated'
import { Controller, RefCallBack, useForm } from 'react-hook-form'
//
import { colors } from '@colors'
import withTransition from '@utils/animation/withTransition'
import type { Workout } from '@src/types/features'
import { useUpdateWorkoutMutation, useDeleteWorkoutMutation } from '@features/Workouts/workoutsAPI'
import FadeView from '@components/FadeView'
import DefaultButton from '@components/DefaultButton'
import Navigation from '@navigation/Navigation'
import ROUTES from '@src/ROUTES'
import TextInput from '@components/TextInput'
import Icon from '@components/Icon'

type WorkoutsListItemProps = {
	workout: Workout
	isEditing: boolean
	shouldUpdateRef: React.MutableRefObject<boolean>
	errorsRef: React.MutableRefObject<{ [K in string]?: boolean }>
}

type WorkoutListItemEditingBGProps = {
	hasError?: boolean
	isFocused?: boolean
}

// function OptionsMenu ({ setEditing }) {
// 	const options = [
// 		{
// 			text: 'Share',
// 			icon: 'share-outline',
// 			iconSize: 18,
// 			onPress: () => console.log('option 1'),
// 		},
// 		{ text: 'Select Items', icon: 'close-outline', iconSize: 24, onPress: () => setEditing(true) },
// 	]
// 	return (
// 		<View className='absolute top-3 right-3 w-40 z-4'>
// 			<GenieEffectView className='full flex bg-grey-20 rounded-xl shadow-sm shadow-black/50 overflow-hidden'>
// 					<Button
// 						key={item.text}
// 						containerStyle='w-full h-9 bg-grey-5 my-px'
// 						className='flex-row-reverse justify-between h-full min-w-full p-0 px-2'
// 						textStyle='text-lg'
// 						{...item}
// 					/>
// 			</GenieEffectView>
// 		</View>
// 	)
// }

function WorkoutListItem({
	workout: { id, name, isActive, order, profile },
	isEditing,
	shouldUpdateRef,
	errorsRef,
}: WorkoutsListItemProps) {
	const [isFocused, setIsFocused] = useState(false)
	const [isOptionsMenuOpen, setIsOptionsMenuOpen] = useState(false)

	const defaultName = useRef(name)

	const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutMutation()
	const [deleteWorkout, { isLoading: isDeleting }] = useDeleteWorkoutMutation()

	const { control, handleSubmit, formState, setFocus, setError, ...form } = useForm({
		defaultValues: { name: defaultName.current },
		mode: 'onChange',
	})

	const hasError = !!formState.errors.name

	const performUpdate = handleSubmit(async ({ name }) => {
		const data = { id, name }
		console.log('[ WorkoutListItem ] updating workout... data:', data)
		try {
			const response = await updateWorkout(data).unwrap()
			console.log('[ WorkoutListItem - Update success! ] response=>', response)
		} catch (e) {
			console.log('[ WorkoutListItem - Update Error ] error=>', e)
		}
	})

	const setCurrentDisplayWorkout = () => {
		console.log('[WorkoutListItem] >> setCurrentDisplayWorkout()')
		updateWorkout({ id, isActive: true })
	}

	const handlePress = () => {
		Navigation.navigate(ROUTES.WORKOUT_DAYS.getRoute(id))
	}

	const removeWorkout = () => {
		deleteWorkout({ id })
	}

	const toggleOptionsModal = useCallback(() => {
		setIsOptionsMenuOpen(!isOptionsMenuOpen)
	}, [isOptionsMenuOpen])

	/** Save or discard any edits made on isEditing done. */
	useEffect(() => {
		if (!isEditing && formState.isDirty) {
			if (shouldUpdateRef.current && !hasError) {
				performUpdate()
			} else {
				form.reset()
			}
		}
	}, [isEditing])

	/** Set the errorsRef. */
	useEffect(() => {
		const key = id.toString()

		if (!(key in errorsRef.current)) {
			// console.log(`[ WorkoutListItem ] Key ${key} not in errorsRef.current.`)
			return
		}

		let nameFieldError = !!formState.errors.name

		if (nameFieldError !== errorsRef.current[key]) {
			let newErrors = {
				...errorsRef.current,
				[key]: nameFieldError,
			}
			console.log('[ WorkoutListItem ]', newErrors)
			errorsRef.current = newErrors
		}
	}, [formState.errors.name])

	return (
		<View className='flex-row items-center'>
			<DefaultButton
				icon={isActive ? 'star' : 'star-outline'}
				iconColor={isActive ? colors.tint.success : undefined}
				iconSize={24}
				onPress={setCurrentDisplayWorkout}
				disabled={isUpdating || isDeleting}
				containerStyle={{
					position: 'absolute',
					paddingLeft: 7.5,
					zIndex: 1,
				}}
			/>

			<TouchableOpacity
				className='h-12 flex-1 flex-row centered px-14 bg-tertiary-light dark:bg-tertiary-dark'
				activeOpacity={0.6}
				disabled={isEditing}
				onPress={handlePress}
			>
				<Controller
					control={control}
					name='name'
					rules={{ required: true }}
					render={({ field }) => (
						<TextInput
							value={field.value}
							onChangeText={field.onChange}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							onSubmitEditing={() => setFocus('name')}
							blurOnSubmit={formState.isValid}
							editable={isEditing}
							pointerEvents={isEditing ? 'auto' : 'none'}
							returnKeyType='done'
							returnKeyLabel='Done'
						/>
					)}
				/>

				{isEditing ? (
					<>
						<FadeView
							pointerEvents='none'
							className={`absolute h-10 inset-x-12 rounded-md bg-grey-90 -z-1 border-b-2 ${
								hasError ? 'border-b-tint-error' : 'border-b-transparent'
							}`}
						/>

						<Animated.View
							className='absolute right-1.5 z-1'
							entering={withTransition(SlideInRight)}
							exiting={FadeOutRight}
						>
							<DefaultButton
								// icon='ellipsis-horizontal-circle-outline'
								icon='trash-can-outline'
								iconSize={24}
								iconColor={colors.red}
								onPress={toggleOptionsModal}
								disabled={isDeleting || isUpdating}
							/>
						</Animated.View>
					</>
				) : (
					<FadeView className='absolute right-2'>
						<Icon
							name='chevron-right'
							size={24}
						/>
					</FadeView>
				)}
			</TouchableOpacity>
		</View>
	)
}

WorkoutListItem.displayName = 'WorkoutListItem'

export default WorkoutListItem
