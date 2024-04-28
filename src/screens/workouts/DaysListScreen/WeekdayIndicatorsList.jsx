import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import CONST from '@src/CONST'
import { P } from '@components/base'

const CURRENT_WEEKDAY = new Date().getDay()

function WeekdayIndicatorsList() {
	const day_one_wkday = 0

	const orderedWeekdays = useMemo(() => {
		let a = CONST.WEEKDAY_SHORT_NAMES.slice(day_one_wkday)
		let b = CONST.WEEKDAY_SHORT_NAMES.slice(0, day_one_wkday)
		return a.concat(b)
	}, [day_one_wkday])

	const WeekdayIndicator = ({ item, index }) => (
		<View className='h-12 min-w-full pl-2 justify-center items-start bg-tertiary-light dark:bg-tertiary-dark'>
			<View
				className={`h-6 w-9 centered border-[1px] border-separator-light dark:border-separator-dark rounded-md ${
					index === CURRENT_WEEKDAY ? 'bg-tint-success/20' : 'bg-grey-10 dark:bg-grey-90'
				}`}
			>
				<P className='text-xs lead uppercase'>{item}</P>
			</View>
		</View>
	)

	return (
		<FlatList
			data={orderedWeekdays}
			keyExtractor={(item) => item}
			renderItem={WeekdayIndicator}
			style={{ position: 'absolute' }}
			contentContainerStyle={{ rowGap: 1, borderRadius: 12, overflow: 'hidden' }}
		/>
	)
}

WeekdayIndicatorsList.displayName = 'WeekdayIndicatorsList'

export default WeekdayIndicatorsList
