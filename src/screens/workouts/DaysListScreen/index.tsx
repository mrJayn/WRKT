import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { colors } from '@colors'

import DaysList from '@features/Days/DaysList'
import DaysListRenderItem from './DaysListRenderItem'
import WeekdayIndicatorsList from './WeekdayIndicatorsList'
//
import Navigation from '@navigation/Navigation'
import { AuthStackParamList, WorkoutsStackScreenProps } from '@navigation/types'
import SCREENS from '@src/SCREENS'
import { selectWorkoutById } from '@features/Workouts/workoutsSlice'

import useRootNavigation from '@hooks/useRootNavigation'

import DefaultButton from '@components/DefaultButton'
import Heading from '@components/Heading'
import ScreenWrapper from '@components/ScreenWrapper'
import CustomHeaderBackButton from '@components/CustomHeaderBackButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import NAVIGATORS from '@src/NAVIGATORS'

type Props = WorkoutsStackScreenProps<typeof SCREENS.WORKOUTS.DAYS>

function DaysScreen({ route: { params } }: Props) {
	const navigation = useRootNavigation()

	const [isEditing, setIsEditing] = useState(false)
	// const [shouldSaveEdits, setShouldSaveEdits] = useState(true)
	const shouldSaveEdits = useRef(true)

	const workout = useSelector(selectWorkoutById(params.workoutID))

	const toggleEditing = (editing: boolean) => {
		setIsEditing(editing)
		if (shouldSaveEdits.current) {
			console.log('saving!')
		} else {
			console.log('canceled.')
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
			<Heading className='h3'>{workout.name || 'Days'}</Heading>

			<View className='flex-1'>
				<WeekdayIndicatorsList />

				<DaysList
					workoutId={workout.id}
					renderItem={({ item, ...info }) => (
						<DaysListRenderItem
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
