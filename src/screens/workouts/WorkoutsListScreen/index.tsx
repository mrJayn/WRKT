import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'

//
import { colors } from '@colors'
import CONFIG from '@src/CONFIG'
import type { Workout } from '@src/types/features'
import useRootNavigation from '@hooks/useRootNavigation'
import CreateWorkoutButton from '@components/features/CreateWorkoutButton'
import CustomHeaderBackButton from '@components/CustomHeaderBackButton'
import DefaultButton from '@components/DefaultButton'
import ScreenWrapper from '@components/ScreenWrapper'
import WorkoutListItem from './WorkoutListItem'
import withWorkouts, { WithWorkoutsProps } from '@components/withWorkouts'
import type { RefCallBack } from 'react-hook-form'

function WorkoutsListScreen({ data }: WithWorkoutsProps) {
	const navigation = useRootNavigation()
	const [isEditing, setIsEditing] = useState(false)
	const shouldSaveEdits = useRef(true)
	const initialErrorsRef = data.map((item) => item.id.toString()).reduce((acc, k) => ({ ...acc, [k]: false }), {})
	console.log('>>', initialErrorsRef)
	const errorsRef = useRef(initialErrorsRef)

	const numWorkouts = Number(data?.length)

	const shouldShowCreateButton = useMemo(() => !isEditing && numWorkouts < CONFIG.MAX_WORKOUTS, [isEditing, numWorkouts])

	const toggleEditing = useCallback(() => {
		if (isEditing && errorsRef.current) {
			console.log('An field error exists on a text input!')
			return
		}

		if (!shouldSaveEdits.current) {
			shouldSaveEdits.current = true
		}
		setIsEditing(!isEditing)
	}, [isEditing, errorsRef.current])

	const cancelEditingButton = useMemo(() => {
		return (
			<CustomHeaderBackButton
				label='Cancel'
				backImageVisible={false}
				tintColor={colors.tint.warning}
				onPress={() => {
					shouldSaveEdits.current = false
					setIsEditing(false)
				}}
			/>
		)
	}, [])

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (isEditing ? cancelEditingButton : null),
			headerRight: () => (
				<DefaultButton
					variant='header'
					text={isEditing ? 'Done' : 'Edit'}
					textClassName='text-tint-warning'
					className='px-3'
					onPress={toggleEditing}
				/>
			),
		})
	}, [isEditing])

	const listRenderItem: ListRenderItem<Workout> = ({ item }) => (
		<WorkoutListItem
			workout={item}
			isEditing={isEditing}
			shouldUpdateRef={shouldSaveEdits}
			errorsRef={errorsRef}
		/>
	)

	return (
		<ScreenWrapper className='pt-32'>
			<FlatList
				data={data}
				initialNumToRender={numWorkouts}
				keyExtractor={(item) => item.id.toString()}
				renderItem={listRenderItem}
				contentContainerStyle={{
					rowGap: 1,
					borderRadius: 12,
					overflow: 'hidden',
				}}
				style={{ flexGrow: 0 }}
				scrollEnabled={false}
			/>

			{shouldShowCreateButton && (
				<Animated.View
					className='absolute bottom-0 right-4'
					entering={FadeInRight}
					exiting={FadeOutRight}
				>
					<CreateWorkoutButton />
				</Animated.View>
			)}
		</ScreenWrapper>
	)
}

WorkoutsListScreen.displayName = 'WorkoutsListScreen'

export default withWorkouts(WorkoutsListScreen)
