import PropTypes from 'prop-types'
import { useContext, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { ProfileContext, DefaultScreen, P, Switch, WeekdaySelector } from '@components/base'
import { useEffect } from 'react'

export default function PreferencesScreen() {
	const { settings } = {}

	const [basicMode, setBasicMode] = useState(settings.basic_editor)
	const [isLBS, setIsLBS] = useState(settings.units === 'LBS')
	const [notifsOn, setNotifsOn] = useState(settings.notifs)
	const [wkday0, setWkday0] = useState(settings.day_one_wkday)

	const options = [
		{ name: 'Simple Mode', value: basicMode, setValue: setBasicMode },
		{ name: 'Measurement Units', value: isLBS, setValue: setIsLBS, labels: ['lbs', 'kgs'] },
		{ name: 'Notifications', value: notifsOn, setValue: setNotifsOn },
	]

	useEffect(() => {
		// Post data
	}, [basicMode, isLBS, notifsOn])

	return (
		<DefaultScreen isBranch>
			<FlatList
				data={options}
				keyExtractor={({ name }) => name}
				renderItem={({ item }) => (
					<View className='flex-row my-3 centered px-3'>
						<P className='flex-1'>{item.name}</P>
						<Switch {...item} />
					</View>
				)}
				ItemSeparatorComponent={() => <View className='h-px w-full bg-separator-light dark:bg-separator-dark' />}
				scrollEnabled={false}
				className='flex-none'
			/>
			<View className='flex-row mt-3 p-3 items-center border-y-[1px] border-separator-light dark:border-separator-dark'>
				<P className='flex-1'>Day 1 is on:</P>
				<WeekdaySelector {...{ value: wkday0, setValue: setWkday0 }} />
			</View>
		</DefaultScreen>
	)
}
