import { useState } from 'react'
import { ActivityIndicator, Animated, FlatList, Pressable, View } from 'react-native'
import { FadeIn, FadeOut } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
//
import Structures from '@utils/structures'
import { shareWorkout } from '@utils/share'

import { colors } from '@colors'
import { DefaultScreen, Button } from '@components/base'
import EditableExercise from '@components/custom/editable-exercise'
import GenieEffectView from '@components/GenieEffectView'

const DayDetailScreen = ({ navigation, route }) => {
	const { name: dayName, exercises: dayExercises } = route.params ?? { name: '', exercises: [] }
	console.log('>>', dayExercises)
	const { createExercise } = Structures
	const insets = useSafeAreaInsets()

	const [exercises, setExercises] = useState(dayExercises)
	const [editing, setEditing] = useState(false)
	const [selected, setSelected] = useState([])
	const [optionsMenu, setOptionsMenu] = useState(false)
	const [updating, setUpdating] = useState(false)

	const manager = {
		add: (is_superset = false) => {
			const nextId = exercises[exercises.length - 1].id + 1
			const nextOrder = Math.max(exercises.map(({ order }) => order)) + 1
			setExercises([...exercises, createExercise(nextId, nextOrder, is_superset)])
		},
		delete: (id_to_delete) => {
			const updatedData = exercises
				.filter(({ id }) => id !== id_to_delete)
				.map((item) => ({
					...item,
					order: item.order - (item.order > id_to_delete ? 1 : 0),
				}))
			setExercises(updatedData)
		},
		save: () => {
			//axios
		},
	}

	return (
		<DefaultScreen className=''>
			<HeaderRight
				onPress={() => setOptionsMenu(true)}
				{...{ updating }}
			/>

			<FlatList
				data={exercises}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => <EditableExercise {...{ selected, setSelected, editing, manager, ...item }} />}
				ItemSeparatorComponent={() => <View className='mb-3' />}
				contentContainerStyle={{
					minHeight: '100%',
					paddingTop: 100,
					paddingRight: 15,
					paddingBottom: 100,
					marginTop: -insets.top,
				}}
				ListFooterComponent={() =>
					exercises?.length < 12 && (
						<Button
							text='New Exercise'
							icon='add'
							iconColor={colors.tint.success}
							containerStyle='h-10 flex-1 mx-10 mt-10 centered bg-tertiary-light/25 dark:bg-tertiary-dark/25 rounded-lg'
							textStyle='text-lg text-grey'
							className='flex-row pr-1'
							onPress={manager.add}
						/>
					)
				}
			/>

			{optionsMenu && (
				<Pressable
					className='absolute inset-0 z-3'
					onPress={() => setOptionsMenu(false)}
				>
					<OptionsMenu {...{ setEditing, ...navigation }} />
				</Pressable>
			)}
		</DefaultScreen>
	)
}

const HeaderRight = ({ updating, onPress }) => (
	<View className='absolute top-0 right-0 justify-center z-5'>
		{updating && (
			<Animated.View
				className='absolute -left-4'
				{...{ entering: FadeIn, exiting: FadeOut }}
			>
				<ActivityIndicator color={'#fff'} />
			</Animated.View>
		)}
		<Button
			icon='ellipsis-horizontal-circle-outline'
			iconColor={colors.tint.warning}
			onPress={onPress}
		/>
	</View>
)

const OptionsMenu = ({ setEditing, navigate }) => {
	const options = [
		{
			text: 'Share',
			icon: 'share-outline',
			iconSize: 18,
			onPress: () => console.log('option 1'),
		},
		{ text: 'Select Items', icon: 'close-outline', iconSize: 24, onPress: () => setEditing(true) },
	]
	return (
		<View className='absolute top-3 right-3 w-40 z-4'>
			<GenieEffectView className='full flex bg-grey-20 rounded-xl shadow-sm shadow-black/50 overflow-hidden'>
				{options.map((item) => (
					<Button
						key={item.text}
						containerStyle='w-full h-9 bg-grey-5 my-px'
						className='flex-row-reverse justify-between h-full min-w-full p-0 px-2'
						textStyle='text-lg'
						{...item}
					/>
				))}
			</GenieEffectView>
		</View>
	)
}
export default DayDetailScreen
