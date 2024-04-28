import { useState, useEffect } from 'react'
import { View, Pressable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeOutRight, SlideInRight, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import DraggableFlatList from 'react-native-draggable-flatlist'
//
import withTransition from '@utils/animation/withTransition'
import { Button, P } from 'src/components/base'
import GenieEffectView from '@components/GenieEffectView'

const DynamicFlatList = ({
	data,
	keyName = 'id',
	editing,
	itemOnPress = () => null,
	RenderItemLabel = () => null,
	RenderItemLeft = () => null,
	updateOrder = () => null,
}) => {
	const { navigate } = useNavigation()
	const [listData, setListData] = useState(data)
	const [optionsIndex, setOptionsIndex] = useState(-1)

	const dragSv = useSharedValue(1)

	const RenderItem = ({ item, drag, isActive, getIndex }) => {
		const index = getIndex()
		const dragAStyle = useAnimatedStyle(() => ({
			opacity: withTiming(isActive ? 1 : dragSv.value),
		}))
		return (
			<Animated.View style={[dragAStyle]}>
				<RenderItemLeft {...{ item, index }} />
				<TouchableOpacity
					className='flex-row centered h-12 px-3 bg-tertiary-light dark:bg-tertiary-dark'
					activeOpacity={0.6}
					onPress={() => itemOnPress({ item, index })}
					disabled={editing}
				>
					<RenderItemLabel {...{ item, index }} />
					{editing && (
						<EditingOptions
							drag={drag}
							openOptions={() => setOptionsIndex(index)}
						/>
					)}
				</TouchableOpacity>
			</Animated.View>
		)
	}

	useEffect(() => {
		if (!editing && optionsIndex != -1) setOptionsIndex(-1)
	}, [editing])

	useEffect(() => {
		if (data != listData) setListData(data)
	}, [data])

	return (
		<>
			<DraggableFlatList
				data={listData}
				keyExtractor={(item) => item[keyName]}
				scrollEnabled={false}
				onDragBegin={() => {
					dragSv.value = 0.5
				}}
				onRelease={() => {
					dragSv.value = 1
				}}
				onDragEnd={({ data, from, to }) => {
					setListData(data)
					updateOrder(from, to)
				}}
				contentContainerStyle={{ rowGap: 1, borderRadius: 12, overflow: 'hidden' }}
				renderItem={RenderItem}
			/>
			{editing && optionsIndex != -1 && (
				<Pressable
					className='absolute inset-0 min-h-screen z-3'
					onPress={() => setOptionsIndex(-1)}
				>
					<OptionsMenu {...{ index: optionsIndex, navigate }} />
				</Pressable>
			)}
		</>
	)
}

const EditingOptions = ({ drag, openOptions }) => (
	<Animated.View
		className='absolute inset-y-0 right-0 w-18 flex-row centered bg-tertiary-light dark:bg-tertiary-dark z-1'
		entering={withTransition(SlideInRight)}
		exiting={FadeOutRight}
	>
		<Button
			icon='ellipsis-horizontal-circle-outline'
			iconSize={20}
			onPress={openOptions}
		/>
		<View className='h-3/4 w-px bg-separator-dark rounded-full' />
		<Button
			icon='reorder-two-outline'
			onPressIn={drag}
		/>
	</Animated.View>
)

const OptionsMenu = ({ index, navigate }) => {
	const options = [
		{
			text: 'Rename',
			icon: 'create-outline',
			iconSize: 20,
			onPress: () => navigate('Rename', { model: 'Day', index }),
		},
		{
			text: 'Select a Preset',
			icon: 'ellipsis-horizontal-circle-outline',
			iconSize: 20,
			onPress: () => console.log('option 1'),
		},
		{ text: 'Delete Workout', icon: 'trash-outline', iconSize: 20, onPress: () => console.log('option 2') },
	]
	return (
		<View
			className='absolute top-40 right-16 w-40 z-1'
			style={{ marginTop: index * 60 }}
		>
			<GenieEffectView
				offset={0.28}
				className='full flex bg-grey-20 rounded-xl shadow-sm shadow-black/50 overflow-hidden'
			>
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

export default DynamicFlatList
