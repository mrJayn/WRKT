import { useState } from 'react'
import { View } from 'react-native'
import { theme } from 'tailwind.config'

import ListDetailScreen from 'src/screens/common/list-detail-screen'
import DefaultButton from '@components/DefaultButton'
import { EditableProgram } from '@components/base'

const ProgramsDetail = ({ route }) => {
	const { name, data } = route.params

	const [currData, setCurrData] = useState(data)
	const [editing, setEditing] = useState(false)

	const manager = {
		add: () => {
			// const nextId = currData[currData.length - 1].id + 1
			// const nextOrder = Math.max(currData.map(({ order }) => order)) + 1
			const newWeek = {} // createProgWeek(nextId, nextOrder, is_superset)
			setCurrData([...currData, newWeek])
		},
		delete: (id) => {
			const updatedData = currData
				.filter((item) => item.id !== id)
				.map((item) => ({
					...item,
					order: item.order - (item.order > id ? 1 : 0),
				}))
			setCurrData(updatedData)
		},
		save: () => {
			//axios
		},
	}

	return (
		<ListDetailScreen
			title={name}
			ActionsBar={() => (
				<View className='flex-row justify-end bg-primary-light dark:bg-primary-dark z-2'>
					<DefaultButton
						icon='share-outline'
						iconColor={theme.colors.tint.warning}
						iconSize={21}
						onPress={() => console.log('>> shareProgram(name, data)')}
					/>
					<DefaultButton
						icon='ellipsis-horizontal-circle'
						iconColor={theme.colors.tint.warning}
						iconSize={21}
						onPress={() => setEditing(!editing)}
					/>
				</View>
			)}
			flatListProps={{
				data: currData,
				keyExtractor: ({ id }) => id,
				ListHeaderComponent: () => <H className='h2 m-3'>{name}</H>,
				renderItem: ({ item }) => <EditableProgram {...item} />,
				ItemSeparatorComponent: () => <View className='my-3' />,
			}}
		/>
	)
}
export default ProgramsDetail
