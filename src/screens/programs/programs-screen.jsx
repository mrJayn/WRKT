import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { P, DefaultScreen } from '@components/base'
import { getAPI } from '@api/api-services'
// import { useOnFocus } from '@hooks'

function currentProgWeek(startdate, duration) {
	const now = new Date()
	const currweek = Math.round((now - startdate) / (7 * 24 * 60 * 60 * 1000)) + 1
	return Math.min(Math.max(1, currweek), duration)
}

const ProgramsScreen = () => {
	const [programsList, setProgramsList] = useState(null)
	const [editing, setEditing] = useState(false)

	const refreshData = async () => {
		const { data } = await getAPI({ route: 'program' })
		//const { programs, max_count } = data
		setProgramsList(data)
	}

	// useOnFocus({
	// 	onFocus: refreshData,
	// 	onBlur: () => {
	// 		if (editing) setEditing(false)
	// 	},
	// })

	return (
		<DefaultScreen className='p-3 pt-32'>
			<Drag
				// title='Programs'
				data={programs}
				// renderItem={}
				RenderItemLabel={({ name, startdate, duration }) => {
					const currWk = currentProgWeek(new Date(startdate), duration)
					return (
						<>
							<P className='h6 flex-1'>{name}</P>
							<P className='text-lg font-inconsolata'>{`wk${currWk}`}</P>
						</>
					)
				}}
			/>
		</DefaultScreen>
	)
}

const ProgramsListItem = ({ item, drag, isActive, getIndex }) => {
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

export default ProgramsScreen
