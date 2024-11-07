import _ from 'lodash'
import React, { memo, useCallback } from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import ROUTES from '@src/ROUTES'
import type { Day, Exercise, Set, WeightUnits } from '@src/types/features'
import { useGetWorkoutExercisesQuery } from '@features/Exercises/exercisesApi'
import DefaultButton from '@components/DefaultButton'
import P from '@components/P'

function getSetsRepsText(sets: string | undefined, reps: string | undefined) {
	const setsSuffix = sets && reps ? ' x ' : sets ? (Number(sets) === 1 ? 'set' : 'sets') : ''
	const repsSuffix = !reps ? '' : Number(reps) === 1 ? ' rep' : ' reps'
	return _.join([sets ?? '', setsSuffix, reps ?? '', repsSuffix], '')
}

type ExerciseListProps = {
	dayID: number | undefined
}

function ExercisesList({ dayID }: ExerciseListProps) {
	// console.log('[ExercisesList]')

	const { exercises } = useGetWorkoutExercisesQuery('active', {
		skip: !dayID,
		refetchOnMountOrArgChange: true,
		selectFromResult: ({ data }) => ({
			exercises: data?.filter((exercise) => exercise.day === dayID) ?? [],
		}),
	})

	const setsTextProps = {
		allowFontScaling: true,
		className: 'text-sm text-tint-secondary-light dark:text-tint-secondary-dark min-w-[33%]',
	} as const

	const renderExerciseItem = useCallback(({ item: { name, sets, order } }: ListRenderItemInfo<Exercise>) => {
		return (
			<View className='flex-row'>
				<View className='h-5 w-5 centered bg-secondary-light dark:bg-secondary-dark rounded-md'>
					<P className='text-xxs text-tint-secondary-light dark:text-tint-secondary-dark'>{order}</P>
				</View>
				<View className='flex-1 px-2 overflow-hidden'>
					<P className='mb-1'>{name || `Exercise ${order}`}</P>
					{sets &&
						_.map(sets, ({ id, sets, reps, weight }) => (
							<View
								key={id.toString()}
								className='flex-row px-2'
							>
								<P {...setsTextProps}>{getSetsRepsText(sets, reps)}</P>
								{weight && <P {...setsTextProps}>{`(  ${weight}  )`}</P>}
							</View>
						))}
				</View>
			</View>
		)
	}, [])

	if (!exercises.length) {
		return (
			<View className='centered'>
				<P className='mb-6'>Looks like there's nothing here yet!</P>
				<DefaultButton
					text='Go to Workouts'
					variant='filled'
					linkTo={ROUTES.WORKOUTS}
				/>
			</View>
		)
	}

	return (
		<FlatList
			data={exercises}
			initialNumToRender={exercises?.length}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderExerciseItem}
			ItemSeparatorComponent={() => <View className=' h-px my-6 bg-separator-light dark:bg-separator-dark' />}
			scrollEnabled={false}
		/>
	)
}

ExercisesList.displayName = 'ExercisesList'

export default memo(ExercisesList)
