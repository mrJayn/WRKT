import { useState } from 'react'
import { View } from 'react-native'
import Structures from '@utils/structures'
import { shareProgram } from '@utils/share'

import { colors } from '@colors'
import { Button, EditableProgram, H } from '@components/base'
import ListDetailScreen from 'src/screens/common/list-detail-screen'

const ProgramsDetail = ({ route }) => {
	const { name, data } = route.params
	const { createProgWeek, createProgram } = Structures

	const [currData, setCurrData] = useState(data)
	const [editing, setEditing] = useState(false)

	const manager = {
		add: (is_superset = false) => {
			const nextId = currData[currData.length - 1].id + 1
			const nextOrder = Math.max(currData.map(({ order }) => order)) + 1
			setCurrData([...currData, createProgWeek(nextId, nextOrder, is_superset)])
		},
		delete: (id_to_delete) => {
			const updatedData = currData
				.filter(({ id }) => id !== id_to_delete)
				.map((item) => ({
					...item,
					order: item.order - (item.order > id_to_delete ? 1 : 0),
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
					<Button
						icon='share-outline'
						iconColor={colors.tint.warning}
						iconSize={21}
						onPress={() => shareProgram(name, data)}
					/>
					<Button
						icon='ellipsis-horizontal-circle'
						iconColor={colors.tint.warning}
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
