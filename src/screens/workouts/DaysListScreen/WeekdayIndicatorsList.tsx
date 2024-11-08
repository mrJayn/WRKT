import React, { useMemo } from 'react'
import { ListRenderItem, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import CONST from '@src/CONST'
import cn from '@libs/cn'
import { useGetProfileQuery } from '@features/Profile/profileAPI'
import P from '@components/P'

function WeekdayIndicatorsList() {
	const { weekStartDay } = useGetProfileQuery(undefined, {
		selectFromResult: ({ data }) => ({ weekStartDay: data?.dayOneWkday ?? 0 }),
	})

	const orderedWeekdays = useMemo(() => {
		return Array.from({ length: 7 }).map((_, i) => {
			return new Date(1, 3, i + weekStartDay).toLocaleString(CONST.LOCALES.DEFAULT, { weekday: 'short' })
		})
		// const dayNames = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] // return dayNames.slice(weekStartDay).concat(dayNames.slice(0, weekStartDay))
	}, [weekStartDay])

	const currentDay = new Date().getDay()

	const renderDayIndicator: ListRenderItem<string> = ({ item, index }) => (
		<View className='h-12 min-w-full pl-2 justify-center items-start bg-tertiary-light dark:bg-tertiary-dark'>
			<View
				className={cn(
					'h-6 w-9 centered border-[1px] border-separator-light dark:border-separator-dark bg-grey-10 dark:bg-grey-90 rounded-md',
					{ 'bg-tint-success/20': index === currentDay }
				)}
			>
				<P className='font-inter-thin text-xxs tracking-1/2 uppercase'>{item}</P>
			</View>
		</View>
	)

	return (
		<FlatList
			data={orderedWeekdays}
			initialNumToRender={7}
			keyExtractor={(item) => item}
			renderItem={renderDayIndicator}
			style={{ position: 'absolute' }}
			contentContainerStyle={{
				rowGap: 1,
				borderRadius: 12,
				overflow: 'hidden',
			}}
		/>
	)
}

WeekdayIndicatorsList.displayName = 'WeekdayIndicatorsList'

export default WeekdayIndicatorsList
