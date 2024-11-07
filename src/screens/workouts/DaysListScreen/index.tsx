import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { colors } from '@colors'

//
import Navigation from '@navigation/Navigation'
import { WorkoutsStackScreenProps } from '@navigation/types'
import SCREENS from '@src/SCREENS'
import { selectWorkoutById } from '@features/Workouts/workoutsSlice'
import DaysList from '@features/Days/DaysList'

import useRootNavigation from '@hooks/useRootNavigation'
import CustomHeaderBackButton from '@components/CustomHeaderBackButton'
import DefaultButton from '@components/DefaultButton'
import Heading from '@components/Heading'
import ScreenWrapper from '@components/ScreenWrapper'
import DayRenderItem from './DayRendertem'
import WeekdayIndicatorsList from './WeekdayIndicatorsList'
import useAppSelector from '@hooks/useAppSelector'

type DaysScreenProps = WorkoutsStackScreenProps<typeof SCREENS.WORKOUTS.DAYS>

function DaysScreen({
	route: {
		params: { workoutID },
	},
}: DaysScreenProps) {
	const [isEditing, setIsEditing] = useState(false)
	const shouldSaveEdits = useRef(true) // const [shouldSaveEdits, setShouldSaveEdits] = useState(true)

	const navigation = useRootNavigation()
	const workout = useAppSelector((state) => selectWorkoutById(state, workoutID))

	const toggleEditing = (editing: boolean) => {
		setIsEditing(editing)
		if (!editing) {
			if (shouldSaveEdits.current) {
				console.log('saving!')
			} else {
				console.log('canceled.')
			}
		}
	}

	const handleGoBackOrCancel = useCallback(() => {
		if (isEditing) {
			shouldSaveEdits.current = false
			toggleEditing(false)
		} else {
			Navigation.goBack()
		}
	}, [isEditing])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: workout.name,
			headerLeft: () => (
				<CustomHeaderBackButton
					label={isEditing ? 'Cancel' : 'Workouts'}
					onPress={handleGoBackOrCancel}
					backImageVisible={!isEditing}
					tintColor={isEditing ? colors.tint.warning : null}
				/>
			),
			headerRight: () => (
				<DefaultButton
					text={isEditing ? 'Done' : 'Edit'}
					textClassName='text-tint-warning'
					className='px-3'
					onPress={() => {
						shouldSaveEdits.current = true
						toggleEditing(!isEditing)
					}}
				/>
			),
		})
	}, [isEditing])

	return (
		<ScreenWrapper>
			<View className='flex-1'>
				<WeekdayIndicatorsList />

				<DaysList
					workoutId={workout.id}
					renderItem={({ item, ...info }) => (
						<DayRenderItem
							item={item}
							editing={isEditing}
							shouldUpdate={shouldSaveEdits.current}
							{...info}
						/>
					)}
				/>
			</View>
		</ScreenWrapper>
	)
}

DaysScreen.displayName = 'DaysScreen'

export default DaysScreen
