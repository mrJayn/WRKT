import { useRef, useState } from 'react'
import { View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { colors } from '@colors'
import SCREENS from '@src/SCREENS'
import useHeaderLeftButton from '@hooks/useHeaderLeftButton'
import { DefaultScreen, Button } from '@components/base'
import ScreenLoader from '@components/ScreenLoader'
import QueryErrorMessage from '@components/QueryErrorMessage'
import ProgramDetailView from './ProgramDetailView'
import Navigation from '@navigation/Navigation'
import ROUTES from '@src/ROUTES'
import { Program } from '@src/types/features'
import DefaultButton from '@components/DefaultButton'

function ProgramsScreen() {
	const [[isEditing, shouldSaveEdits], setEditing] = useState([false, true])

	//
	const data = [] as Program[]
	const isSuccess = false
	const isError = false

	const toggleEditing = () => setEditing([!isEditing, true])

	const onCancel = () => setEditing([!isEditing, false])

	useHeaderLeftButton({
		state: isEditing,
		label: 'Cancel',
		tintColor: colors.tint.warning,
		onPress: onCancel,
		backImageVisible: false,
		useBackButton: false,
	})

	if (isError) {
		return <QueryErrorMessage />
	}

	return (
		<>
			{data && (
				<DefaultScreen className='p-3 pt-32'>
					<View className='absolute top-0 right-0 justify-center'>
						<DefaultButton
							text={isEditing ? 'Done' : 'Edit'}
							textClassName='text-lg leading-lg text-tint-warning'
							className='p-3'
							onPress={toggleEditing}
						/>
					</View>

					<FlatList
						key='workouts-flat-list'
						data={data}
						keyExtractor={({ id }) => id.toString()}
						renderItem={({ item }) => (
							<ProgramDetailView
								item={item}
								editing={isEditing}
								shouldUpdate={shouldSaveEdits}
								onPress={() => {
									Navigation.navigate(ROUTES.PROGRAM_WEEKS.getRoute(item.id))
								}}
							/>
						)}
						contentContainerStyle={{ rowGap: 1, borderRadius: 12, overflow: 'hidden' }}
						scrollEnabled={false}
					/>
					{/* 
					{data?.length < 3 && !editing && <CreateProgramButton />} 
					*/}
				</DefaultScreen>
			)}
			{!isSuccess && <ScreenLoader />}
		</>
	)
}

ProgramsScreen.displayName = 'ProgramsScreen'

export default ProgramsScreen

/*
const RenderItemLabel = (props) => {
	const { name, startdate, duration } = props
	const currWk = cpw(new Date(startdate), duration)
	return (
		<>
			<P className='h6 flex-1'>{name}</P>
			<P className='text-lg font-inconsolata'>{`wk${currWk}`}</P>
		</>
	)
}

const ProgramsListItem = ({ item, drag, isActive, getIndex }) => {
	const index = getIndex()
	const dragAStyle = useAnimatedStyle(() => ({
		opacity: withTiming(isActive ? 1 : dragSv.value),
	}))
	return (
		<Animated.View style={[dragAStyle]}>
			<TouchableOpacity
				className='flex-row centered h-12 px-3 bg-tertiary-light dark:bg-tertiary-dark'
				activeOpacity={0.6}
				onPress={() => itemOnPress({ item, index })}
				disabled={editing}
			>
				<P className='h6 flex-1'>{name}</P>
				<P className='text-lg font-inconsolata'>{`wk${currWk}`}</P>
			</TouchableOpacity>
		</Animated.View>
	)
}
*/
