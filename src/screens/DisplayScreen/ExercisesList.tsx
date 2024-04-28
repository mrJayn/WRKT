import React, { memo, useCallback, useMemo } from 'react'
import { FlatList, ListRenderItemInfo, View } from 'react-native'
import type { WeightUnits, Exercise, Set } from '@src/types/features'
import P from '@components/P'

const DUMMY_SETS = [
	{
		id: -1,
		exercise: -1,
		sets: '2',
		reps: '10-12',
		weight: '135',
	},
	{
		id: -2,
		exercise: -1,
		sets: '3',
		reps: 'amrap',
		weight: '405',
	},
	{
		id: -3,
		exercise: -1,
		sets: '2',
		reps: '',
		weight: '315',
	},
]

function isNumeric(str: any) {
	return !isNaN(str) && !isNaN(parseFloat(str))
}

function getSetsRepsText(sets: string | undefined, reps: string | undefined) {
	let setsSuffix = sets && reps ? ' x ' : sets && isNumeric(sets) ? (Number(sets) === 1 ? ' set' : ' sets') : ''
	let repsSuffix = !sets && reps && isNumeric(reps) ? (Number(sets) === 1 ? ' rep' : ' reps') : ''
	return [sets || '', setsSuffix, reps || '', repsSuffix].join('')
}

function ExercisesList({ data, units }: { data: ReadonlyArray<Exercise>; units: WeightUnits }) {
	const filteredData = useMemo(() => {
		return data?.filter(({ name }: Exercise) => !!name)
	}, [data])

	const setsMapItem = useCallback(({ id, sets, reps, weight }: Set) => {
		return (
			<View
				key={id.toString()}
				className='flex-row px-2'
			>
				<P
					allowFontScaling={true}
					className='text-sm text-tint-secondary-light dark:text-tint-secondary-dark min-w-[33%]'
					children={getSetsRepsText(sets, reps)}
				/>
				{weight && (
					<P
						allowFontScaling={true}
						className='text-sm text-tint-secondary-light dark:text-tint-secondary-dark'
						children={weight ? `(  ${weight || ''} ${units}  )` : ''}
					/>
				)}
			</View>
		)
	}, [])

	const renderExerciseItem = useCallback(({ item: { name, sets, order } }: ListRenderItemInfo<Exercise>) => {
		return (
			<View className='flex-row'>
				<View className='h-5 w-5 centered bg-secondary-light dark:bg-secondary-dark rounded-md'>
					<P className='text-xxs text-tint-secondary-light dark:text-tint-secondary-dark'>{order}</P>
				</View>
				<View className='flex-1 px-2 overflow-hidden'>
					<P className='mb-1'>{name}</P>
					{(sets || DUMMY_SETS).map(setsMapItem)}
				</View>
			</View>
		)
	}, [])

	if (!filteredData) {
		return null
	}

	return (
		<FlatList
			data={filteredData}
			initialNumToRender={filteredData?.length}
			keyExtractor={(item) => item.id.toString()}
			renderItem={renderExerciseItem}
			ItemSeparatorComponent={() => <View className=' h-px my-6 bg-separator-light dark:bg-separator-dark' />}
			scrollEnabled={false}
		/>
	)
}

ExercisesList.displayName = 'ExercisesList'

export default memo(ExercisesList)
