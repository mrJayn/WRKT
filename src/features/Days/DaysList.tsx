import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import DraggableFlatList, { DragEndParams, RenderItem, RenderItemParams } from 'react-native-draggable-flatlist'

import type { Day } from '@src/types/features'
import P from '@components/P'
import { useGetDaysByWorkoutQuery, useUpdateDayMutation } from './daysApi'

interface Props {
	workoutId: number
	renderItem: (info: { item: Day; drag: () => void; reorder?: number }) => React.ReactNode
}

interface ReordersMap {
	[id: number]: number
}

/** drag view decorator params */
const decoratorTimingConfig = { duration: 150, easing: Easing.in(Easing.ease) }
const decoratorInactiveOpacity = 0.33

/** Draggable Days List */
function DaysList({ workoutId, renderItem }: Props) {
	const progress = useSharedValue(1)
	const [dragData, setDragData] = useState<Day[]>([])
	const [reordersMap, setReordersMap] = useState<ReordersMap>({})

	const { data, isError, refetch } = useGetDaysByWorkoutQuery({ workoutId })
	const [updateDay, { isLoading: isUpdating }] = useUpdateDayMutation()

	const getDaysList = useCallback(async () => await refetch(), [refetch])

	const toggleDecoration = (isDragging: boolean) => {
		progress.value = isDragging ? decoratorInactiveOpacity : 1
	}

	const handleDragEnd = ({ data, from, to }: DragEndParams<Day>) => {
		if (to !== from) {
			const { id } = data[to] // moved item
			setReordersMap({ ...reordersMap, [id]: to })
		}
	}

	const DecoratedRenderItem: RenderItem<Day> = ({ getIndex, isActive, ...info }) => {
		const RenderComponent = renderItem

		const opacityStyle = useAnimatedStyle(() => ({
			opacity: isActive ? 1 : withTiming(progress.value, decoratorTimingConfig),
		}))

		return (
			<Animated.View style={[opacityStyle, { flex: 1 }]}>
				<RenderComponent
					reorder={reordersMap[info.item.id]}
					{...info}
				/>
			</Animated.View>
		)
	}

	if (isError) {
		return (
			<View className='flex-1 centered'>
				<P className='h2 text-tint-error'>Something went wrong, you may want to retry in a bit.</P>
			</View>
		)
	}

	return (
		<>
			{data && (
				<DraggableFlatList
					key='days'
					data={data}
					keyExtractor={({ id }) => id.toString()}
					renderItem={DecoratedRenderItem}
					onDragBegin={() => toggleDecoration(true)}
					onRelease={() => toggleDecoration(false)}
					onDragEnd={handleDragEnd}
					contentContainerStyle={{ rowGap: 1, borderRadius: 12, overflow: 'hidden' }}
					scrollEnabled={false}
				/>
			)}
		</>
	)
}

export default DaysList
