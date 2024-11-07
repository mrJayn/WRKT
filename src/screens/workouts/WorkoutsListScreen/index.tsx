import React, { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated'
//
import { colors } from '@colors'
import CONFIG from '@src/CONFIG'
import SCREENS from '@src/SCREENS'
import type { Workout } from '@src/types/features'
import type { TabsNavigatorScreenProps } from '@navigation/types'
import { useGetWorkoutsListQuery } from '@features/Workouts/workoutsAPI'
import useRootNavigation from '@hooks/useRootNavigation'
import CreateWorkoutButton from '@components/features/CreateWorkoutButton'
import CustomHeaderBackButton from '@components/CustomHeaderBackButton'
import DefaultButton from '@components/DefaultButton'
import KeyboardHandlerView from '@components/KeyboardHandlerView'
import ScreenWrapper from '@components/ScreenWrapper'
import WorkoutListItem from './WorkoutListItem'

type WorkoutsTabScreenProps = TabsNavigatorScreenProps<typeof SCREENS.TABS.WORKOUTS>

function WorkoutsScreen(_props: WorkoutsTabScreenProps) {
	const navigation = useRootNavigation()
	const { data, isSuccess, isError, isLoading } = useGetWorkoutsListQuery()

	const [isEditing, setIsEditing] = useState(false)
	const shouldSaveEdits = useRef(true)

	const errorsRef = useRef<{ [K in string]?: boolean }>({})

	const numWorkouts = Number(data?.length)

	const shouldShowCreateButton = useMemo(() => !isEditing && numWorkouts < CONFIG.MAX_WORKOUTS, [isEditing, numWorkouts])

	const toggleEditing = () => {
		if (isEditing && !Object.values(errorsRef.current).every((v) => !v)) {
			console.log('An field error exists on a text input!')
			return
		}

		if (!shouldSaveEdits.current) {
			shouldSaveEdits.current = true
		}
		setIsEditing(!isEditing)
	}

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
		<KeyboardHandlerView>
			<ScreenWrapper
				className='pt-32'
				isLoading={isLoading}
			>
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
		</KeyboardHandlerView>
	)
}

WorkoutsScreen.displayName = 'WorkoutsScreen'

export default WorkoutsScreen
