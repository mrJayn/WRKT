import { Button, DefaultScreen, P, ProfileContext, Switch } from '@components/base'
import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { FlatList } from 'react-native-gesture-handler'

const grouped = [
	{ label: 'Chest', value: 'chest' },
	{ label: 'Back', value: 'back' },
	{ label: 'Traps', value: 'traps', parent: 'back' },
	{ label: 'Arms', value: 'arms' },
	{ label: 'Biceps', value: 'biceps', parent: 'arms' },
	{ label: 'Triceps', value: 'triceps', parent: 'arms' },
	{ label: 'Delts', value: 'delts' },
	{ label: 'Front Delts', value: 'front delts', parent: 'delts' },
	{ label: 'Side Delts', value: 'side delts', parent: 'delts' },
	{ label: 'Side/Rear Delts', value: 'side/rear', parent: 'delts' },
	{ label: 'Rear Delts', value: 'rear delts', parent: 'delts' },
	{ label: 'Legs', value: 'legs' },
	{ label: 'Quads/Hams', value: 'quads/hams', parent: 'legs' },
	{ label: 'Quads', value: 'quads', parent: 'legs' },
	{ label: 'Hamstrings', value: 'hamstrings', parent: 'legs' },
	{ label: 'Hams/glutes', value: 'hams/glutes', parent: 'legs' },
	{ label: 'Glutes', value: 'glutes', parent: 'legs' },
	{ label: 'Ab/Adductors', value: 'ab/adductors', parent: 'legs' },
	{ label: 'Calves', value: 'calves', parent: 'legs' },
	{ label: 'Abs', value: 'abs' },
]

export default function ManageExsScreen() {
	const { library } = {}

	const exercises = library.map(({ name }) => name)
	// const groups_arr = Array(...new Set(props.map(({ group }) => group)))
	// const groups = groups_arr.map((g) => ({ label: g, value: g }))
	const [groupFilter, setGroupFilter] = useState([])
	const [eqFilter, setEqFilter] = useState([])

	return (
		<DefaultScreen isBranch>
			<View className='h-16 w-full flex-row justify-around items-center bg-black z-2'>
				<GroupsDDMenu {...{ setGroupFilter }} />
				<EquipmentDDMenu {...{ setEqFilter }} />
			</View>
			<FlatList
				data={exercises}
				keyExtractor={(item) => item}
				renderItem={(item) => {
					//{ name, equipment, bodypart, enabled, max }
					//const [value, setValue] = useState(enabled)
					return (
						<View className='w-full px-3 py-5 flex-row justify-between'>
							<P>{item}</P>
							{/* <Switch {...{ value, setValue }} /> */}
						</View>
					)
				}}
				ItemSeparatorComponent={() => <View className='h-px w-full bg-separator-light dark:bg-separator-dark' />}
				style={{ zIndex: 1 }}
			/>
		</DefaultScreen>
	)
}

const ddMenuStyle = {
	containerStyle: { maxWidth: 150 },
	dropDownContainerStyle: { backgroundColor: '#dfdfdf' },
}

const GroupsDDMenu = ({ setGroupFilter }) => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(null)
	const [items, setItems] = useState(group_items)

	console.log(value)

	return (
		<DropDownPicker
			placeholder='group'
			multiple
			multipleText={value.length === 1 ? value[0] : `${value.length} selected`}
			listParentLabelStyle={{ fontFamily: 'Inter-Bold' }}
			listChildLabelStyle={{ fontFamily: 'Inter' }}
			listChildContainerStyle={{ paddingLeft: 15 }}
			{...{ open, value, items, setOpen, setValue, setItems, ...ddMenuStyle }}
		/>
	)
}

const EquipmentDDMenu = ({ setEqFilter }) => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(null)
	const [items, setItems] = useState(equipment_items)

	return (
		<DropDownPicker
			placeholder='equipment'
			listParentLabelStyle={{ fontFamily: 'Inter' }}
			{...{ open, value, items, setOpen, setValue, setItems, ...ddMenuStyle }}
		/>
	)
}

const group_items = [
	{ label: 'Chest', value: 'chest' },
	{ label: 'Back', value: 'back' },
	{ label: 'Traps', value: 'traps', parent: 'back' },
	{ label: 'Arms', value: 'arms' },
	{ label: 'Biceps', value: 'biceps', parent: 'arms' },
	{ label: 'Triceps', value: 'triceps', parent: 'arms' },
	{ label: 'Delts', value: 'delts' },
	{ label: 'Front Delts', value: 'front delts', parent: 'delts' },
	{ label: 'Side Delts', value: 'side delts', parent: 'delts' },
	{ label: 'Side/Rear Delts', value: 'side/rear', parent: 'delts' },
	{ label: 'Rear Delts', value: 'rear delts', parent: 'delts' },
	{ label: 'Legs', value: 'legs' },
	{ label: 'Quads/Hams', value: 'quads/hams', parent: 'legs' },
	{ label: 'Quads', value: 'quads', parent: 'legs' },
	{ label: 'Hamstrings', value: 'hamstrings', parent: 'legs' },
	{ label: 'Hams/glutes', value: 'hams/glutes', parent: 'legs' },
	{ label: 'Glutes', value: 'glutes', parent: 'legs' },
	{ label: 'Ab/Adductors', value: 'ab/adductors', parent: 'legs' },
	{ label: 'Calves', value: 'calves', parent: 'legs' },
	{ label: 'Abs', value: 'abs' },
]

const equipment_items = [
	{ label: 'Barbell', value: 'barbell' },
	{ label: 'Ez-Bar', value: 'ez_bar' },
	{ label: 'DB', value: 'db' },
	{ label: 'Cable', value: 'cable' },
	{ label: 'Smith Machine', value: 'sm' },
	{ label: 'Machine', value: 'machine' },
	{ label: 'Body Weight', value: 'bodyweight' },
	{ label: 'Free Weights', value: 'freeweight' },
	{ label: 'Bands', value: 'bands' },
]
