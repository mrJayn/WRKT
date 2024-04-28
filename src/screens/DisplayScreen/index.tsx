import React, { useMemo, useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import ROUTES from '@src/ROUTES'
import type { WeekdayIndex } from '@src/types/utils'
import withActiveWorkoutDays, { WithActiveWorkoutDaysProps } from '@components/withActiveWorkoutDays'
import P from '@components/P'
import DefaultButton from '@components/DefaultButton'
import Heading from '@components/Heading'
import ExercisesList from './ExercisesList'
import ScrollResponsiveHeader from './ScrollResponsiveHeader'
import ScreenWrapper from '@components/ScreenWrapper'

function DisplayScreen({ data, units }: WithActiveWorkoutDaysProps) {
	const [displayDayNum, setDisplayDayNum] = useState<WeekdayIndex>(new Date().getDay())
	const scrollY = useSharedValue(0)

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			scrollY.value = event.contentOffset.y
		},
	})

	const { name, exercises } = useMemo(() => data[displayDayNum], [displayDayNum])

	const dayNames = useMemo(() => data.map((item, index) => item.name || `Day ${index}`), [data])

	return (
		<ScreenWrapper
			mode='margin'
			edges={['top']}
		>
			<ScrollResponsiveHeader
				title={name || `Day ${displayDayNum}`}
				subtitle={`${exercises.length} total exercises`}
				dayNames={dayNames}
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
			>
				<View className='mt-48 mb-40 p-3'>
					{!!exercises.length ? (
						<ExercisesList
							data={exercises}
							units={units}
						/>
					) : (
						<View className='w-full centered'>
							<P className='mt-2 mb-6'>Looks like there's nothing here yet!</P>
							<DefaultButton
								text='Go to Workouts'
								variant='filled'
								linkTo={ROUTES.WORKOUTS}
								className='bg-darkgreen-neon'
							/>
						</View>
					)}
				</View>
			</Animated.ScrollView>
		</ScreenWrapper>
	)
}

DisplayScreen.displayName = 'DisplayScreen'

export default withActiveWorkoutDays(DisplayScreen)
