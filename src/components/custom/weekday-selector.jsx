import { useState } from 'react'
import { View, TouchableOpacity, FlatList, Dimensions, Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Icon, P } from '../base'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window')

const choices = [
	{ label: 'Sun.', value: 0 },
	{ label: 'Mon.', value: 1 },
	{ label: 'Tue.', value: 2 },
	{ label: 'Wed.', value: 3 },
	{ label: 'Thu.', value: 4 },
	{ label: 'Fri.', value: 5 },
	{ label: 'Sat.', value: 6 },
]

const WeekdaySelector = ({ value, setValue }) => {
	const [open, setOpen] = useState(false)

	return (
		<>
			<View className='w-18 h-9 z-1'>
				<TouchableOpacity
					className='full flex-row centered'
					style={{ opacity: open ? 0.5 : 1 }}
					onPress={() => setOpen(!open)}
				>
					<P>{choices[value].label}</P>
					<Icon name={open ? 'chevron-up' : 'chevron-down'} />
				</TouchableOpacity>

				{open && <MenuComponent {...{ value, setValue, setOpen }} />}
			</View>
			{open && (
				<Pressable
					className='absolute -left-3 z-0'
					style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
					onPress={() => setOpen(false)}
				/>
			)}
		</>
	)
}

const MenuComponent = ({ value, setValue, setOpen }) => (
	<Animated.View
		className='absolute top-0 w-24 right-0 bg-tertiary-light dark:bg-tertiary-dark rounded-lg overflow-hidden z-2'
		entering={FadeIn}
		exiting={FadeOut}
	>
		<FlatList
			data={choices}
			keyExtractor={({ label }) => label}
			renderItem={({ item }) => {
				return (
					<TouchableOpacity
						className={`h-10 w-full centered rounded-lg z-1 ${
							value === item.value ? ' bg-black/10 dark:bg-white/10' : ''
						}`}
						onPress={() => {
							setValue(item.value)
							setOpen(false)
						}}
					>
						<P>{item.label}</P>
					</TouchableOpacity>
				)
			}}
			ItemSeparatorComponent={() => <View className='h-px w-full bg-separator-light dark:bg-separator-dark' />}
		/>
	</Animated.View>
)

export default WeekdaySelector
