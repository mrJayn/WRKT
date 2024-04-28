import { useState, useEffect, useRef } from 'react'
import { TouchableOpacity, View } from 'react-native'
import Animated, { SlideInRight, FadeOutRight } from 'react-native-reanimated'
import { Controller, RefCallBack, useForm } from 'react-hook-form'
//
import { colors } from '@colors'
import withTransition from '@utils/animation/withTransition'
import type { Workout, EditableWorkout } from '@src/types/features'
import { useUpdateWorkoutMutation, useDeleteWorkoutMutation } from '@features/Workouts/workoutsApi'
import FadeView from '@components/FadeView'
import DefaultButton from '@components/DefaultButton'
import Navigation from '@navigation/Navigation'
import ROUTES from '@src/ROUTES'
import BaseTextInput from '@components/TextInput/BaseTextInput'

type Props = {
	workout: Workout
	isEditing: boolean
	shouldUpdateRef: React.MutableRefObject<boolean>
	errorsRef: React.MutableRefObject<{ [K in string]?: boolean }>
}

function WorkoutListItem({ workout: { id, name, is_active }, isEditing, shouldUpdateRef, errorsRef }: Props) {
	const [isFocused, setIsFocused] = useState(false)

	const defaultName = useRef(name)

	const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutMutation()
	const [deleteWorkout, { isLoading: isDeleting }] = useDeleteWorkoutMutation()

	const { control, handleSubmit, formState, setFocus, setError, ...form } = useForm({
		defaultValues: { name: defaultName.current },
		mode: 'onChange',
	})

	const hasError = !!formState.errors.name

	const onSubmit = handleSubmit(async ({ name }) => {
		const data = { id, name }
		console.log('[ WorkoutListItem ] updating workout... data:', data)
		try {
			const response = await updateWorkout(data).unwrap()
			console.log('[ WorkoutListItem - Update success! ] response=>', response)
		} catch (e) {
			console.log('[ WorkoutListItem - Update Error ] error=>', e)
		}
	})

	const handlePress = () => {
		Navigation.navigate(ROUTES.WORKOUT_DAYS.getRoute(id))
	}

	const removeWorkout = () => {
		deleteWorkout({ id })
	}

	const renderButtonLeft = () => {
		const setCurrentDisplayWorkout = () => {
			console.log('[WorkoutListItem] renderButtonLeft pressed!')
			//updateWorkout({ id: item.id, is_active: true })
		}
		return (
			<DefaultButton
				icon={is_active ? 'star' : 'star-outline'}
				iconColor={is_active ? colors.tint.success : undefined}
				iconSize={24}
				onPress={setCurrentDisplayWorkout}
				disabled={isUpdating || isDeleting}
				containerStyle={{
					position: 'absolute',
					paddingLeft: 7.5,
					zIndex: 1,
				}}
			/>
		)
	}

	/** Save or discard any edits made on isEditing done. */
	useEffect(() => {
		if (!isEditing && formState.isDirty) {
			if (shouldUpdateRef.current && !hasError) {
				onSubmit()
			} else {
				form.reset()
			}
		}
	}, [isEditing])

	useEffect(() => {
		const key = id.toString()

		if (!(key in errorsRef.current)) {
			return
		}

		const errorRefValue = errorsRef.current[key]

		if (hasError !== errorRefValue) {
			errorsRef.current = {
				...errorsRef.current,
				[key]: hasError,
			}
		}
	}, [formState.errors.name])

	return (
		<View className='flex-row items-center'>
			{renderButtonLeft()}

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
					render={({ field }) => {
						const _ref = field.ref
						return (
							<BaseTextInput
								value={field.value}
								onChangeText={field.onChange}
								onFocus={() => {
									setIsFocused(true)
								}}
								onBlur={() => {
									setIsFocused(false)
								}}
								editable={isEditing}
								blurOnSubmit={formState.isValid}
								onSubmitEditing={() => {
									setFocus('name')
								}}
								pointerEvents={isEditing ? 'auto' : 'none'}
							/>
						)
					}}
				/>

				{isEditing && (
					<>
						<FadeView
							pointerEvents='none'
							className={`absolute h-10 inset-x-12 rounded-md bg-grey-90 -z-1 border-2  ${
								hasError ? ' border-red' : isFocused ? 'border-white/10' : ''
							}`}
						/>
						<Animated.View
							className='absolute right-0 h-12 w-12 centered z-1'
							entering={withTransition(SlideInRight)}
							exiting={FadeOutRight}
						>
							<DefaultButton
								icon='trash'
								iconSize={24}
								iconColor={colors.tint.error}
								onPress={removeWorkout}
								disabled={isDeleting || isUpdating}
							/>
						</Animated.View>
					</>
				)}
			</TouchableOpacity>
		</View>
	)
}

WorkoutListItem.displayName = 'WorkoutListItem'

export default WorkoutListItem
