import React, { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

import CONST from '@src/CONST'
import SCREENS from '@src/SCREENS'
import type { Weekday } from '@src/types/utils'
import type { TabsNavigatorScreenProps } from '@navigation/types'
import { useGetActiveWorkoutDaysQuery } from '@features/Days/daysApi'
import { useGetWorkoutExercisesQuery } from '@features/Exercises/exercisesApi'
import ScreenWrapper from '@components/ScreenWrapper'

import ExercisesList from './ExercisesList'
import ScrollResponsiveHeader from './ScrollResponsiveHeader'

type DisplayScreenProps = TabsNavigatorScreenProps<typeof SCREENS.TABS.MAIN>

function DisplayScreen(props: DisplayScreenProps) {
	// console.log('[DisplayScreen]')
	const [displayDayNum, setDisplayDayNum] = useState(new Date().getDay() as Weekday)
	const [refreshing, setRefreshing] = useState(false)
	const scrollY = useSharedValue(0)

	const { days, refetch: refetchDays } = useGetActiveWorkoutDaysQuery(undefined, {
		selectFromResult: ({ data }) => ({ days: data }),
	})
	const { data: exercises, refetch: refetchExericises } = useGetWorkoutExercisesQuery('active')

	const displayDay = useMemo(() => days?.find((day) => day.dayIndex === displayDayNum), [days, displayDayNum])

	const dayNames = useMemo(() => days?.map((day) => day.name) ?? CONST.FALLBACK_DISPLAY_DAY_LABELS, [days])

	const displayExercisesCount = useMemo(
		() => exercises?.filter(({ day }) => day === displayDay?.id).length ?? 0,
		[displayDay]
	)

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y
		},
	})

	const onRefresh = useCallback(async () => {
		setRefreshing(true)
		await refetchDays().unwrap()
		await refetchExericises().unwrap()
		setTimeout(() => {
			setRefreshing(false)
		}, 250)
	}, [])

	return (
		<ScreenWrapper
			safeAreaMode='margin'
			safeAreaEdges={['top']}
			shouldQueryTriggerLoading={true}
		>
			<ScrollResponsiveHeader
				dayNames={dayNames}
				numExercises={displayExercisesCount}
				scrollY={scrollY}
				displayDayNum={displayDayNum}
				setDisplayDayNum={setDisplayDayNum}
			/>

			<Animated.ScrollView
				onScroll={scrollHandler}
				alwaysBounceVertical={false}
				decelerationRate='fast'
				scrollEventThrottle={1}
				scrollsToTop={true}
				showsVerticalScrollIndicator={false}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			>
				<View className='mt-48 mb-40 p-3'>
					<ExercisesList dayID={displayDay?.id} />
				</View>
			</Animated.ScrollView>
		</ScreenWrapper>
	)
}

DisplayScreen.displayName = 'DisplayScreen'

export default DisplayScreen
