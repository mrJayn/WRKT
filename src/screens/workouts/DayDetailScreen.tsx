import { useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import SCREENS from '@src/SCREENS'
import type { Exercise } from '@src/types/features'
import type { WorkoutsStackScreenProps } from '@navigation/types'
import useTheme from '@hooks/useTheme'
import type { IconName } from '@components/Icon'
import DefaultButton from '@components/DefaultButton'
import GenieEffectView from '@components/GenieEffectView'
import ScreenWrapper from '@components/ScreenWrapper'
import EditableExercise from '@components/custom/editable-exercise'

type OptionData = { text: string; icon: IconName; iconSize: number; onPress: () => void }

type DayDetailScreenProps = WorkoutsStackScreenProps<typeof SCREENS.WORKOUTS.DAYS_DETAIL>

function DayDetailScreen({ route }: DayDetailScreenProps) {
	const themeColors = useTheme()
	const insets = useSafeAreaInsets()

	const _exercises = route.params.day.exercises ?? []

	const [exercises, setExercises] = useState(_exercises)
	const [editing, setEditing] = useState(false)
	const [selected, setSelected] = useState([])
	const [optionsMenu, setOptionsMenu] = useState(false)
	const updating = false

	const manager = {
		add: () => {
			// const nextId = exercises[exercises.length - 1].id + 1
			// const nextOrder = Math.max(exercises.map(({ order }) => order)) + 1
			const newExercise = {} as Exercise // createExercise(nextId, nextOrder, is_superset)
			setExercises([...exercises, newExercise])
		},
		delete: (id: number) => {
			const updatedData = exercises
				.filter((item) => item.id !== id)
				.map((item) => ({
					...item,
					order: item.order - (item.order > id ? 1 : 0),
				}))
			setExercises(updatedData)
		},
		save: () => {
			//axios
		},
	}

	const OptionsMenu = () => {
		const options: readonly OptionData[] = [
			{
				text: 'Share',
				icon: 'share-outline',
				iconSize: 18,
				onPress: () => console.log('option 1'),
			},
			{
				text: 'Select Items',
				icon: 'close-outline',
				iconSize: 24,
				onPress: () => setEditing(true),
			},
		]
		return (
			<View className='absolute top-3 right-3 w-40 z-4'>
				<GenieEffectView className='full flex bg-grey-20 rounded-xl shadow-sm shadow-black/50 overflow-hidden'>
					{options.map(({ ...props }) => (
						<DefaultButton
							key={props.text}
							containerStyle={{
								width: '100%',
								height: 45,
								marginHorizontal: 1,
								backgroundColor: themeColors.grey[5],
							}}
							className='h-full min-w-full p-0 px-2 flex-row-reverse justify-between text-lg'
							textClassName='text-lg'
							{...props}
						/>
					))}
				</GenieEffectView>
			</View>
		)
	}

	return (
		<ScreenWrapper>
			{/** Header */}
			<View className='absolute top-0 right-0 justify-center z-5'>
				{updating && (
					<Animated.View
						className='absolute -left-4'
						entering={FadeIn}
						exiting={FadeOut}
					>
						<ActivityIndicator color={themeColors.primary} />
					</Animated.View>
				)}
				<DefaultButton
					icon='ellipsis-horizontal-circle-outline'
					iconColor={themeColors.tint.warning}
					onPress={() => setOptionsMenu(true)}
				/>
			</View>

			{/** Day Exercises List */}
			<FlatList
				data={exercises}
				initialNumToRender={exercises.length}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <EditableExercise {...{ selected, setSelected, editing, manager, ...item }} />}
				ItemSeparatorComponent={() => <View className='mb-3' />}
				ListFooterComponent={() =>
					exercises?.length < 12 && (
						<DefaultButton
							text='New Exercise'
							icon='add'
							iconColor={themeColors.tint.success}
							className='flex-row pr-1 text-lg text-grey'
							textClassName='text-lg text-grey'
							containerStyle={{
								flex: 1,
								height: 50,
								marginTop: 50,
								marginHorizontal: 50,
								backgroundColor: `${themeColors.tertiary}40`,
								borderRadius: 8,
							}}
							onPress={manager.add}
						/>
					)
				}
				contentContainerStyle={{
					minHeight: '100%',
					paddingTop: 100,
					paddingRight: 15,
					paddingBottom: 100,
					marginTop: -insets.top,
				}}
			/>

			{/** Options PopUp */}
			{optionsMenu && (
				<Pressable
					className='absolute inset-0 z-3'
					onPress={() => setOptionsMenu(false)}
				>
					<OptionsMenu />
				</Pressable>
			)}
		</ScreenWrapper>
	)
}

export default DayDetailScreen
