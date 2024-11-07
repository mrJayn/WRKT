import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import P from '@components/P'

export default function BaseFlatList({
	data,
	keyName = 'id',
	onItemPress,
	RenderItemLabel = ({ index }) => <P>{`Item ${index}`}</P>,
	flatListProps = {},
	touchableOpacityProps = {},
}) {
	// onPress: () => navigate(itemScreen, { ...item })
	const RenderItem = ({ item, index }) => (
		<TouchableOpacity
			className='flex-row centered h-12 px-3 bg-tertiary-light dark:bg-tertiary-dark'
			activeOpacity={0.6}
			onPress={() => onItemPress({ item, index })}
			{...touchableOpacityProps}
		>
			<RenderItemLabel {...{ index, ...item }} />
		</TouchableOpacity>
	)

	return (
		<FlatList
			data={data}
			keyExtractor={(item) => item[keyName]}
			renderItem={RenderItem}
			contentContainerStyle={{ rowGap: 1, borderRadius: 12, overflow: 'hidden' }}
			scrollEnabled={false}
			onViewableItemsChanged={({ viewableItems }) => {
				console.log('>', viewableItems)
			}}
			{...flatListProps}
		/>
	)
}
