// import PropTypes from 'prop-types'
// import { useState, useEffect } from 'react'
// import { TouchableOpacity, TextInput, View } from 'react-native'
// import Animated, { SlideInRight, FadeOutRight } from 'react-native-reanimated'
// import { Controller, useForm } from 'react-hook-form'
// //
// import { colors } from '@colors'
// import withTransition from '@utils/animation/withTransition'
// import { useUpdateWorkoutMutation, useDeleteWorkoutMutation } from '@features/Workouts/workoutsApi'
// import { Button } from '@components/base'
// import FadeView from '@components/FadeView'

// const propTypes = {
// 	/** item properties */
// 	item: PropTypes.shape({
// 		id: PropTypes.number.isRequired,
// 		name: PropTypes.string.isRequired,
// 		isActive: PropTypes.bool.isRequired,
// 		order: PropTypes.number.isRequired,
// 	}).isRequired,

// 	/** item press handler */
// 	onPress: PropTypes.func.isRequired,

// 	/** editing state value */
// 	editing: PropTypes.bool.isRequired,

// 	/** shouldUpdate state value */
// 	shouldUpdate: PropTypes.bool.isRequired,
// }

// function WorkoutDetailView({ item, onPress, editing, shouldUpdate }) {
// 	// console.log(`<WorkoutsListItem/>... wrkt[${order}] rendered.`)
// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors, isDirty },
// 		reset,
// 	} = useForm({
// 		defaultValues: { name: item.name },
// 	})
// 	const [nameVal, setNameVal] = useState(item.name)
// 	// const [isDirty, setIsDirty] = useState(false)

// 	const [updateWorkout, { isLoading: isUpdating }] = useUpdateWorkoutMutation()
// 	const [deleteWorkout, { isLoading: isDeleting }] = useDeleteWorkoutMutation()

// 	const handleEditsMade = async (name) => {
// 		console.log('onSubmit =>', name)

// 		return
// 		let nameDidChange = name !== String(item.name)
// 		console.log('nameDidChange=', nameDidChange)
// 		console.log('isDirty=', isDirty)

// 		return
// 		if (!editing && nameDidChange) {
// 			if (!shouldUpdate) {
// 				return reset()
// 			}
// 			/** perform update (rename) */
// 			updateWorkout({ id: item.id, name })
// 		}

// 		try {
// 			await updateWorkout(workoutData)
// 			// await updateAuths(tokenPair)
// 			// dispatch(setCredentials({ tokenPair }))
// 		} catch (err) {
// 			if (!err?.originalStatus) {
// 				console.log('No Server Response')
// 			} else {
// 				console.log('Login Failed')
// 			}
// 		}
// 	}

// 	const renameWorkout = handleSubmit(handleEditsMade)
// 	const activateWorkout = () => updateWorkout({ id: item.id, is_active: true })
// 	const removeWorkout = () => deleteWorkout({ id: item.id })

// 	useEffect(() => {
// 		if (!editing && isDirty) {
// 			handleSubmit(handleEditsMade)
// 		}
// 	}, [editing])
// 	/*
// 	useEffect(() => {
// 		let didChange = String(nameVal) !== String(item.name)

// 		if (!editing && didChange) {
// 			if (!shouldUpdate) {
// 				return reset()
// 			}
// 			const data = {
// 				id: item.id,
// 				name: nameVal,
// 			}
// 			updateWorkout(data)
// 		}
// 	}, [editing])
// */

// 	return (
// 		<View className='flex-row centered'>
// 			<Button
// 				icon={`star${item.is_active ? '' : '-outline'}`}
// 				iconSize={24}
// 				{...(item.is_active && { iconColor: colors.tint.success })}
// 				containerStyle='absolute left-0 h-12 w-12 centered z-1'
// 				onPress={activateWorkout}
// 				disabled={isUpdating || isDeleting}
// 			/>
// 			<TouchableOpacity
// 				className='h-12 flex-1 flex-row centered px-14 bg-tertiary-light dark:bg-tertiary-dark'
// 				activeOpacity={0.6}
// 				onPress={onPress}
// 				disabled={editing}
// 			>
// 				<Controller
// 					control={control}
// 					name='name'
// 					rules={{ required: false }}
// 					render={({ field }) => (
// 						<TextInput
// 							value={field.value}
// 							onChangeText={field.onChange}
// 							className='h6 flex-1 text-grey-20'
// 							style={{ pointerEvents: editing ? 'auto' : 'none' }}
// 							editable={editing}
// 						/>
// 					)}
// 				/>
// 				{/*
// 				<TextInput
// 					value={name}
// 					onChangeText={handleChangeText}
// 					className='h6 flex-1 text-grey-20'
// 					editable={editing}
// 					style={{ pointerEvents: editing ? 'auto' : 'none' }}
// 				/>
// 				*/}
// 				{editing && (
// 					<>
// 						<FadeView
// 							className='absolute h-10 inset-x-12 rounded-md bg-grey-90 -z-1'
// 							pointerEvents='none'
// 						/>
// 						<Animated.View
// 							className='absolute right-0 h-12 w-12 centered z-1'
// 							entering={withTransition(SlideInRight)}
// 							exiting={FadeOutRight}
// 						>
// 							<Button
// 								icon='trash'
// 								iconSize={24}
// 								iconColor={colors.tint.error}
// 								onPress={removeWorkout}
// 								disabled={isDeleting || isUpdating}
// 							/>
// 						</Animated.View>
// 					</>
// 				)}
// 			</TouchableOpacity>
// 		</View>
// 	)
// }

// WorkoutDetailView.displayName = 'WorkoutDetailView'
// WorkoutDetailView.propTypes = propTypes

// export default WorkoutDetailView
